import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeOfDayService, TimePhase } from '../../core/services/time-of-day.service';

@Component({
  selector: 'app-landscape-horizon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="landscape-container" [attr.data-phase]="currentPhase()">
      <!-- Sky Background with Atmosphere Gradient -->
      <div
        class="sky-backdrop"
        [style.background]="phaseInfo().skyGradient"
      ></div>

      <!-- Celestial Body (Dawn Sun / Moon) -->
      <div
        class="celestial-body"
        [class.dawn-sun]="phaseInfo().sunMoonType === 'dawn_sun'"
        [class.day-sun]="phaseInfo().sunMoonType === 'day_sun'"
        [class.dusk-sun]="phaseInfo().sunMoonType === 'dusk_sun'"
        [class.night-moon]="phaseInfo().sunMoonType === 'night_moon'"
        [style.top.%]="phaseInfo().sunMoonY"
      >
        <div class="celestial-core"></div>
        <div class="celestial-halo"></div>
      </div>

      <!-- Distant Mountain Ridge 1 (Farthest Layer) -->
      <svg class="mountain-layer ridge-distant" viewBox="0 0 1440 380" preserveAspectRatio="none">
        <path
          d="M0,240 Q180,110 360,180 T720,130 T1080,200 T1440,150 L1440,380 L0,380 Z"
          fill="rgba(255, 255, 255, 0.03)"
        />
      </svg>

      <!-- Mid Mountain Ridge 2 (With Mountain Peak Silhouette) -->
      <svg class="mountain-layer ridge-mid" viewBox="0 0 1440 420" preserveAspectRatio="none">
        <path
          d="M0,280 Q240,160 480,220 T960,170 T1200,240 T1440,190 L1440,420 L0,420 Z"
          fill="rgba(255, 255, 255, 0.06)"
        />
      </svg>

      <!-- Morning Valley Mist / Fog Layer -->
      <div
        class="valley-mist"
        [style.opacity]="phaseInfo().fogOpacity"
      >
        <div class="mist-band band-1"></div>
        <div class="mist-band band-2"></div>
      </div>

      <!-- Fore Mountain Ridge 3 (With Pine Tree / Pagoda Silhouettes) -->
      <svg class="mountain-layer ridge-near" viewBox="0 0 1440 460" preserveAspectRatio="none">
        <path
          d="M0,320 Q200,240 400,290 T800,250 T1150,300 T1440,260 L1440,460 L0,460 Z"
          fill="rgba(0, 0, 0, 0.92)"
        />
        <!-- Pagoda & Pine Tree Silhouettes -->
        <g fill="#000000" transform="translate(1080, 210) scale(0.65)">
          <!-- Pagoda tiers -->
          <polygon points="40,0 20,25 60,25" />
          <polygon points="40,20 10,45 70,45" />
          <polygon points="40,40 0,70 80,70" />
          <rect x="35" y="70" width="10" height="30" />
        </g>
      </svg>

      <!-- Soaring Cranes Silhouette -->
      <div class="cranes-container">
        <div class="crane crane-1">⋏</div>
        <div class="crane crane-2">⋏</div>
        <div class="crane crane-3">⋏</div>
      </div>

      <!-- Live IST Time & Phase Switcher HUD -->
      <div class="ist-time-bar">
        <div class="ist-clock">
          <span class="live-pulse">●</span>
          <span class="clock-digits">{{ timeService.currentIstString() }}</span>
        </div>
        <button class="phase-toggle-btn" (click)="timeService.cyclePhase()" title="Click to cycle time of day">
          <span class="phase-kanji">{{ phaseInfo().kanji }}</span>
          <span class="phase-name">{{ phaseInfo().label }}</span>
          <span class="cycle-hint">⇄</span>
        </button>
        @if (timeService.manualPhase()) {
          <button class="reset-ist-btn" (click)="timeService.setPhase(null)" title="Reset to live IST time">
            AUTO IST
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 720px;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }
    .landscape-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .sky-backdrop {
      position: absolute;
      inset: 0;
      transition: background 1.2s ease;
      opacity: 0.9;
    }

    /* Celestial Body (Dawn Sun / Midnight Moon) */
    .celestial-body {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: top 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .celestial-core {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 35px rgba(255, 255, 255, 0.9);
      transition: all 1.2s ease;
    }
    .celestial-halo {
      position: absolute;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
      pointer-events: none;
      animation: pulseGlow 4s infinite alternate ease-in-out;
    }
    @keyframes pulseGlow {
      from { transform: scale(0.9); opacity: 0.6; }
      to { transform: scale(1.15); opacity: 1; }
    }

    /* Dawn Sun Custom Styling */
    .celestial-body.dawn-sun .celestial-core {
      background: linear-gradient(135deg, #ffffff 0%, #e0d0c0 100%);
      box-shadow: 0 0 50px rgba(255, 255, 255, 0.95), 0 0 100px rgba(230, 200, 170, 0.4);
    }
    .celestial-body.dusk-sun .celestial-core {
      background: #e6e6e6;
      box-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
    }
    .celestial-body.night-moon .celestial-core {
      background: #ffffff;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
    }

    /* Mountain Layers */
    .mountain-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
    }
    .ridge-distant {
      bottom: 0;
      height: 380px;
    }
    .ridge-mid {
      bottom: 0;
      height: 420px;
    }
    .ridge-near {
      bottom: 0;
      height: 460px;
    }

    /* Valley Mist */
    .valley-mist {
      position: absolute;
      bottom: 120px;
      left: 0;
      width: 100%;
      height: 160px;
      pointer-events: none;
      transition: opacity 1.2s ease;
    }
    .mist-band {
      position: absolute;
      width: 200%;
      height: 100%;
      background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
    }
    .band-1 {
      animation: driftMist 24s linear infinite;
    }
    .band-2 {
      animation: driftMist 36s linear infinite reverse;
      opacity: 0.7;
    }
    @keyframes driftMist {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Soaring Cranes */
    .cranes-container {
      position: absolute;
      top: 140px;
      left: 15%;
      display: flex;
      gap: 18px;
      animation: flyAcross 40s linear infinite;
    }
    .crane {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.45);
      transform: rotate(35deg);
    }
    .crane-2 { transform: translateY(12px) rotate(35deg) scale(0.85); }
    .crane-3 { transform: translateY(-8px) rotate(35deg) scale(0.75); }
    @keyframes flyAcross {
      0% { transform: translateX(-100px); }
      100% { transform: translateX(1200px); }
    }

    /* Live IST Time Bar HUD */
    .ist-time-bar {
      position: absolute;
      top: 1.2rem;
      right: 4.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      pointer-events: auto;
      z-index: 20;
    }
    .ist-clock {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.75rem;
      color: #ffffff;
    }
    .live-pulse {
      color: #00e676;
      font-size: 0.65rem;
      animation: blink 1.5s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    .phase-toggle-btn {
      background: rgba(15, 15, 15, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #ffffff;
      padding: 0.35rem 0.85rem;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      transition: all 0.25s ease;
    }
    .phase-toggle-btn:hover {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    }
    .phase-kanji {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.9rem;
    }
    .cycle-hint {
      font-size: 0.85rem;
      opacity: 0.6;
    }
    .reset-ist-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      padding: 0.35rem 0.6rem;
      border-radius: 4px;
      font-size: 0.65rem;
      font-weight: 700;
      cursor: pointer;
    }
    .reset-ist-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 1024px) {
      .ist-time-bar {
        top: 0.6rem;
        right: 1.5rem;
      }
    }
  `]
})
export class LandscapeHorizonComponent {
  timeService = inject(TimeOfDayService);

  currentPhase = computed(() => this.timeService.getCalculatedPhase());
  phaseInfo = computed(() => this.timeService.getActivePhaseInfo());
}
