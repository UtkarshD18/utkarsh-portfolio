import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoonFooterComponent } from '../../components/moon-footer/moon-footer.component';
import { BirdHuntComponent } from '../../components/bird-hunt/bird-hunt.component';
import { WordPropsComponent } from '../../components/word-props/word-props.component';
import { LandscapeHorizonComponent } from '../../components/landscape-horizon/landscape-horizon.component';
import { AudioService } from '../../core/services/audio.service';
import { CharacterConfigService } from '../../core/services/character-config.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, MoonFooterComponent, BirdHuntComponent, WordPropsComponent, LandscapeHorizonComponent],
  template: `
    <div class="portfolio-container sumi-monochrome">
      <!-- Dynamic IST Time-Synced Japanese Mountain Landscape & Dawn Horizon -->
      <app-landscape-horizon></app-landscape-horizon>

      <!-- Interactive Duck / Bird Hunting Arcade Game Layer -->
      <app-bird-hunt></app-bird-hunt>

      <!-- Interactive Word Props Layer (Touch / Pin Detection) -->
      <app-word-props></app-word-props>

      <!-- Background Kanji Watermarks & Game Vignette -->
      <div class="blade-slash-hint">
        <span>🎯 CLICK ANYWHERE TO SHOOT FLYING BIRDS · TOUCH WORD PROPS TO PIN</span>
      </div>
      <div class="kanji-watermark hero-kanji">射撃</div>

      <!-- Minimalist Monochrome Samurai Navbar -->
      <nav class="nav-bar">
        <div class="brand-logo">
          <span class="mon-seal">○</span>
          <div class="brand-text">
            <span class="brand-name">UTKARSH</span>
            <span class="brand-kanji">黒白 · KUROSHIRO</span>
          </div>
        </div>
        <div class="nav-links">
          <a href="#stances" class="nav-link"><span>01</span> STANCES</a>
          <a href="#build" class="nav-link"><span>02</span> FORGE</a>
          <a href="#compete" class="nav-link"><span>03</span> COMBAT</a>
          <a href="#observe" class="nav-link"><span>04</span> OBSERVATION</a>
          <a href="/admin" class="nav-link studio-link">STUDIO</a>
        </div>
      </nav>

      <!-- Hero Section (Monochrome Kurosawa Samurai) -->
      <header class="hero-section">
        <div class="hero-haiku-kicker">
          <span class="kicker-line"></span>
          <span class="kicker-text">LOW-LATENCY · SYSTEMS · COMPOSURE</span>
          <span class="kicker-kanji">無刀流</span>
        </div>
        <h1 class="hero-title">
          Forge <span class="white-text">Systems</span>.<br />
          Sever the <span class="silver-text">Blade</span>.<br />
          Observe the <span class="white-outline">Void</span>.
        </h1>
        <p class="hero-subtitle">
          Built with low-level C++ architectures, deterministic WebGL combat physics, and unyielding focus.
        </p>

        <!-- Stance Selector Switcher -->
        <div class="stance-selector" id="stances">
          <span class="stance-label">ACTIVE STANCE:</span>
          <div class="stance-pills">
            <button
              class="stance-pill"
              [class.active]="activeStance() === 'stone'"
              (click)="setStance('stone')"
            >
              <span class="stance-kanji">岩</span>
              <span>STONE (C++)</span>
            </button>
            <button
              class="stance-pill"
              [class.active]="activeStance() === 'water'"
              (click)="setStance('water')"
            >
              <span class="stance-kanji">水</span>
              <span>WATER (WASM)</span>
            </button>
            <button
              class="stance-pill"
              [class.active]="activeStance() === 'wind'"
              (click)="setStance('wind')"
            >
              <span class="stance-kanji">風</span>
              <span>WIND (ATHLETE)</span>
            </button>
            <button
              class="stance-pill"
              [class.active]="activeStance() === 'moon'"
              (click)="setStance('moon')"
            >
              <span class="stance-kanji">月</span>
              <span>MOON (ZEN)</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Bento Grid (Monochrome Sumi-E Dossiers) -->
      <section class="bento-grid" id="build">
        <!-- 1. Systems & Core Engineering Dossier -->
        <div class="bento-card bento-wide washi-card">
          <div class="kanji-bg-card">斬</div>
          <div class="card-header">
            <span class="card-tag">FORGE / LOW-LATENCY</span>
            <span class="seal-stamp">極</span>
          </div>
          <h3>C++ WebAssembly & 3D WebGL Combat Engine</h3>
          <p>
            Deterministic collision detection, 70ms parry detection frames, and zero-copy 32-float linear memory buffer streaming directly to Three.js vertex shaders at zero garbage-collection latency.
          </p>
          <div class="tech-pills">
            <span class="pill">C++ 20</span>
            <span class="pill">WebAssembly (WASM)</span>
            <span class="pill">Three.js Shaders</span>
            <span class="pill">Angular 18 Signals</span>
          </div>
          <div class="ink-line"></div>
        </div>

        <!-- 2. Interactive Soundboard Card -->
        <div class="bento-card soundboard-card washi-card">
          <div class="kanji-bg-card">音</div>
          <div class="card-header">
            <span class="card-tag">AUDIO LAB</span>
            <span class="seal-stamp">響</span>
          </div>
          <h3>Echoes of the Blade</h3>
          <p>Web Audio API synthesis for metallic parry harmonics, sword swooshes, and viral character dialogues.</p>
          <div class="sound-controls">
            <button class="sound-btn" (click)="playRandomSound()">
              <span class="play-icon">⚔</span>
              <span>{{ isPlayingSound() ? 'STRIKING...' : 'CLASH BLADE' }}</span>
            </button>
            <div class="sound-wave" [class.active]="isPlayingSound()">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div class="ink-line"></div>
        </div>

        <!-- 3. National Level Athlete & Competitive Composure -->
        <div class="bento-card washi-card" id="compete">
          <div class="kanji-bg-card">速</div>
          <div class="card-header">
            <span class="card-tag">COMPETITIVE METRICS</span>
            <span class="seal-stamp">武</span>
          </div>
          <h3>National Table Tennis</h3>
          <p>Engineering taught me to decompose problems. High-speed competition taught me to remain completely still while reacting.</p>
          <div class="stats-list">
            <div class="stat-row">
              <span>Reaction Reflex</span>
              <span class="stat-val">120 ms</span>
            </div>
            <div class="stat-row">
              <span>Combat Composure</span>
              <span class="stat-val">99.8%</span>
            </div>
          </div>
          <div class="ink-line"></div>
        </div>

        <!-- 4. Philosophy & Observe -->
        <div class="bento-card bento-wide washi-card" id="observe">
          <div class="kanji-bg-card">心</div>
          <div class="card-header">
            <span class="card-tag">WAY OF THE OBSERVER</span>
            <span class="seal-stamp">道</span>
          </div>
          <h3>The Space Between Reaction & Awareness</h3>
          <blockquote class="zen-quote">
            "The warrior is not one who never feels fear, but one who observes the blade without trembling. Look inward before striking outward."
          </blockquote>
          <div class="influences">
            <span>Bushido</span> · <span>Zen Stillness</span> · <span>Jain Anekantavada</span> · <span>Stoic Reason</span>
          </div>
          <div class="ink-line"></div>
        </div>
      </section>

      <!-- Moon Ritual Gateway Footer -->
      <app-moon-footer></app-moon-footer>
    </div>
  `,
  styles: [`
    .portfolio-container {
      min-height: 100vh;
      background: #000000;
      color: #ffffff;
      position: relative;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }

    .blade-slash-hint {
      position: absolute;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.35rem 1rem;
      border-radius: 999px;
      background: rgba(10, 10, 10, 0.6);
      pointer-events: none;
      z-index: 2;
    }

    .kanji-watermark {
      position: absolute;
      font-family: 'Shippori Mincho', serif;
      font-size: 26rem;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.025);
      top: 30px;
      right: 30px;
      user-select: none;
      pointer-events: none;
      z-index: 0;
      line-height: 1;
    }

    /* Navbar */
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.2rem 4.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      position: relative;
      z-index: 10;
      backdrop-filter: blur(14px);
      background: rgba(0, 0, 0, 0.6);
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .mon-seal {
      font-size: 1.4rem;
      color: #ffffff;
      background: #000000;
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 0.25rem 0.55rem;
      border-radius: 4px;
    }
    .brand-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-family: 'Cinzel', serif;
      font-weight: 900;
      letter-spacing: 0.25em;
      font-size: 1.1rem;
      color: #ffffff;
    }
    .brand-kanji {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.6);
      letter-spacing: 0.3em;
    }
    .nav-links {
      display: flex;
      gap: 2.5rem;
      align-items: center;
    }
    .nav-link {
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
      font-size: 0.8rem;
      letter-spacing: 0.2em;
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .nav-link span {
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 700;
    }
    .nav-link:hover {
      color: #ffffff;
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
    }
    .studio-link {
      color: #000000;
      background: #ffffff;
      border: 1px solid #ffffff;
      padding: 0.35rem 0.9rem;
      border-radius: 4px;
      font-weight: 700;
    }
    .studio-link:hover {
      background: transparent;
      color: #ffffff;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    }

    /* Hero Section */
    .hero-section {
      padding: 5.5rem 4.5rem 3.5rem;
      max-width: 1050px;
      position: relative;
      z-index: 2;
    }
    .hero-haiku-kicker {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.8rem;
    }
    .kicker-line {
      width: 32px;
      height: 1px;
      background: #ffffff;
    }
    .kicker-text {
      font-size: 0.8rem;
      letter-spacing: 0.3em;
      color: #ffffff;
      font-weight: 700;
    }
    .kicker-kanji {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    }
    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: 4.8rem;
      font-weight: 900;
      line-height: 1.12;
      letter-spacing: -0.01em;
      margin-bottom: 2rem;
      color: #ffffff;
    }
    .white-text {
      color: #ffffff;
      text-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
    }
    .silver-text {
      color: #c0c0c0;
    }
    .white-outline {
      color: transparent;
      -webkit-text-stroke: 1.5px #ffffff;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.7;
      max-width: 720px;
      margin-bottom: 2.8rem;
    }

    /* Stance Selector */
    .stance-selector {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    .stance-label {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 700;
    }
    .stance-pills {
      display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
    }
    .stance-pill {
      background: rgba(18, 18, 18, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.75);
      padding: 0.55rem 1.1rem;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .stance-kanji {
      font-family: 'Shippori Mincho', serif;
      color: #ffffff;
      font-size: 0.95rem;
      transition: transform 0.25s ease;
    }
    .stance-pill:hover {
      border-color: #ffffff;
      color: #fff;
      background: rgba(36, 36, 36, 0.95);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.15);
    }
    .stance-pill:hover .stance-kanji {
      transform: scale(1.15);
    }
    .stance-pill:active {
      transform: scale(0.96) translateY(0);
    }
    .stance-pill.active {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
    }
    .stance-pill.active .stance-kanji {
      color: #000000;
    }

    /* Bento Grid */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.8rem;
      padding: 2rem 4.5rem 6rem;
      max-width: 1440px;
      position: relative;
      z-index: 2;
    }
    .washi-card {
      background: rgba(12, 12, 12, 0.88);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 14px;
      padding: 2.8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
    }
    .washi-card:hover {
      transform: translateY(-6px) scale(1.008);
      border-color: #ffffff;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 255, 255, 0.2);
    }
    .kanji-bg-card {
      position: absolute;
      right: 1.5rem;
      bottom: 1.5rem;
      font-family: 'Shippori Mincho', serif;
      font-size: 6rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.04);
      user-select: none;
      pointer-events: none;
      line-height: 1;
      transition: transform 0.4s ease, color 0.4s ease;
    }
    .washi-card:hover .kanji-bg-card {
      transform: scale(1.08) rotate(-4deg);
      color: rgba(255, 255, 255, 0.08);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
    }
    .card-tag {
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      color: #ffffff;
      font-weight: 700;
    }
    .seal-stamp {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.75rem;
      color: #ffffff;
      border: 1px solid #ffffff;
      padding: 0.1rem 0.35rem;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.1);
      transition: all 0.25s ease;
    }
    .washi-card:hover .seal-stamp {
      background: #ffffff;
      color: #000000;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
    }
    .bento-card h3 {
      font-family: 'Cinzel', serif;
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #ffffff;
    }
    .bento-card p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.7;
      margin-bottom: 1.8rem;
      font-size: 0.95rem;
    }
    .bento-wide {
      grid-column: span 2;
    }
    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .pill {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      color: #ffffff;
      transition: all 0.2s ease;
    }
    .pill:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: #ffffff;
      transform: translateY(-1px);
    }
    .ink-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    }

    /* Soundboard */
    .sound-controls {
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }
    .sound-btn {
      background: #ffffff;
      border: none;
      color: #000000;
      font-weight: 900;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      box-shadow: 0 4px 15px rgba(255, 255, 255, 0.25);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .sound-btn:hover {
      background: #ffffff;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 25px rgba(255, 255, 255, 0.6);
    }
    .sound-btn:active {
      transform: scale(0.95);
    }
    .sound-wave {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 24px;
    }
    .sound-wave span {
      width: 3px;
      height: 6px;
      background: #ffffff;
      border-radius: 2px;
      transition: height 0.1s ease;
    }
    .sound-wave.active span {
      animation: wave 0.4s infinite alternate;
    }
    .sound-wave.active span:nth-child(2) { animation-delay: 0.1s; }
    .sound-wave.active span:nth-child(3) { animation-delay: 0.2s; }
    .sound-wave.active span:nth-child(4) { animation-delay: 0.15s; }
    .sound-wave.active span:nth-child(5) { animation-delay: 0.05s; }
    @keyframes wave {
      from { height: 4px; }
      to { height: 22px; }
    }

    /* Stats List */
    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.95rem;
    }
    .stat-val {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      color: #ffffff;
    }
    .zen-quote {
      font-family: 'Shippori Mincho', serif;
      font-size: 1.35rem;
      font-style: italic;
      color: #ffffff;
      border-left: 2px solid #ffffff;
      padding-left: 1.5rem;
      margin: 1.2rem 0 1.8rem;
      line-height: 1.7;
    }
    .influences {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.6);
      letter-spacing: 0.15em;
    }

    @media (max-width: 1024px) {
      .bento-grid { grid-template-columns: 1fr; padding: 2rem; }
      .bento-wide { grid-column: span 1; }
      .hero-title { font-size: 3.2rem; }
      .nav-bar { padding: 1.5rem 2rem; }
      .hero-section { padding: 3rem 2rem; }
    }
  `]
})
export class PortfolioComponent {
  private audio = inject(AudioService);
  private charConfig = inject(CharacterConfigService);

  readonly isPlayingSound = signal<boolean>(false);
  readonly activeStance = signal<'stone' | 'water' | 'wind' | 'moon'>('stone');

  setStance(stance: 'stone' | 'water' | 'wind' | 'moon'): void {
    this.activeStance.set(stance);
    this.audio.playParry();
  }

  playRandomSound(): void {
    if (this.isPlayingSound()) return;
    this.isPlayingSound.set(true);
    this.audio.playParry();

    setTimeout(() => {
      this.isPlayingSound.set(false);
    }, 600);
  }
}

