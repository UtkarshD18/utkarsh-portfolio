import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MoonFooterComponent } from '../../components/moon-footer/moon-footer.component';
import { BirdHuntComponent } from '../../components/bird-hunt/bird-hunt.component';
import { LandscapeHorizonComponent } from '../../components/landscape-horizon/landscape-horizon.component';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, MoonFooterComponent, BirdHuntComponent, LandscapeHorizonComponent],
  template: `
    <div class="portfolio-viewport">
      <!-- Luxury Film Grain Noise Texture -->
      <div class="noise-overlay"></div>

      <!-- Sekiro-Themed Ashina Battlefield & Interactive Planted Katana Props -->
      <app-landscape-horizon></app-landscape-horizon>

      <!-- Duck / Bird Hunting Mini-Game Layer (AKM & Dynamo Voice) -->
      <app-bird-hunt></app-bird-hunt>

      <!-- Award-Winning Editorial Navbar -->
      <header class="editorial-nav">
        <div class="nav-brand">
          <span class="brand-mon">○</span>
          <div class="brand-meta">
            <span class="brand-title">UTKARSH</span>
            <span class="brand-role">[ SYSTEMS ARCHITECT · ATHLETE ]</span>
          </div>
        </div>

        <nav class="nav-items">
          <a href="#engineering" class="nav-item">
            <span class="item-num">[ 01 ]</span>
            <span class="item-label">SYSTEMS FORGE</span>
          </a>
          <a href="#compete" class="nav-item">
            <span class="item-num">[ 02 ]</span>
            <span class="item-label">ATHLETE REFLEX</span>
          </a>
          <a href="#philosophy" class="nav-item">
            <span class="item-num">[ 03 ]</span>
            <span class="item-label">OBSERVATION</span>
          </a>
          <button class="nav-action-btn luxury-btn" (click)="goToDuel()">
            <span>⚔ 3D ARENA</span>
          </button>
        </nav>
      </header>

      <!-- Hero Section (Bespoke Kinetic Editorial Typography) -->
      <main class="hero-stage">
        <div class="editorial-meta-row">
          <div class="meta-tag">
            <span class="pulse-dot"></span>
            <span>AVAILABLE FOR LOW-LATENCY SYSTEMS & CREATIVE ENGINEERING</span>
          </div>
          <div class="meta-coords">
            <span>28°36'N · 77°12'E</span>
          </div>
        </div>

        <h1 class="hero-title">
          <span class="title-line"><span class="reveal-text">TEMPERING LOW-LEVEL</span></span>
          <span class="title-line"><span class="reveal-text italic-serif">C++ ARCHITECTURES</span></span>
          <span class="title-line"><span class="reveal-text">&amp; DETERMINISTIC SYSTEMS</span></span>
        </h1>

        <div class="hero-lead-grid">
          <p class="hero-lead-text">
            Bridging bare-metal performance, WebAssembly compilers, and high-frequency reflex composure. Designed with intentional negative space, zero-garbage collection latency, and martial discipline.
          </p>

          <div class="hero-cta-group">
            <button class="luxury-btn primary-cta" (click)="goToDuel()">
              <span>ENTER 3D COMBAT ARENA ⚔</span>
            </button>
            <a href="#engineering" class="luxury-btn secondary-cta">
              <span>EXPLORE CASE STUDIES ↓</span>
            </a>
          </div>
        </div>
      </main>

      <!-- Editorial Case Studies & Engineering Architecture -->
      <section class="editorial-dossiers" id="engineering">
        <div class="section-editorial-header">
          <div class="section-label">[ 01 · SYSTEM ARCHITECTURE ]</div>
          <h2 class="section-headline">Deterministic Engine &amp; Low-Latency Primitives</h2>
        </div>

        <div class="editorial-grid">
          <!-- Dossier 1: C++ WASM Combat Engine -->
          <article class="dossier-card card-span-2">
            <div class="card-meta">
              <span class="dossier-num">01.01</span>
              <span class="dossier-category">WASM / SIMD / C++20</span>
            </div>
            <h3 class="dossier-title">Zero-Copy WebAssembly Combat Simulation</h3>
            <p class="dossier-desc">
              Deterministic AABB &amp; Capsule hitbox detection, sub-frame 70ms parry calculation, and streaming linear 32-float memory buffers directly into WebGL vertex pipelines at 60 FPS without garbage-collection overhead.
            </p>
            <div class="card-pills">
              <span class="pill">C++ 20</span>
              <span class="pill">Emscripten WASM</span>
              <span class="pill">SIMD Pointers</span>
              <span class="pill">Three.js GLSL</span>
            </div>
            <div class="hover-indicator-line"></div>
          </article>

          <!-- Dossier 2: Audio Synthesis & Soundboard -->
          <article class="dossier-card">
            <div class="card-meta">
              <span class="dossier-num">01.02</span>
              <span class="dossier-category">WEB AUDIO SYNTH</span>
            </div>
            <h3 class="dossier-title">Real-Time Acoustic Physics Lab</h3>
            <p class="dossier-desc">
              Procedural metallic parry harmonics, 7.62mm AKM bullet shockwave physics, and spatial combat reverb synthesized on-the-fly.
            </p>
            <div class="sound-action-box">
              <button class="luxury-btn sound-strike-btn" (click)="playClashSound()">
                <span>{{ isPlayingSound() ? 'REVERBERATING...' : 'CLASH STEEL ⚔' }}</span>
              </button>
            </div>
            <div class="hover-indicator-line"></div>
          </article>

          <!-- Dossier 3: National Athlete Reflex Composure -->
          <article class="dossier-card" id="compete">
            <div class="card-meta">
              <span class="dossier-num">02.01</span>
              <span class="dossier-category">NEURAL SPEED</span>
            </div>
            <h3 class="dossier-title">120ms National Athlete Reflex</h3>
            <p class="dossier-desc">
              National-level table tennis taught me high-speed composure: decomposing rapid chaotic inputs into instant deterministic reactions.
            </p>
            <div class="metric-display">
              <div class="metric-row">
                <span>Reaction Latency</span>
                <span class="metric-val">120 ms</span>
              </div>
              <div class="metric-row">
                <span>Combat Composure</span>
                <span class="metric-val">99.9%</span>
              </div>
            </div>
            <div class="hover-indicator-line"></div>
          </article>

          <!-- Dossier 4: Observer Philosophy -->
          <article class="dossier-card card-span-2" id="philosophy">
            <div class="card-meta">
              <span class="dossier-num">03.01</span>
              <span class="dossier-category">PHILOSOPHY</span>
            </div>
            <h3 class="dossier-title">The Space Between Reaction &amp; Awareness</h3>
            <blockquote class="editorial-quote">
              "The warrior is not one who never feels fear, but one who observes the incoming blade without trembling. Observe the void before initiating the strike."
            </blockquote>
            <div class="philosophy-tags">
              <span>BUSHIDO CODE</span> · <span>ZEN STILLNESS</span> · <span>JAIN ANEKANTAVADA</span> · <span>STOIC REASON</span>
            </div>
            <div class="hover-indicator-line"></div>
          </article>
        </div>
      </section>

      <!-- Blood Moon Torii Gateway Footer -->
      <app-moon-footer></app-moon-footer>
    </div>
  `,
  styles: [`
    .portfolio-viewport {
      min-height: 100vh;
      background: #08080a;
      color: #ffffff;
      position: relative;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }

    /* Editorial Navbar */
    .editorial-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.2rem 4.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
      z-index: 20;
      backdrop-filter: blur(16px);
      background: rgba(8, 8, 10, 0.6);
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .brand-mon {
      font-size: 1.3rem;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.35);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .brand-meta {
      display: flex;
      flex-direction: column;
    }
    .brand-title {
      font-family: 'Cinzel', serif;
      font-weight: 900;
      letter-spacing: 0.25em;
      font-size: 1.15rem;
      color: #ffffff;
    }
    .brand-role {
      font-family: monospace;
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 0.15em;
    }
    .nav-items {
      display: flex;
      gap: 2.5rem;
      align-items: center;
    }
    .nav-item {
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
      font-size: 0.8rem;
      letter-spacing: 0.15em;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.3s ease;
    }
    .nav-item .item-num {
      font-family: monospace;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.4);
    }
    .nav-item:hover {
      color: #ffffff;
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    }
    .nav-action-btn {
      padding: 0.55rem 1.3rem;
      font-size: 0.75rem;
    }

    /* Hero Stage */
    .hero-stage {
      padding: 6.5rem 4.5rem 4.5rem;
      max-width: 1320px;
      position: relative;
      z-index: 5;
    }
    .editorial-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      font-family: monospace;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 0.15em;
    }
    .meta-tag {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .pulse-dot {
      width: 6px;
      height: 6px;
      background: #00e676;
      border-radius: 50%;
      box-shadow: 0 0 8px #00e676;
      animation: pulseGlow 1.8s infinite;
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.85); }
    }
    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: 5.2rem;
      font-weight: 900;
      line-height: 1.06;
      letter-spacing: -0.02em;
      margin-bottom: 2.8rem;
      color: #ffffff;
    }
    .title-line {
      display: block;
      overflow: hidden;
    }
    .italic-serif {
      font-style: italic;
      color: #e0e0e0;
    }
    .hero-lead-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 3.5rem;
      align-items: center;
    }
    .hero-lead-text {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.75;
      max-width: 680px;
    }
    .hero-cta-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
    .primary-cta {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      box-shadow: 0 4px 25px rgba(255, 255, 255, 0.35);
    }
    .secondary-cta {
      border-color: rgba(255, 255, 255, 0.25);
    }

    /* Editorial Dossiers */
    .editorial-dossiers {
      padding: 5rem 4.5rem 7rem;
      max-width: 1440px;
      position: relative;
      z-index: 5;
    }
    .section-editorial-header {
      margin-bottom: 3.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 1.5rem;
    }
    .section-label {
      font-family: monospace;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.45);
      margin-bottom: 0.6rem;
    }
    .section-headline {
      font-family: 'Cinzel', serif;
      font-size: 2.4rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.01em;
    }
    .editorial-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    .dossier-card {
      background: rgba(14, 14, 18, 0.85);
      backdrop-filter: blur(25px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 3rem 2.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .dossier-card:hover {
      transform: translateY(-8px) scale(1.01);
      border-color: #ffffff;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 255, 255, 0.2);
    }
    .card-span-2 {
      grid-column: span 2;
    }
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.4rem;
      font-family: monospace;
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.5);
    }
    .dossier-title {
      font-family: 'Cinzel', serif;
      font-size: 1.85rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 1.2rem;
      letter-spacing: 0.02em;
    }
    .dossier-desc {
      color: rgba(255, 255, 255, 0.75);
      font-size: 0.95rem;
      line-height: 1.75;
      margin-bottom: 2rem;
    }
    .card-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .pill {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.18);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      color: #ffffff;
      transition: all 0.25s ease;
    }
    .pill:hover {
      background: #ffffff;
      color: #000000;
      transform: translateY(-2px);
    }
    .hover-indicator-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0%;
      height: 2px;
      background: #ffffff;
      box-shadow: 0 0 12px #ffffff;
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .dossier-card:hover .hover-indicator-line {
      width: 100%;
    }
    .sound-action-box {
      margin-top: 1rem;
    }
    .metric-display {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.2rem;
    }
    .metric-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.8);
    }
    .metric-val {
      font-family: 'Cinzel', serif;
      font-weight: 900;
      color: #ffffff;
    }
    .editorial-quote {
      font-family: 'Shippori Mincho', serif;
      font-size: 1.35rem;
      font-style: italic;
      color: #ffffff;
      border-left: 2px solid #ffffff;
      padding-left: 1.8rem;
      margin: 1.2rem 0 2rem;
      line-height: 1.75;
    }
    .philosophy-tags {
      font-family: monospace;
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 1024px) {
      .editorial-grid { grid-template-columns: 1fr; }
      .card-span-2 { grid-column: span 1; }
      .hero-title { font-size: 3.4rem; }
      .hero-lead-grid { grid-template-columns: 1fr; gap: 2rem; }
      .editorial-nav { padding: 1.5rem 2rem; }
      .hero-stage { padding: 3.5rem 2rem; }
      .editorial-dossiers { padding: 3rem 2rem; }
    }
  `]
})
export class PortfolioComponent {
  private audio = inject(AudioService);
  private router = inject(Router);

  readonly isPlayingSound = signal<boolean>(false);

  goToDuel(): void {
    this.router.navigate(['/duel']);
  }

  playClashSound(): void {
    if (this.isPlayingSound()) return;
    this.isPlayingSound.set(true);
    this.audio.playParry();

    setTimeout(() => {
      this.isPlayingSound.set(false);
    }, 600);
  }
}
