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
      background: radial-gradient(circle at 50% 50%, #1a1612 0%, #0c0b0a 70%, #050506 100%);
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }
    .hud-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.8rem 2.5rem;
      z-index: 20;
    }
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: auto;
    }
    .return-btn {
      background: rgba(22, 20, 18, 0.75);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(212, 163, 89, 0.3);
      color: #f0c375;
      padding: 0.55rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      transition: all 0.25s ease;
    }
    .return-btn:hover {
      background: rgba(212, 163, 89, 0.2);
      border-color: #f0c375;
      box-shadow: 0 0 15px rgba(212, 163, 89, 0.4);
      color: #fff;
    }
    .matchup-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .char-select {
      background: rgba(18, 16, 14, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(212, 163, 89, 0.35);
      color: #f3ede2;
      padding: 0.45rem 1rem;
      border-radius: 6px;
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      outline: none;
      letter-spacing: 0.05em;
    }
    .char-select option {
      background: #110f0d;
      color: #f3ede2;
    }
    .p1-select {
      border-color: rgba(212, 163, 89, 0.6);
      color: #f0c375;
    }
    .p2-select {
      border-color: rgba(194, 54, 43, 0.6);
      color: #e63946;
    }
    .vs-text {
      color: rgba(212, 163, 89, 0.5);
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      font-weight: 900;
      letter-spacing: 0.1em;
    }
    .mode-toggle-group {
      display: flex;
      background: rgba(18, 16, 14, 0.8);
      padding: 4px;
      border-radius: 999px;
      border: 1px solid rgba(212, 163, 89, 0.25);
    }
    .mode-pill {
      background: transparent;
      border: none;
      color: rgba(243, 237, 226, 0.6);
      padding: 0.4rem 1rem;
      border-radius: 999px;
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .mode-pill.active {
      background: linear-gradient(135deg, #d4a359, #b58038);
      color: #0c0b0a;
      box-shadow: 0 0 14px rgba(212, 163, 89, 0.4);
    }
    .status-grid {
      display: grid;
      grid-template-columns: 340px 1fr 340px;
      gap: 1.5rem;
      pointer-events: auto;
    }
    .opp-panel {
      grid-column: 3;
    }
    .fighter-card {
      background: rgba(18, 16, 14, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(212, 163, 89, 0.25);
      border-radius: 12px;
      padding: 1.2rem 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: #f3ede2;
    }
    .hp-num {
      color: #f0c375;
      font-weight: 900;
    }
    .bar-track {
      width: 100%;
      height: 9px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(212, 163, 89, 0.2);
      border-radius: 4px;
      overflow: hidden;
    }
    .stamina-track {
      height: 5px;
      border-color: rgba(255, 255, 255, 0.1);
    }
    .bar-fill {
      height: 100%;
      transition: width 0.15s ease-out;
    }
    .hp-fill {
      background: linear-gradient(90deg, #f0c375 0%, #d4a359 100%);
      box-shadow: 0 0 10px rgba(212, 163, 89, 0.5);
    }
    .opp-hp {
      background: linear-gradient(90deg, #e63946 0%, #c2362b 100%);
      box-shadow: 0 0 10px rgba(194, 54, 43, 0.5);
    }
    .stamina-fill {
      background: #e08b34;
    }
    .ult-btn {
      width: 100%;
      margin-top: 0.4rem;
      padding: 0.5rem;
      background: rgba(212, 163, 89, 0.08);
      border: 1px solid rgba(212, 163, 89, 0.2);
      color: rgba(212, 163, 89, 0.4);
      font-family: 'Cinzel', serif;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      border-radius: 6px;
      cursor: not-allowed;
      transition: all 0.3s ease;
    }
    .ult-btn.ready {
      background: linear-gradient(135deg, #f0c375, #d4a359);
      color: #0c0b0a;
      border: none;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(240, 195, 117, 0.7);
      animation: pulse 1.2s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    .opp-state-badge {
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      color: rgba(212, 163, 89, 0.6);
      letter-spacing: 0.15em;
    }
    .parry-banner {
      align-self: center;
      background: rgba(12, 10, 8, 0.92);
      border: 2px solid #f0c375;
      padding: 1.5rem 3.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 0 50px rgba(212, 163, 89, 0.6);
      animation: popIn 0.1s ease-out;
    }
    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .parry-title {
      font-family: 'Cinzel', serif;
      font-size: 1.8rem;
      font-weight: 900;
      letter-spacing: 0.25em;
      color: #f0c375;
      text-shadow: 0 0 15px rgba(212, 163, 89, 0.8);
    }
    .parry-timer {
      font-family: 'Cinzel', serif;
      font-size: 2.2rem;
      font-weight: 900;
      color: #f3ede2;
      margin-top: 0.2rem;
    }
    .parry-quote {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.85rem;
      font-style: italic;
      color: rgba(212, 163, 89, 0.8);
      margin-top: 0.4rem;
    }
    .victory-modal {
      position: absolute;
      inset: 0;
      background: rgba(5, 5, 6, 0.88);
      backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
    }
    .modal-content {
      background: #151310;
      border: 2px solid rgba(212, 163, 89, 0.4);
      padding: 3rem 4rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 163, 89, 0.2);
    }
    .modal-content h2 {
      font-family: 'Cinzel', serif;
      font-size: 2.8rem;
      letter-spacing: 0.25em;
      margin-bottom: 0.6rem;
      color: #f0c375;
    }
    .modal-sub {
      font-family: 'Shippori Mincho', serif;
      color: rgba(243, 237, 226, 0.7);
      margin-bottom: 2.2rem;
      font-size: 1.05rem;
    }
    .modal-actions {
      display: flex;
      gap: 1.2rem;
      justify-content: center;
    }
    .action-btn {
      padding: 0.85rem 1.8rem;
      border-radius: 6px;
      font-family: 'Cinzel', serif;
      font-weight: 800;
      letter-spacing: 0.15em;
      cursor: pointer;
      background: linear-gradient(135deg, #f0c375, #d4a359);
      color: #0c0b0a;
      border: none;
      transition: all 0.25s ease;
      box-shadow: 0 4px 15px rgba(212, 163, 89, 0.3);
    }
    .action-btn:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 20px rgba(212, 163, 89, 0.6);
    }
    .action-btn.outline {
      background: transparent;
      border: 1px solid rgba(212, 163, 89, 0.4);
      color: #f3ede2;
    }
    .action-btn.outline:hover {
      border-color: #f0c375;
      background: rgba(212, 163, 89, 0.1);
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
      font-family: 'Cinzel', serif;
      font-size: 0.8rem;
      font-weight: 800;
      color: #f0c375;
      letter-spacing: 0.1em;
    }
    .control-badge {
      background: rgba(18, 16, 14, 0.7);
      border: 1px solid rgba(212, 163, 89, 0.2);
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      color: rgba(243, 237, 226, 0.75);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .control-badge.highlight {
      border-color: rgba(212, 163, 89, 0.6);
      color: #f0c375;
    }
    .control-badge.ult-badge {
      border-color: rgba(194, 54, 43, 0.6);
      color: #e63946;
    }
    kbd {
      background: rgba(212, 163, 89, 0.15);
      border: 1px solid rgba(212, 163, 89, 0.3);
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.75rem;
      color: #f0c375;
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
