import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CodeSnippet {
  id: string;
  tabLabel: string;
  title: string;
  explanation: string;
  language: string;
  code: string;
}

interface ProjectData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  snippets: CodeSnippet[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portfolio-root">
      <!-- Minimalist Navigation Bar -->
      <header class="navbar">
        <div class="nav-container">
          <a href="#" class="brand">
            <span class="brand-name">Utkarsh</span>
            <span class="brand-pill">Systems &amp; Web</span>
          </a>

          <nav class="nav-links">
            <a href="#projects" class="nav-link">Work</a>
            <a href="#architecture" class="nav-link">Architecture</a>
            <a href="#skills" class="nav-link">Stack</a>
            <a href="#journey" class="nav-link">Journey</a>
            <a href="mailto:contact@utkarsh.dev" class="contact-btn liquid-glass">
              <span>Get In Touch ↗</span>
            </a>
          </nav>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <!-- Status Pill -->
          <div class="status-pill liquid-glass">
            <span class="status-dot"></span>
            <span>Available for Systems &amp; Software Engineering · New Delhi, India</span>
          </div>

          <!-- Main Typography Headline -->
          <h1 class="hero-heading">
            I turn <span class="highlight-blue">system complexity</span> into <span class="highlight-sand">intelligent, low-latency</span> solutions.
          </h1>

          <p class="hero-description">
            Software engineer specializing in low-level C++ architectures, WebAssembly runtimes, and high-throughput web applications. Combining deterministic engineering with 120ms national-athlete reaction composure.
          </p>

          <!-- Call to Action Buttons -->
          <div class="hero-actions">
            <a href="#projects" class="primary-btn">
              <span>Explore Selected Work ↓</span>
            </a>
            <a href="https://github.com" target="_blank" class="secondary-btn liquid-glass">
              <span>GitHub Profile ↗</span>
            </a>
            <a href="https://linkedin.com" target="_blank" class="secondary-btn liquid-glass">
              <span>LinkedIn ↗</span>
            </a>
          </div>

          <!-- Quick Metrics Ribbon -->
          <div class="metrics-ribbon">
            <div class="metric-card liquid-glass">
              <span class="metric-num">0 ms</span>
              <span class="metric-label">Garbage Collection Pauses (WASM)</span>
            </div>
            <div class="metric-card liquid-glass">
              <span class="metric-num">70 ms</span>
              <span class="metric-label">Deterministic Frame Precision</span>
            </div>
            <div class="metric-card liquid-glass">
              <span class="metric-num">120 ms</span>
              <span class="metric-label">National Athlete Reflex Speed</span>
            </div>
            <div class="metric-card liquid-glass">
              <span class="metric-num">60 FPS</span>
              <span class="metric-label">Smooth Three.js WebGL Pipelines</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Projects & Deep Dives (Armaan Kachhawa Style) -->
      <section class="projects-section" id="projects">
        <div class="section-container">
          <div class="section-header">
            <span class="section-kicker">[ 01 · SELECTED PROJECTS ]</span>
            <h2 class="section-title">Engineered with Precision &amp; Scalability</h2>
            <p class="section-desc">
              Explore real architecture decisions, memory models, and code implementations used in production.
            </p>
          </div>

          <!-- Project 1: C++ WebAssembly Combat Engine -->
          <article class="project-showcase liquid-glass">
            <div class="showcase-header">
              <div class="showcase-meta">
                <span class="project-tag">Low-Latency / WASM / C++20</span>
                <h3 class="project-title">{{ projectCombat.title }}</h3>
                <p class="project-desc">{{ projectCombat.description }}</p>
              </div>

              <div class="tech-pills">
                @for (tag of projectCombat.tags; track tag) {
                  <span class="tech-pill">{{ tag }}</span>
                }
              </div>
            </div>

            <!-- Interactive Architecture Tabs -->
            <div class="code-deepdive" id="architecture">
              <div class="tabs-nav">
                @for (snip of projectCombat.snippets; track snip.id) {
                  <button
                    class="tab-btn"
                    [class.active]="activeCombatSnippet().id === snip.id"
                    (click)="activeCombatSnippet.set(snip)"
                  >
                    {{ snip.tabLabel }}
                  </button>
                }
              </div>

              <div class="snippet-body">
                <div class="snippet-info">
                  <h4>{{ activeCombatSnippet().title }}</h4>
                  <p>{{ activeCombatSnippet().explanation }}</p>
                </div>

                <div class="code-editor">
                  <div class="editor-header">
                    <div class="window-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <span class="file-name">{{ activeCombatSnippet().tabLabel }}.cpp</span>
                    <span class="lang-tag">{{ activeCombatSnippet().language }}</span>
                  </div>
                  <pre class="code-block"><code>{{ activeCombatSnippet().code }}</code></pre>
                </div>
              </div>
            </div>
          </article>

          <!-- Project 2: MediaForge Distributed Cloud Platform -->
          <article class="project-showcase liquid-glass mt-12">
            <div class="showcase-header">
              <div class="showcase-meta">
                <span class="project-tag">Distributed Systems / Cloud / Angular</span>
                <h3 class="project-title">{{ projectMediaForge.title }}</h3>
                <p class="project-desc">{{ projectMediaForge.description }}</p>
              </div>

              <div class="tech-pills">
                @for (tag of projectMediaForge.tags; track tag) {
                  <span class="tech-pill">{{ tag }}</span>
                }
              </div>
            </div>

            <!-- Interactive Architecture Tabs -->
            <div class="code-deepdive">
              <div class="tabs-nav">
                @for (snip of projectMediaForge.snippets; track snip.id) {
                  <button
                    class="tab-btn"
                    [class.active]="activeMediaForgeSnippet().id === snip.id"
                    (click)="activeMediaForgeSnippet.set(snip)"
                  >
                    {{ snip.tabLabel }}
                  </button>
                }
              </div>

              <div class="snippet-body">
                <div class="snippet-info">
                  <h4>{{ activeMediaForgeSnippet().title }}</h4>
                  <p>{{ activeMediaForgeSnippet().explanation }}</p>
                </div>

                <div class="code-editor">
                  <div class="editor-header">
                    <div class="window-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <span class="file-name">{{ activeMediaForgeSnippet().tabLabel }}.ts</span>
                    <span class="lang-tag">{{ activeMediaForgeSnippet().language }}</span>
                  </div>
                  <pre class="code-block"><code>{{ activeMediaForgeSnippet().code }}</code></pre>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Technical Skills Matrix -->
      <section class="skills-section" id="skills">
        <div class="section-container">
          <div class="section-header">
            <span class="section-kicker">[ 02 · TECHNICAL STACK ]</span>
            <h2 class="section-title">Core Competencies &amp; Tooling</h2>
          </div>

          <div class="skills-grid">
            <div class="skill-category liquid-glass">
              <h3 class="category-title">⚡ Systems &amp; Low-Level</h3>
              <p class="category-desc">Performance-critical architectures and deterministic execution.</p>
              <div class="skills-list">
                <span class="skill-item">C++20</span>
                <span class="skill-item">WebAssembly (WASM)</span>
                <span class="skill-item">SIMD Vectorization</span>
                <span class="skill-item">Memory Pooling</span>
                <span class="skill-item">Linux / POSIX</span>
              </div>
            </div>

            <div class="skill-category liquid-glass">
              <h3 class="category-title">🌐 Modern Web &amp; 3D</h3>
              <p class="category-desc">Modern responsive web applications and interactive WebGL graphics.</p>
              <div class="skills-list">
                <span class="skill-item">Angular 18 Signals</span>
                <span class="skill-item">Next.js 15 &amp; React</span>
                <span class="skill-item">Three.js / WebGL</span>
                <span class="skill-item">TypeScript</span>
                <span class="skill-item">TailwindCSS</span>
              </div>
            </div>

            <div class="skill-category liquid-glass">
              <h3 class="category-title">🗄️ Backend &amp; Cloud Infrastructure</h3>
              <p class="category-desc">Distributed services, relational databases, and containerization.</p>
              <div class="skills-list">
                <span class="skill-item">Node.js / Express</span>
                <span class="skill-item">PostgreSQL / Drizzle</span>
                <span class="skill-item">Redis Caching</span>
                <span class="skill-item">Docker Containers</span>
                <span class="skill-item">AWS S3 &amp; CloudFront</span>
              </div>
            </div>

            <div class="skill-category liquid-glass">
              <h3 class="category-title">🏓 Composure &amp; High-Speed Execution</h3>
              <p class="category-desc">Competitive psychology applied to high-pressure technical execution.</p>
              <div class="skills-list">
                <span class="skill-item">National Table Tennis Athlete</span>
                <span class="skill-item">120ms Reflex Composure</span>
                <span class="skill-item">Root-Cause Deconstruction</span>
                <span class="skill-item">Disciplined Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Journey / Timeline ("Let's Take It Back") -->
      <section class="journey-section" id="journey">
        <div class="section-container">
          <div class="section-header">
            <span class="section-kicker">[ 03 · MILESTONES ]</span>
            <h2 class="section-title">Let's Take It Back</h2>
            <p class="section-desc">Key milestones in engineering and competitive athletics.</p>
          </div>

          <div class="timeline-wrapper">
            <div class="timeline-track"></div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content liquid-glass">
                <span class="timeline-year">2026 · PRESENT</span>
                <h4>High-Throughput Systems Architect</h4>
                <p>Developing WebAssembly-compiled C++ kernels, deterministic collision shaders, and high-performance micro-frontends.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content liquid-glass">
                <span class="timeline-year">2024 — 2025</span>
                <h4>Distributed Media &amp; Full-Stack Platforms</h4>
                <p>Architected MediaForge enterprise releases, Redis caching layers, PostgreSQL schemas, and low-latency API pipelines.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content liquid-glass">
                <span class="timeline-year">FOUNDATION</span>
                <h4>National Table Tennis &amp; Algorithmic Thinking</h4>
                <p>Competed at the national level. Trained fast reflex processing (120ms), pattern recognition, and poise under high-pressure scenarios.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Minimalist Contact Footer -->
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-top">
            <div class="footer-brand">
              <span class="brand-title">UTKARSH</span>
              <p class="footer-tagline">Building clean, robust, and deterministic digital experiences.</p>
            </div>

            <div class="footer-links">
              <a href="mailto:contact@utkarsh.dev" class="footer-link">Email</a>
              <a href="https://github.com" target="_blank" class="footer-link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" class="footer-link">LinkedIn</a>
              <a href="https://x.com" target="_blank" class="footer-link">Twitter / X</a>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© 2026 Utkarsh. All rights reserved.</span>
            <span>Engineered with Angular 18 &amp; Web Standards.</span>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .portfolio-root {
      min-height: 100vh;
      background-color: #070709;
      color: #f5f5f7;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }

    /* Navbar */
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(7, 7, 9, 0.8);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.2rem 0;
    }
    .nav-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;
    }
    .brand-name {
      font-size: 1.15rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
    }
    .brand-pill {
      font-size: 0.7rem;
      font-family: 'JetBrains Mono', monospace;
      color: #8e8e9f;
      background: rgba(255, 255, 255, 0.06);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .nav-link {
      color: #8e8e9f;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    .nav-link:hover {
      color: #ffffff;
    }
    .contact-btn {
      padding: 0.45rem 1.1rem;
      border-radius: 999px;
      color: #ffffff;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* Hero Section */
    .hero-section {
      padding: 6.5rem 0 5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .hero-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.4rem 1rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: #8e8e9f;
      margin-bottom: 2rem;
    }
    .status-dot {
      width: 6px;
      height: 6px;
      background: #00e676;
      border-radius: 50%;
      box-shadow: 0 0 8px #00e676;
      animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
    .hero-heading {
      font-size: 4.4rem;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      max-width: 1050px;
      margin-bottom: 1.8rem;
      color: #ffffff;
    }
    .highlight-blue {
      color: #3b82f6;
    }
    .highlight-sand {
      color: #e5e5d8;
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-weight: 400;
    }
    .hero-description {
      font-size: 1.2rem;
      color: #8e8e9f;
      max-width: 720px;
      line-height: 1.7;
      margin-bottom: 2.8rem;
    }
    .hero-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      flex-wrap: wrap;
      margin-bottom: 4rem;
    }
    .primary-btn {
      background: #ffffff;
      color: #000000;
      padding: 0.85rem 1.8rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(255, 255, 255, 0.25);
      transition: all 0.25s ease;
    }
    .primary-btn:hover {
      background: #e5e5d8;
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(255, 255, 255, 0.4);
    }
    .secondary-btn {
      padding: 0.85rem 1.6rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #ffffff;
      text-decoration: none;
    }
    .secondary-btn:hover {
      transform: translateY(-2px);
    }

    /* Metrics Ribbon */
    .metrics-ribbon {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
    }
    .metric-card {
      padding: 1.8rem 1.6rem;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .metric-num {
      font-size: 2.2rem;
      font-weight: 800;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: -0.03em;
    }
    .metric-label {
      font-size: 0.8rem;
      color: #8e8e9f;
      line-height: 1.4;
    }

    /* Projects Section */
    .projects-section {
      padding: 6rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .section-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .section-header {
      margin-bottom: 3.5rem;
    }
    .section-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.15em;
      margin-bottom: 0.6rem;
      display: block;
    }
    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #ffffff;
      margin-bottom: 0.8rem;
    }
    .section-desc {
      font-size: 1rem;
      color: #8e8e9f;
      max-width: 620px;
    }

    /* Showcase Card */
    .project-showcase {
      border-radius: 16px;
      padding: 3rem;
      overflow: hidden;
    }
    .mt-12 { margin-top: 3.5rem; }
    .showcase-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .project-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
      display: block;
    }
    .project-title {
      font-size: 2rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.8rem;
      letter-spacing: -0.02em;
    }
    .project-desc {
      font-size: 1rem;
      color: #8e8e9f;
      max-width: 720px;
      line-height: 1.65;
    }
    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tech-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: #f5f5f7;
    }

    /* Code Deep-Dive Tabs (Armaan Kachhawa Style) */
    .code-deepdive {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 2rem;
    }
    .tabs-nav {
      display: flex;
      gap: 0.8rem;
      margin-bottom: 1.8rem;
      flex-wrap: wrap;
    }
    .tab-btn {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #8e8e9f;
      padding: 0.5rem 1.1rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-family: 'JetBrains Mono', monospace;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn.active {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      font-weight: 700;
    }
    .tab-btn:hover:not(.active) {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
    .snippet-body {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2.5rem;
      align-items: flex-start;
    }
    .snippet-info h4 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.8rem;
    }
    .snippet-info p {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.7;
    }

    /* Code Editor Window */
    .code-editor {
      background: #0d0d12;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      overflow: hidden;
    }
    .editor-header {
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.6rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .window-dots {
      display: flex;
      gap: 6px;
    }
    .window-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
    }
    .window-dots span:nth-child(1) { background: #ff5f56; }
    .window-dots span:nth-child(2) { background: #ffbd2e; }
    .window-dots span:nth-child(3) { background: #27c93f; }
    .file-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8e8e9f;
    }
    .lang-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      text-transform: uppercase;
    }
    .code-block {
      padding: 1.4rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      line-height: 1.7;
      color: #d1d5db;
      overflow-x: auto;
      white-space: pre-wrap;
    }

    /* Skills Grid */
    .skills-section {
      padding: 6rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.8rem;
    }
    .skill-category {
      padding: 2.5rem;
      border-radius: 14px;
    }
    .category-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }
    .category-desc {
      font-size: 0.85rem;
      color: #8e8e9f;
      margin-bottom: 1.5rem;
    }
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .skill-item {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.45rem 0.95rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-family: 'JetBrains Mono', monospace;
      color: #ffffff;
      transition: all 0.2s ease;
    }
    .skill-item:hover {
      background: #ffffff;
      color: #000000;
      transform: translateY(-2px);
    }

    /* Journey Timeline */
    .journey-section {
      padding: 6rem 0 8rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .timeline-wrapper {
      position: relative;
      padding-left: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .timeline-track {
      position: absolute;
      left: 7px;
      top: 10px;
      bottom: 10px;
      width: 2px;
      background: linear-gradient(180deg, #3b82f6 0%, rgba(255, 255, 255, 0.1) 100%);
    }
    .timeline-item {
      position: relative;
    }
    .timeline-dot {
      position: absolute;
      left: -2.5rem;
      top: 1.6rem;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #070709;
      border: 3px solid #3b82f6;
    }
    .timeline-content {
      padding: 2rem 2.4rem;
      border-radius: 12px;
    }
    .timeline-year {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      font-weight: 700;
      margin-bottom: 0.4rem;
      display: block;
    }
    .timeline-content h4 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.6rem;
    }
    .timeline-content p {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.65;
    }

    /* Footer */
    .footer {
      padding: 4.5rem 0 3rem;
      background: #050507;
    }
    .footer-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .footer-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      flex-wrap: wrap;
      gap: 2rem;
    }
    .brand-title {
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      color: #ffffff;
      margin-bottom: 0.5rem;
      display: block;
    }
    .footer-tagline {
      font-size: 0.9rem;
      color: #8e8e9f;
      max-width: 400px;
    }
    .footer-links {
      display: flex;
      gap: 2rem;
    }
    .footer-link {
      color: #8e8e9f;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s ease;
    }
    .footer-link:hover {
      color: #ffffff;
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      padding-top: 2rem;
      font-size: 0.8rem;
      color: #5c5c6d;
    }

    @media (max-width: 1024px) {
      .hero-heading { font-size: 3.2rem; }
      .metrics-ribbon { grid-template-columns: repeat(2, 1fr); }
      .snippet-body { grid-template-columns: 1fr; }
      .skills-grid { grid-template-columns: 1fr; }
      .nav-links { display: none; }
    }
  `]
})
export class PortfolioComponent {
  readonly projectCombat: ProjectData = {
    id: 'combat_engine',
    category: 'Systems & Low-Latency',
    title: 'Deterministic C++ & WebAssembly Combat Engine',
    subtitle: 'Zero-Copy Linear Memory Physics at 60 FPS',
    description: 'Engineered a deterministic physics & combat simulation engine compiled from C++20 to WebAssembly. Achieves sub-frame 70ms parry detection windows and streams 32-float vertex buffers directly to Three.js shaders with 0ms garbage collection pauses.',
    tags: ['C++20', 'WebAssembly (WASM)', 'Three.js GLSL', 'Emscripten', 'SIMD'],
    metrics: [
      { label: 'GC Latency', value: '0 ms' },
      { label: 'Framerate', value: '60 FPS' },
      { label: 'Parry Window', value: '70 ms' }
    ],
    snippets: [
      {
        id: 'memory_stream',
        tabLabel: 'Zero-Copy Memory Stream',
        title: 'Zero-Copy 32-Float Linear Memory Streaming',
        explanation: 'Directly reads memory offsets from WebAssembly HEAPF32 into Three.js Float32BufferAttributes without JavaScript array allocation overhead.',
        language: 'cpp',
        code: `// C++20 WASM Memory Buffer Alignment
#include <emscripten/emscripten.h>

struct alignas(16) CombatEntityState {
    float position[3];
    float velocity[3];
    float hitboxRadius;
    uint32_t stanceFlags; // 70ms Parry Detection bitmask
};

static CombatEntityState g_Entities[MAX_COMBATANTS];

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    float* get_entity_buffer_offset() {
        return reinterpret_cast<float*>(g_Entities);
    }
}`
      },
      {
        id: 'parry_calc',
        tabLabel: '70ms Parry Frame Detection',
        title: 'Deterministic Sub-Frame Collision Detection',
        explanation: 'Capsule-to-Capsule distance calculation detecting whether a strike occurs within the 70ms active parry deflection frame window.',
        language: 'cpp',
        code: `// Deterministic AABB / Capsule Clash Calculation
bool DetectParryWindow(const CombatEntityState& attacker, const CombatEntityState& defender) {
    if (!(defender.stanceFlags & PARRY_ACTIVE_BIT)) return false;

    float dx = attacker.position[0] - defender.position[0];
    float dy = attacker.position[1] - defender.position[1];
    float dz = attacker.position[2] - defender.position[2];
    float distSq = dx*dx + dy*dy + dz*dz;

    float collisionRadius = attacker.hitboxRadius + defender.hitboxRadius;
    return distSq <= (collisionRadius * collisionRadius);
}`
      },
      {
        id: 'shader_bridge',
        tabLabel: 'Three.js Shader Bridge',
        title: 'Custom GLSL Terrain & Spark Pipeline',
        explanation: 'Custom GLSL vertex shader translating C++ strike vectors into dynamic ground deformation and rim-lit particle sparks.',
        language: 'glsl',
        code: `// Three.js Custom Ground Fissure Vertex Shader
uniform float uTime;
uniform vec3 uClashOrigin;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 displacedPosition = position;
    float dist = distance(position.xz, uClashOrigin.xz);
    if (dist < 4.0) {
        displacedPosition.y += sin(dist * 3.0 - uTime * 8.0) * 0.45;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}`
      }
    ]
  };

  readonly projectMediaForge: ProjectData = {
    id: 'mediaforge',
    category: 'Cloud & Distributed Architecture',
    title: 'MediaForge — Distributed Media & Content Architecture',
    subtitle: 'Event-Driven Microservices with Redis & PostgreSQL',
    description: 'High-throughput cloud platform featuring idempotency-safe API routes, real-time Redis cache invalidation, Drizzle ORM schema migrations, and optimized AWS S3 media streaming pipelines.',
    tags: ['Angular 18', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'AWS S3'],
    metrics: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Throughput', value: '50k req/min' },
      { label: 'Cache Hit Rate', value: '94.2%' }
    ],
    snippets: [
      {
        id: 'redis_cache',
        tabLabel: 'Redis Cache Layer',
        title: 'High-Throughput In-Memory Caching',
        explanation: 'Idempotent cache wrapper that validates cache freshness and prevents cache-stampede via atomic distributed locks.',
        language: 'typescript',
        code: `// Redis Cache Wrapper with Stampede Prevention
export async function getOrSetCache<T>(key: string, ttlSeconds: number, fetchFn: () => Promise<T>): Promise<T> {
  const cached = await redisClient.get(key);
  if (cached) return JSON.parse(cached) as T;

  const lockAcquired = await redisClient.set(\`lock:\${key}\`, '1', 'EX', 5, 'NX');
  if (!lockAcquired) {
    await new Promise(res => setTimeout(res, 50));
    return getOrSetCache(key, ttlSeconds, fetchFn);
  }

  try {
    const result = await fetchFn();
    await redisClient.set(key, JSON.stringify(result), 'EX', ttlSeconds);
    return result;
  } finally {
    await redisClient.del(\`lock:\${key}\`);
  }
}`
      },
      {
        id: 'idempotent_webhooks',
        tabLabel: 'Idempotent Webhooks',
        title: 'Transactional Database Sync & Idempotency',
        explanation: 'Ensures concurrent payment and auth webhooks are processed exactly once with ACID database transactions.',
        language: 'typescript',
        code: `// Idempotent Webhook Handler with Drizzle Transactions
export async function processIdempotentWebhook(event: WebhookEvent) {
  return await db.transaction(async (tx) => {
    const existing = await tx.query.processedEvents.findFirst({
      where: eq(processedEvents.id, event.id)
    });
    if (existing) return { status: 'ALREADY_PROCESSED' };

    await tx.insert(processedEvents).values({
      id: event.id,
      eventType: event.type,
      processedAt: new Date()
    });

    await handleDomainEvent(tx, event);
    return { status: 'SUCCESS' };
  });
}`
      }
    ]
  };

  readonly activeCombatSnippet = signal<CodeSnippet>(this.projectCombat.snippets[0]);
  readonly activeMediaForgeSnippet = signal<CodeSnippet>(this.projectMediaForge.snippets[0]);
}
