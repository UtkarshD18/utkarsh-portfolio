import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoonFooterComponent } from '../../components/moon-footer/moon-footer.component';
import { AudioService } from '../../core/services/audio.service';
import { CharacterConfigService } from '../../core/services/character-config.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, MoonFooterComponent],
  template: `
    <div class="portfolio-container">
      <!-- Minimalist Navigation Bar -->
      <nav class="nav-bar">
        <div class="brand-logo">
          <span class="enso-icon">○</span>
          <span class="brand-name">UTKARSH</span>
        </div>
        <div class="nav-links">
          <a href="#build" class="nav-link">BUILD</a>
          <a href="#observe" class="nav-link">OBSERVE</a>
          <a href="#compete" class="nav-link">COMPETE</a>
          <a href="/admin" class="nav-link admin-link">STUDIO</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="hero-section">
        <div class="hero-tagline">SOFTWARE / SYSTEMS / ATHLETE</div>
        <h1 class="hero-title">
          I build systems.<br />
          I compete.<br />
          I observe.
        </h1>
        <p class="hero-subtitle">
          Engineered around low-level systems, real-time distributed WebGL architectures, and Zen composure.
        </p>
      </header>

      <!-- Bento Grid Section -->
      <section class="bento-grid" id="build">
        <!-- 1. Systems & Core Engineering Dossier -->
        <div class="bento-card bento-wide">
          <div class="card-tag">SYSTEMS / LOW-LATENCY</div>
          <h3>C++ WebAssembly & 3D WebGL Combat Engine</h3>
          <p>
            Deterministic collision detection, sub-60ms parry windows, and zero-copy linear memory buffer streaming directly to Three.js shaders.
          </p>
          <div class="tech-pills">
            <span class="pill">C++ 20</span>
            <span class="pill">WebAssembly (WASM)</span>
            <span class="pill">Three.js</span>
            <span class="pill">Angular 18 Signals</span>
          </div>
        </div>

        <!-- 2. Interactive Meme Soundboard Card -->
        <div class="bento-card soundboard-card">
          <div class="card-tag">AUDIO LAB</div>
          <h3>Viral Soundboard</h3>
          <p>Interactive Web Audio API synthesis and configured viral voice lines.</p>
          <div class="sound-controls">
            <button class="sound-btn" (click)="playRandomSound()">
              <span class="play-icon">▶</span>
              <span>{{ isPlayingSound() ? 'PLAYING...' : 'TRIGGER SOUND' }}</span>
            </button>
            <div class="sound-wave" [class.active]="isPlayingSound()">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- 3. National Level Athlete & Competitive Composure -->
        <div class="bento-card" id="compete">
          <div class="card-tag">COMPETITIVE METRICS</div>
          <h3>National Table Tennis</h3>
          <p>Engineering taught me to decompose problems. Competition taught me to remain composed while solving them.</p>
          <div class="stats-list">
            <div class="stat-row">
              <span>Reaction Speed</span>
              <span class="stat-val">120 ms</span>
            </div>
            <div class="stat-row">
              <span>Mental Composure</span>
              <span class="stat-val">99.8%</span>
            </div>
          </div>
        </div>

        <!-- 4. Philosophy & Observe -->
        <div class="bento-card bento-wide" id="observe">
          <div class="card-tag">OBSERVE / PHILOSOPHY</div>
          <h3>The Distance Between Reaction & Awareness</h3>
          <blockquote class="zen-quote">
            "The observer is separate from the observed. Remain still enough to see."
          </blockquote>
          <div class="influences">
            <span>Zen</span> · <span>Jain Thought</span> · <span>Sufism</span> · <span>Stoicism</span>
          </div>
        </div>
      </section>

      <!-- Moon Ritual Gateway Footer -->
      <app-moon-footer></app-moon-footer>
    </div>
  `,
  styles: [`
    .portfolio-container {
      min-height: 100vh;
      background: #08080a;
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 4rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.2em;
    }
    .enso-icon {
      font-size: 1.4rem;
      color: #4facfe;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    .nav-link {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      transition: color 0.2s ease;
    }
    .nav-link:hover {
      color: #fff;
    }
    .admin-link {
      color: #00f2fe;
    }
    .hero-section {
      padding: 6rem 4rem 4rem;
      max-width: 900px;
    }
    .hero-tagline {
      font-size: 0.85rem;
      letter-spacing: 0.25em;
      color: #4facfe;
      margin-bottom: 1.5rem;
    }
    .hero-title {
      font-size: 4.5rem;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-bottom: 2rem;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.6;
      max-width: 650px;
    }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      padding: 2rem 4rem 6rem;
      max-width: 1400px;
    }
    .bento-card {
      background: rgba(18, 18, 22, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .bento-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .bento-wide {
      grid-column: span 2;
    }
    .card-tag {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 1rem;
    }
    .bento-card h3 {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
    }
    .bento-card p {
      color: rgba(255, 255, 255, 0.65);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .pill {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.85);
    }
    .sound-controls {
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }
    .sound-btn {
      background: linear-gradient(90deg, #00f2fe, #4facfe);
      border: none;
      color: #000;
      font-weight: 700;
      padding: 0.7rem 1.4rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
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
      background: #00f2fe;
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
    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.75);
    }
    .stat-val {
      font-weight: 700;
      color: #4facfe;
    }
    .zen-quote {
      font-size: 1.25rem;
      font-style: italic;
      color: rgba(255, 255, 255, 0.9);
      border-left: 2px solid #fff;
      padding-left: 1.2rem;
      margin: 1rem 0 1.5rem;
    }
    .influences {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.4);
      letter-spacing: 0.1em;
    }
  `]
})
export class PortfolioComponent {
  private audio = inject(AudioService);
  private charConfig = inject(CharacterConfigService);

  readonly isPlayingSound = signal<boolean>(false);

  playRandomSound(): void {
    if (this.isPlayingSound()) return;
    this.isPlayingSound.set(true);
    this.audio.playParry();

    setTimeout(() => {
      this.isPlayingSound.set(false);
    }, 600);
  }
}
