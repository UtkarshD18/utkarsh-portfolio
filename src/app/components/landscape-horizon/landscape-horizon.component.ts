import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeOfDayService } from '../../core/services/time-of-day.service';
import { AudioService } from '../../core/services/audio.service';

interface PlantedSword {
  id: string;
  name: string;
  kanji: string;
  tagline: string;
  techTitle: string;
  techDesc: string;
  stackTags: string[];
  xPercent: number; // horizontal placement %
  yPercent: number; // vertical height in battlefield %
  tiltDeg: number; // angle planted into earth
  bladeLength: number;
}

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

      <!-- Celestial Body (Dawn Sun / Full Moon) -->
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

      <!-- Distant Mountain Ridge 1 -->
      <svg class="mountain-layer ridge-distant" viewBox="0 0 1440 380" preserveAspectRatio="none">
        <path
          d="M0,240 Q180,110 360,180 T720,130 T1080,200 T1440,150 L1440,380 L0,380 Z"
          fill="rgba(255, 255, 255, 0.03)"
        />
      </svg>

      <!-- Mid Mountain Ridge 2 -->
      <svg class="mountain-layer ridge-mid" viewBox="0 0 1440 420" preserveAspectRatio="none">
        <path
          d="M0,280 Q240,160 480,220 T960,170 T1200,240 T1440,190 L1440,420 L0,420 Z"
          fill="rgba(255, 255, 255, 0.06)"
        />
      </svg>

      <!-- Morning Valley Mist / Fog Layer -->
      <div class="valley-mist" [style.opacity]="phaseInfo().fogOpacity">
        <div class="mist-band band-1"></div>
        <div class="mist-band band-2"></div>
      </div>

      <!-- Fore Mountain Ridge 3 (Ashina Battlefield Base) -->
      <svg class="mountain-layer ridge-near" viewBox="0 0 1440 460" preserveAspectRatio="none">
        <path
          d="M0,320 Q200,240 400,290 T800,250 T1150,300 T1440,260 L1440,460 L0,460 Z"
          fill="rgba(0, 0, 0, 0.94)"
        />
      </svg>

      <!-- Sekiro War Banners (Hata-Jirushi Flags) -->
      <div class="war-banner banner-1">
        <div class="banner-pole"></div>
        <div class="banner-cloth">
          <span>風林火山</span>
        </div>
      </div>
      <div class="war-banner banner-2">
        <div class="banner-pole"></div>
        <div class="banner-cloth">
          <span>不敗心</span>
        </div>
      </div>

      <!-- Sekiro Silvergrass Battlefield Layer (Susuki Reeds Swaying) -->
      <div class="silvergrass-field">
        @for (i of grassReeds; track i) {
          <div
            class="silvergrass-reed"
            [style.left.%]="(i * 3.3) % 100"
            [style.height.px]="60 + (i % 7) * 12"
            [style.animation-delay.s]="(i * 0.15) % 2"
          ></div>
        }
      </div>

      <!-- Planted Katana Sword Props in Battlefield Ground -->
      <div class="planted-swords-layer">
        @for (sword of swords; track sword.id) {
          <div
            class="katana-prop-wrapper"
            [style.left.%]="sword.xPercent"
            [style.top.%]="sword.yPercent"
            (mouseenter)="onHoverSword(sword)"
            (click)="selectSword(sword)"
          >
            <!-- Stylized Planted Katana Blade SVG -->
            <div class="katana-visual" [style.transform]="'rotate(' + sword.tiltDeg + 'deg)'">
              <svg width="45" height="130" viewBox="0 0 45 130" class="katana-svg">
                <!-- Blade Aura Glow -->
                <line x1="22" y1="20" x2="22" y2="120" stroke="rgba(255, 255, 255, 0.4)" stroke-width="6" stroke-linecap="round" />
                
                <!-- Polished Katana Blade & Hamon -->
                <path d="M21,120 L23,120 L24,40 Q24,20 22,12 Q20,20 20,40 Z" fill="#ffffff" />
                <path d="M22,120 L23,120 L23,40 Q23,22 22,16 Z" fill="#cccccc" />

                <!-- Tsuba Handguard (Golden/Silver Guard) -->
                <ellipse cx="22" cy="40" rx="9" ry="3.5" fill="#ffffff" stroke="#000000" stroke-width="1.2" />

                <!-- Tsuka Handle (Wrapped Grip) -->
                <rect x="20" y="4" width="4" height="36" fill="#111111" stroke="#ffffff" stroke-width="0.8" rx="1.5" />
                <!-- Ito wrap cross diamond patterns -->
                <line x1="20" y1="10" x2="24" y2="14" stroke="#ffffff" stroke-width="1" />
                <line x1="24" y1="10" x2="20" y2="14" stroke="#ffffff" stroke-width="1" />
                <line x1="20" y1="18" x2="24" y2="22" stroke="#ffffff" stroke-width="1" />
                <line x1="24" y1="18" x2="20" y2="22" stroke="#ffffff" stroke-width="1" />
                <line x1="20" y1="26" x2="24" y2="30" stroke="#ffffff" stroke-width="1" />
                <line x1="24" y1="26" x2="20" y2="30" stroke="#ffffff" stroke-width="1" />

                <!-- Kashira Pommel Cap -->
                <ellipse cx="22" cy="4" rx="3.5" ry="2" fill="#ffffff" />

                <!-- Prayer Seal Tag attached to blade -->
                <rect x="24" y="44" width="7" height="16" fill="#ffffff" opacity="0.8" rx="1" />
                <text x="25.5" y="55" font-size="7" font-family="serif" fill="#000">{{ sword.kanji[0] }}</text>
              </svg>

              <!-- Soil Mound / Blade Burial Ground -->
              <div class="ground-dirt"></div>
            </div>

            <!-- Blade Name Tag -->
            <div class="sword-nametag">
              <span class="sword-kanji">{{ sword.kanji }}</span>
              <span class="sword-name">{{ sword.name }}</span>
            </div>
          </div>
        }
      </div>

      <!-- Active Sword Mastery Tech Popup Scroll -->
      @if (activeSword()) {
        <div class="tech-scroll-overlay" (click)="activeSword.set(null)">
          <div class="sekiro-scroll-card" (click)="$event.stopPropagation()">
            <div class="scroll-header">
              <div class="scroll-seal">
                <span class="seal-kanji">{{ activeSword()!.kanji }}</span>
              </div>
              <div class="scroll-title-group">
                <span class="scroll-kicker">SEKIRO MASTER KERNEL · 秘伝</span>
                <h3>{{ activeSword()!.techTitle }}</h3>
              </div>
              <button class="close-scroll-btn" (click)="activeSword.set(null)">✕</button>
            </div>
            
            <p class="scroll-desc">{{ activeSword()!.techDesc }}</p>

            <div class="scroll-tags">
              @for (tag of activeSword()!.stackTags; track tag) {
                <span class="tech-tag">⚔ {{ tag }}</span>
              }
            </div>

            <div class="scroll-footer">
              <span class="tagline">"{{ activeSword()!.tagline }}"</span>
              <button class="clash-sound-btn" (click)="triggerBladeClash()">
                CLASH STEEL
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Live IST Time Bar HUD -->
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
      height: 740px;
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

    /* Celestial Body */
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
    }

    /* Mountain Layers */
    .mountain-layer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
    }
    .ridge-distant { bottom: 0; height: 380px; }
    .ridge-mid { bottom: 0; height: 420px; }
    .ridge-near { bottom: 0; height: 460px; }

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
    .band-1 { animation: driftMist 24s linear infinite; }
    .band-2 { animation: driftMist 36s linear infinite reverse; opacity: 0.7; }
    @keyframes driftMist {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Sekiro War Banners */
    .war-banner {
      position: absolute;
      bottom: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }
    .banner-1 { left: 12%; }
    .banner-2 { right: 14%; }
    .banner-pole {
      width: 3px;
      height: 120px;
      background: #444444;
      border-radius: 2px;
    }
    .banner-cloth {
      position: absolute;
      top: 10px;
      left: 3px;
      background: rgba(18, 18, 18, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.6rem 0.3rem;
      border-radius: 2px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.9);
      animation: bannerWave 3.5s infinite ease-in-out alternate;
      transform-origin: left top;
    }
    .banner-cloth span {
      writing-mode: vertical-rl;
      font-family: 'Shippori Mincho', serif;
      font-size: 0.85rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.2em;
    }
    @keyframes bannerWave {
      from { transform: skewY(-2deg) rotate(-1deg); }
      to { transform: skewY(4deg) rotate(2deg); }
    }

    /* Silvergrass Reeds Field */
    .silvergrass-field {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 140px;
      pointer-events: none;
    }
    .silvergrass-reed {
      position: absolute;
      bottom: 0;
      width: 1.5px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 80%, transparent 100%);
      transform-origin: bottom center;
      animation: reedSway 2.8s infinite ease-in-out alternate;
    }
    @keyframes reedSway {
      from { transform: rotate(-5deg); }
      to { transform: rotate(8deg); }
    }

    /* Planted Katana Props Layer */
    .planted-swords-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .katana-prop-wrapper {
      position: absolute;
      pointer-events: auto;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }
    .katana-prop-wrapper:hover {
      transform: translateY(-8px) scale(1.1);
      z-index: 20;
    }
    .katana-visual {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
      transition: filter 0.3s ease;
    }
    .katana-prop-wrapper:hover .katana-visual {
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.95));
    }
    .ground-dirt {
      width: 28px;
      height: 6px;
      background: radial-gradient(ellipse, #ffffff 0%, #333333 70%, transparent 100%);
      border-radius: 50%;
      margin-top: -8px;
      opacity: 0.6;
    }
    .sword-nametag {
      margin-top: 0.4rem;
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      padding: 0.2rem 0.55rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 700;
      white-space: nowrap;
      transition: all 0.25s ease;
    }
    .katana-prop-wrapper:hover .sword-nametag {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    }
    .sword-kanji {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.85rem;
    }
    .sword-name {
      font-family: 'Cinzel', serif;
      letter-spacing: 0.1em;
    }

    /* Sekiro Tech Scroll Mastery Popup */
    .tech-scroll-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      z-index: 100;
      animation: fadeIn 0.25s ease-out;
    }
    .sekiro-scroll-card {
      background: #0d0d0f;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 12px;
      padding: 2.2rem 2.8rem;
      max-width: 540px;
      box-shadow: 0 0 50px rgba(255, 255, 255, 0.2), 0 20px 50px rgba(0, 0, 0, 0.95);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      position: relative;
    }
    .scroll-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      position: relative;
    }
    .scroll-seal {
      width: 44px;
      height: 44px;
      background: #ffffff;
      color: #000000;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Shippori Mincho', serif;
      font-size: 1.6rem;
      font-weight: 900;
      flex-shrink: 0;
    }
    .scroll-title-group {
      flex: 1;
    }
    .scroll-kicker {
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 700;
    }
    .scroll-title-group h3 {
      font-family: 'Cinzel', serif;
      font-size: 1.35rem;
      font-weight: 900;
      color: #ffffff;
      margin-top: 0.2rem;
    }
    .close-scroll-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .close-scroll-btn:hover {
      background: #ffffff;
      color: #000000;
    }
    .scroll-desc {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.7;
    }
    .scroll-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .tech-tag {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .scroll-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding-top: 1rem;
      margin-top: 0.5rem;
    }
    .tagline {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.8rem;
      font-style: italic;
      color: rgba(255, 255, 255, 0.6);
    }
    .clash-sound-btn {
      background: #ffffff;
      border: none;
      color: #000000;
      font-weight: 900;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .clash-sound-btn:hover {
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
      transform: scale(1.04);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    /* Live IST Time Bar */
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
    .phase-kanji { font-family: 'Shippori Mincho', serif; font-size: 0.9rem; }
    .cycle-hint { font-size: 0.85rem; opacity: 0.6; }
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
    .reset-ist-btn:hover { background: rgba(255, 255, 255, 0.15); }

    @media (max-width: 1024px) {
      .ist-time-bar { top: 0.6rem; right: 1.5rem; }
    }
  `]
})
export class LandscapeHorizonComponent {
  timeService = inject(TimeOfDayService);
  private audio = inject(AudioService);

  currentPhase = computed(() => this.timeService.getCalculatedPhase());
  phaseInfo = computed(() => this.timeService.getActivePhaseInfo());

  // Silvergrass reeds array count
  readonly grassReeds = Array.from({ length: 32 }, (_, i) => i);

  readonly activeSword = signal<PlantedSword | null>(null);

  // Planted Katana Props across the Ashina Battlefield
  readonly swords: PlantedSword[] = [
    {
      id: 'sword_cpp',
      name: 'KUSABIMARU · 楔丸',
      kanji: '楔',
      tagline: 'Zero-copy memory buffers tempered like folded tamahagane steel.',
      techTitle: 'C++ 20 & SIMD Vector Physics Engine',
      techDesc: 'Deterministic AABB & Capsule Hitbox calculations, 70ms parry detection frame windows, and zero-copy 32-float linear memory streaming directly to Three.js vertex shaders at 0 GC latency.',
      stackTags: ['C++ 20', 'SIMD Pointers', 'Fixed-Point Math', 'Zero-GC Memory'],
      xPercent: 18,
      yPercent: 48,
      tiltDeg: -12,
      bladeLength: 90
    },
    {
      id: 'sword_wasm',
      name: 'MORTAL BLADE · 拝涙',
      kanji: '涙',
      tagline: 'Direct WebAssembly compilation binding low-level systems to modern web.',
      techTitle: 'WebAssembly (WASM) High-Throughput Kernel',
      techDesc: 'Compiles low-level C++ binaries via Emscripten into WebAssembly byte-code, delivering sub-millisecond execution benchmarks for combat simulations in the browser.',
      stackTags: ['WASM', 'Emscripten', 'WebAssembly Bytecode', 'Native Speed'],
      xPercent: 44,
      yPercent: 54,
      tiltDeg: 6,
      bladeLength: 100
    },
    {
      id: 'sword_shaders',
      name: 'DRAGON FLASH · 竜閃',
      kanji: '閃',
      tagline: 'Custom GLSL shaders carving dynamic fractured terrain in Three.js.',
      techTitle: 'Three.js & Custom GLSL Ground Fissures',
      techDesc: 'Procedural vertex displacement shaders, dynamic rim lighting, custom particle emitters for drifting sparks, and 60FPS WebGL rendering loops.',
      stackTags: ['Three.js', 'WebGL', 'GLSL Shaders', 'Dynamic Lighting'],
      xPercent: 78,
      yPercent: 49,
      tiltDeg: 14,
      bladeLength: 95
    },
    {
      id: 'sword_athlete',
      name: 'SHADOW RUSH · 影突',
      kanji: '影',
      tagline: '120ms National Table Tennis reflex engine and neural composure.',
      techTitle: '120ms Competitive Neural Composure',
      techDesc: 'High-speed ball trajectory prediction mapped to algorithmic real-time reaction loops. Composure under high-frequency competitive pressure.',
      stackTags: ['120ms Reaction', 'National Athlete', 'Trajectory Pred', 'Composure'],
      xPercent: 90,
      yPercent: 56,
      tiltDeg: -8,
      bladeLength: 88
    }
  ];

  onHoverSword(sword: PlantedSword): void {
    this.audio.playBladeSlice();
  }

  selectSword(sword: PlantedSword): void {
    this.activeSword.set(sword);
    this.audio.playParry();
  }

  triggerBladeClash(): void {
    this.audio.playParry();
  }
}
