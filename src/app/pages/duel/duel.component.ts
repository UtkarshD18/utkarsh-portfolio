import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArenaCanvasComponent } from '../../components/arena-canvas/arena-canvas.component';
import { CombatEvent, EntityState, WasmEngineService } from '../../core/services/wasm-engine.service';
import { CharacterConfigService } from '../../core/services/character-config.service';

@Component({
  selector: 'app-duel',
  standalone: true,
  imports: [CommonModule, FormsModule, ArenaCanvasComponent],
  template: `
    <div class="duel-viewport">
      <!-- 3D WebGL Canvas Layer -->
      <app-arena-canvas></app-arena-canvas>

      <!-- Minimalist Combat HUD Layer -->
      <div class="hud-overlay">
        <!-- Top Nav & Return Header -->
        <header class="hud-header">
          <button class="return-btn" (click)="returnToPortfolio()">
            ← OBSERVE
          </button>

          <div class="matchup-selector">
            <select
              class="char-select p1-select"
              [ngModel]="playerChar().id"
              (ngModelChange)="onPlayerChange($event)"
            >
              @for (c of charConfig.characters(); track c.id) {
                <option [value]="c.id">P1: {{ c.name }}</option>
              }
            </select>
            <span class="vs-text">VS</span>
            <select
              class="char-select p2-select"
              [ngModel]="oppChar().id"
              (ngModelChange)="onOpponentChange($event)"
            >
              @for (c of charConfig.characters(); track c.id) {
                <option [value]="c.id">P2: {{ c.name }}</option>
              }
            </select>
          </div>

          <div class="mode-toggle-group">
            <button
              class="mode-pill"
              [class.active]="wasmEngine.gameMode() === 'ai'"
              (click)="setGameMode('ai')"
            >
              VS AI
            </button>
            <button
              class="mode-pill"
              [class.active]="wasmEngine.gameMode() === 'pvp'"
              (click)="setGameMode('pvp')"
            >
              PVP (2P)
            </button>
          </div>
        </header>

        <!-- Player & Opponent Health / Stamina Gauges -->
        <div class="status-grid">
          <!-- Player Panel -->
          <div class="fighter-card player-panel">
            <div class="card-header">
              <span class="name-label">{{ playerChar().name }}</span>
              <span class="hp-num">{{ wasmEngine.playerHealth() }}%</span>
            </div>
            <div class="bar-track hp-track">
              <div
                class="bar-fill hp-fill"
                [style.width.%]="wasmEngine.playerHealth()"
              ></div>
            </div>
            <div class="bar-track stamina-track">
              <div
                class="bar-fill stamina-fill"
                [style.width.%]="wasmEngine.playerStamina()"
              ></div>
            </div>
            <div class="ult-container">
              <button
                class="ult-btn"
                [class.ready]="wasmEngine.playerUlt() >= 100"
                [disabled]="wasmEngine.playerUlt() < 100"
                (click)="wasmEngine.triggerUlt()"
              >
                ULTIMATE {{ wasmEngine.playerUlt() }}%
              </button>
            </div>
          </div>

          <!-- Opponent Panel -->
          <div class="fighter-card opp-panel">
            <div class="card-header">
              <span class="hp-num">{{ wasmEngine.opponentHealth() }}%</span>
              <span class="name-label">{{ oppChar().name }}</span>
            </div>
            <div class="bar-track hp-track">
              <div
                class="bar-fill hp-fill opp-hp"
                [style.width.%]="wasmEngine.opponentHealth()"
              ></div>
            </div>
            <div class="opp-state-badge">
              STATE: {{ getOpponentStateName() }}
            </div>
          </div>
        </div>

        <!-- Parry Timing & Toast Readout -->
        @if (wasmEngine.lastParryMs() > 0 && wasmEngine.hitStopActive()) {
          <div class="parry-banner">
            <div class="parry-title">PERFECT PARRY</div>
            <div class="parry-timer">{{ wasmEngine.lastParryMs() }} ms</div>
            <div class="parry-quote">"Observation precedes reaction"</div>
          </div>
        }

        <!-- Knockout Modal -->
        @if (isKnockout()) {
          <div class="victory-modal">
            <div class="modal-content">
              <h2>{{ wasmEngine.playerHealth() > 0 ? 'VICTORY' : 'DEFEATED' }}</h2>
              <p class="modal-sub">
                {{ wasmEngine.playerHealth() > 0 ? 'Composure under pressure.' : 'Reset your stance.' }}
              </p>
              <div class="modal-actions">
                <button class="action-btn" (click)="wasmEngine.reset()">REMATCH</button>
                <button class="action-btn outline" (click)="returnToPortfolio()">RETURN TO OBSERVER</button>
              </div>
            </div>
          </div>
        }

        <!-- Controls Guide Footer -->
        <footer class="hud-footer">
          <div class="p1-controls">
            <span class="ctrl-label">P1:</span>
            <div class="control-badge"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move</div>
            <div class="control-badge"><kbd>J</kbd> Attack</div>
            <div class="control-badge highlight"><kbd>K</kbd> Parry (50ms)</div>
            <div class="control-badge"><kbd>L</kbd> Block</div>
            <div class="control-badge ult-badge"><kbd>Space</kbd> Ult</div>
          </div>
          @if (wasmEngine.gameMode() === 'pvp') {
            <div class="p2-controls">
              <span class="ctrl-label">P2:</span>
              <div class="control-badge"><kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> Move</div>
              <div class="control-badge"><kbd>U</kbd> Attack</div>
              <div class="control-badge highlight"><kbd>I</kbd> Parry</div>
              <div class="control-badge"><kbd>O</kbd> Block</div>
            </div>
          }
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .duel-viewport {
      width: 100vw;
      height: 100vh;
      position: relative;
      background: #0a0a0c;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .hud-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      z-index: 20;
    }
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: auto;
    }
    .return-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.85);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      transition: all 0.2s ease;
    }
    .return-btn:hover {
      background: rgba(255, 255, 255, 0.18);
    }
    .matchup-selector {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .char-select {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      outline: none;
    }
    .char-select option {
      background: #121216;
      color: #fff;
    }
    .p1-select {
      border-color: rgba(79, 172, 254, 0.5);
      color: #4facfe;
    }
    .p2-select {
      border-color: rgba(255, 65, 108, 0.5);
      color: #ff416c;
    }
    .vs-text {
      color: rgba(255, 255, 255, 0.35);
      font-size: 0.8rem;
      font-weight: 800;
    }
    .mode-toggle-group {
      display: flex;
      background: rgba(255, 255, 255, 0.06);
      padding: 3px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .mode-pill {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      padding: 0.35rem 0.9rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .mode-pill.active {
      background: #4facfe;
      color: #000;
      box-shadow: 0 0 12px rgba(79, 172, 254, 0.5);
    }
    .status-grid {
      display: grid;
      grid-template-columns: 320px 1fr 320px;
      gap: 1rem;
      pointer-events: auto;
    }
    .opp-panel {
      grid-column: 3;
    }
    .fighter-card {
      background: rgba(14, 14, 18, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
    }
    .bar-track {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      overflow: hidden;
    }
    .stamina-track {
      height: 4px;
    }
    .bar-fill {
      height: 100%;
      transition: width 0.15s ease-out;
    }
    .hp-fill {
      background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
    }
    .opp-hp {
      background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
    }
    .stamina-fill {
      background: #00e676;
    }
    .ult-btn {
      width: 100%;
      margin-top: 0.4rem;
      padding: 0.4rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      border-radius: 6px;
      cursor: not-allowed;
      transition: all 0.3s ease;
    }
    .ult-btn.ready {
      background: linear-gradient(90deg, #00f2fe, #4facfe);
      color: #000;
      border: none;
      cursor: pointer;
      box-shadow: 0 0 16px rgba(0, 242, 254, 0.6);
      animation: pulse 1.2s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    .opp-state-badge {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.4);
      letter-spacing: 0.1em;
    }
    .parry-banner {
      align-self: center;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 1.2rem 2.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 0 32px rgba(255, 255, 255, 0.3);
      animation: popIn 0.1s ease-out;
    }
    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .parry-title {
      font-size: 1.4rem;
      font-weight: 900;
      letter-spacing: 0.2em;
      color: #fff;
    }
    .parry-timer {
      font-size: 2rem;
      font-weight: 900;
      color: #00f2fe;
    }
    .parry-quote {
      font-size: 0.8rem;
      font-style: italic;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 0.3rem;
    }
    .victory-modal {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
    }
    .modal-content {
      background: #121216;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 2.5rem 3.5rem;
      border-radius: 16px;
      text-align: center;
    }
    .modal-content h2 {
      font-size: 2.5rem;
      letter-spacing: 0.2em;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .modal-sub {
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 2rem;
    }
    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .action-btn {
      padding: 0.8rem 1.6rem;
      border-radius: 8px;
      font-weight: 700;
      letter-spacing: 0.1em;
      cursor: pointer;
      background: #fff;
      color: #000;
      border: none;
      transition: all 0.2s ease;
    }
    .action-btn.outline {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
    }
    .hud-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      pointer-events: auto;
    }
    .p1-controls, .p2-controls {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .ctrl-label {
      font-size: 0.75rem;
      font-weight: 800;
      color: #4facfe;
      letter-spacing: 0.1em;
    }
    .control-badge {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.35rem 0.7rem;
      border-radius: 6px;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .control-badge.highlight {
      border-color: rgba(0, 242, 254, 0.4);
      color: #00f2fe;
    }
    .control-badge.ult-badge {
      border-color: rgba(255, 65, 108, 0.4);
      color: #ff416c;
    }
    kbd {
      background: rgba(255, 255, 255, 0.15);
      padding: 0.1rem 0.35rem;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.75rem;
    }
  `]
})
export class DuelComponent implements OnInit {
  wasmEngine = inject(WasmEngineService);
  charConfig = inject(CharacterConfigService);
  private router = inject(Router);

  playerChar = this.charConfig.selectedPlayer;
  oppChar = this.charConfig.selectedOpponent;

  isKnockout = computed(() => {
    return this.wasmEngine.playerHealth() <= 0 || this.wasmEngine.opponentHealth() <= 0;
  });

  async ngOnInit(): Promise<void> {
    await this.wasmEngine.init(12.0, 70.0, 50.0);
  }

  setGameMode(mode: 'ai' | 'pvp'): void {
    this.wasmEngine.gameMode.set(mode);
    this.wasmEngine.reset();
  }

  onPlayerChange(charId: string): void {
    const char = this.charConfig.characters().find(c => c.id === charId);
    if (char) {
      this.charConfig.selectPlayer(char);
      this.wasmEngine.reset();
    }
  }

  onOpponentChange(charId: string): void {
    const char = this.charConfig.characters().find(c => c.id === charId);
    if (char) {
      this.charConfig.selectOpponent(char);
      this.wasmEngine.reset();
    }
  }

  getOpponentStateName(): string {
    const s = this.wasmEngine.opponentState();
    switch (s) {
      case EntityState.ATTACK: return 'ATTACKING';
      case EntityState.MOVE: return 'APPROACHING';
      case EntityState.STAGGERED: return 'STAGGERED';
      case EntityState.KNOCKED_OUT: return 'KNOCKED OUT';
      default: return 'IDLE';
    }
  }

  returnToPortfolio(): void {
    this.router.navigate(['/']);
  }
}
