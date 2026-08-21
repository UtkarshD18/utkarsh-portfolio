import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivityStatsComponent } from '../../components/activity-stats/activity-stats.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent, FooterComponent, ActivityStatsComponent],
  template: `
    <div class="page-viewport">
      <app-navigation></app-navigation>

      <main class="about-stage">
        <div class="content-container">
          <!-- Header -->
          <div class="page-header">
            <span class="page-kicker">[ 01 · ABOUT &amp; PHILOSOPHY ]</span>
            <h1 class="page-title">Engineering Systems with Purpose &amp; Rigor</h1>
            <p class="page-subtitle">
              A systems-first software engineer dedicated to deterministic execution, clean API surfaces, and high-throughput architectures.
            </p>
          </div>

          <!-- Narrative Section -->
          <div class="narrative-grid">
            <div class="narrative-card liquid-glass">
              <span class="card-badge">THE PHILOSOPHY</span>
              <h3>Simplicity Over Artificial Complexity</h3>
              <p>
                Modern software frequently collapses under unnecessary abstractions. My approach is rooted in understanding the underlying machine: memory layout, cache friendliness, deterministic event loops, and predictable asynchronous states.
              </p>
              <p>
                Whether compiling C++20 algorithms down to WebAssembly bytecode or designing distributed microservices with PostgreSQL and Redis, the goal is always the same: zero-friction execution and robust fault-tolerance.
              </p>
            </div>

            <div class="narrative-card liquid-glass">
              <span class="card-badge">CORE VALUES</span>
              <h3>What I Strive For</h3>
              <ul class="values-list">
                <li>
                  <span class="val-title">Deterministic Outcomes:</span>
                  <span class="val-desc">Eliminating hidden side-effects and race conditions in concurrent pipelines.</span>
                </li>
                <li>
                  <span class="val-title">Zero Bloat:</span>
                  <span class="val-desc">Choosing minimal dependencies and native web standards over massive monolithic libraries.</span>
                </li>
                <li>
                  <span class="val-title">Continuous Problem Solving:</span>
                  <span class="val-desc">Daily algorithmic rigor with data structures, dynamic programming, and low-level memory buffers.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Technical Skills Grid -->
          <section class="skills-wrapper">
            <div class="section-top">
              <span class="section-tag">[ 02 · TECHNICAL PROFICIENCY ]</span>
              <h2 class="section-title">Core Stack &amp; Tooling</h2>
            </div>

            <div class="skills-grid">
              <div class="skill-box liquid-glass">
                <h4>⚡ Systems &amp; Low-Level</h4>
                <div class="skill-tags">
                  <span class="tag">C++20</span>
                  <span class="tag">WebAssembly (WASM)</span>
                  <span class="tag">SIMD Vector Math</span>
                  <span class="tag">Fixed-Point Math</span>
                  <span class="tag">Memory Management</span>
                  <span class="tag">Linux / POSIX</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🌐 Frontend &amp; Creative Web</h4>
                <div class="skill-tags">
                  <span class="tag">Angular 18 (Signals)</span>
                  <span class="tag">Next.js 15 &amp; React</span>
                  <span class="tag">Three.js / WebGL</span>
                  <span class="tag">TypeScript</span>
                  <span class="tag">TailwindCSS</span>
                  <span class="tag">HTML5 / CSS Grid</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🗄️ Backend &amp; Cloud Infrastructure</h4>
                <div class="skill-tags">
                  <span class="tag">Node.js &amp; Express</span>
                  <span class="tag">PostgreSQL &amp; Drizzle ORM</span>
                  <span class="tag">Redis In-Memory Cache</span>
                  <span class="tag">Docker Containers</span>
                  <span class="tag">AWS S3 &amp; CloudFront</span>
                  <span class="tag">REST &amp; WebSockets</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🛠️ Engineering Practices</h4>
                <div class="skill-tags">
                  <span class="tag">System Design</span>
                  <span class="tag">Idempotent APIs</span>
                  <span class="tag">Git Version Control</span>
                  <span class="tag">CI / CD Pipelines</span>
                  <span class="tag">Unit &amp; E2E Testing</span>
                  <span class="tag">Profiling &amp; Benchmarking</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Activity Stats (GitHub + LeetCode) -->
          <app-activity-stats></app-activity-stats>

          <!-- Milestones Timeline -->
          <section class="timeline-section">
            <div class="section-top">
              <span class="section-tag">[ 03 · JOURNEY &amp; MILESTONES ]</span>
              <h2 class="section-title">Milestones &amp; Evolution</h2>
            </div>

            <div class="timeline-list">
              <div class="timeline-row">
                <div class="timeline-badge">2026</div>
                <div class="timeline-card liquid-glass">
                  <h4>High-Throughput Systems Architect</h4>
                  <p>Architecting WebAssembly-compiled C++ physics engines, sub-frame collision math, and reactive Angular 18 enterprise frontends.</p>
                </div>
              </div>

              <div class="timeline-row">
                <div class="timeline-badge">2024 — 2025</div>
                <div class="timeline-card liquid-glass">
                  <h4>Distributed Cloud Platforms &amp; MediaForge</h4>
                  <p>Designed scalable microservices, Redis caching layers, PostgreSQL schemas, and low-latency API pipelines for content production workflows.</p>
                </div>
              </div>

              <div class="timeline-row">
                <div class="timeline-badge">FOUNDATION</div>
                <div class="timeline-card liquid-glass">
                  <h4>Algorithmic Problem Solving &amp; Computer Science</h4>
                  <p>Built deep fundamentals in data structures, time complexity analysis, operating systems, and memory hierarchy.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-viewport {
      min-height: 100vh;
      background: #070709;
      color: #f5f5f7;
    }
    .about-stage {
      padding: 5rem 0 8rem;
    }
    .content-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .page-header {
      margin-bottom: 4rem;
    }
    .page-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.15em;
      margin-bottom: 0.6rem;
      display: block;
    }
    .page-title {
      font-size: 3.5rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      margin-bottom: 1rem;
    }
    .page-subtitle {
      font-size: 1.15rem;
      color: #8e8e9f;
      max-width: 760px;
      line-height: 1.7;
    }

    /* Narrative Grid */
    .narrative-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-bottom: 5rem;
    }
    .narrative-card {
      border-radius: 16px;
      padding: 2.8rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .card-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      letter-spacing: 0.12em;
    }
    .narrative-card h3 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #ffffff;
    }
    .narrative-card p {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.75;
    }
    .values-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .values-list li {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .val-title {
      font-weight: 700;
      color: #ffffff;
      font-size: 0.95rem;
    }
    .val-desc {
      font-size: 0.85rem;
      color: #8e8e9f;
      line-height: 1.6;
    }

    /* Skills */
    .skills-wrapper {
      margin-bottom: 5rem;
    }
    .section-top {
      margin-bottom: 2.5rem;
    }
    .section-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.15em;
      margin-bottom: 0.6rem;
      display: block;
    }
    .section-title {
      font-size: 2.3rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.8rem;
    }
    .skill-box {
      border-radius: 14px;
      padding: 2.2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .skill-box h4 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #ffffff;
    }
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .tag {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.4rem 0.85rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-family: 'JetBrains Mono', monospace;
      color: #ffffff;
      transition: all 0.2s ease;
    }
    .tag:hover {
      background: #ffffff;
      color: #000000;
      transform: translateY(-2px);
    }

    /* Timeline */
    .timeline-section {
      margin-top: 5rem;
    }
    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
    }
    .timeline-row {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 2rem;
      align-items: flex-start;
    }
    .timeline-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 700;
      color: #3b82f6;
      padding-top: 1.5rem;
    }
    .timeline-card {
      border-radius: 14px;
      padding: 2rem 2.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .timeline-card h4 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
    }
    .timeline-card p {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.65;
    }

    @media (max-width: 900px) {
      .page-title { font-size: 2.8rem; }
      .narrative-grid { grid-template-columns: 1fr; }
      .skills-grid { grid-template-columns: 1fr; }
      .timeline-row { grid-template-columns: 1fr; gap: 0.8rem; }
      .timeline-badge { padding-top: 0; }
    }
  `]
})
export class AboutComponent {}
