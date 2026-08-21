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
            <span class="page-kicker">[ 01 · BACKGROUND &amp; PHILOSOPHY ]</span>
            <h1 class="page-title">Utkarsh Dwivedi</h1>
            <p class="page-subtitle">
              B.Tech CSE student (2022–2026) passionate about building scalable, high-throughput systems, event-driven web platforms, and low-latency software.
            </p>
          </div>

          <!-- Narrative Section -->
          <div class="narrative-grid">
            <div class="narrative-card liquid-glass">
              <span class="card-badge">PROFESSIONAL SUMMARY</span>
              <h3>Writing Efficient, Scalable Code</h3>
              <p>
                Motivated software engineer with hands-on experience in full-stack web development, enterprise database tuning, and data structures. I enjoy writing reliable, low-overhead code that solves real-world operational challenges.
              </p>
              <p>
                From migrating e-commerce systems to high-performance Java 21 &amp; Spring Boot monoliths to architecting multi-tenant CRMs with pgvector RAG semantic search, my focus is always on engineering robustness and performance.
              </p>
            </div>

            <div class="narrative-card liquid-glass">
              <span class="card-badge">EDUCATION</span>
              <h3>Academic Background</h3>
              <div class="edu-item">
                <div class="edu-header">
                  <span class="edu-title">JECRC University, Jaipur</span>
                  <span class="edu-date">2022 — 2026</span>
                </div>
                <span class="edu-degree">B.Tech in Computer Science and Engineering (CSE) · CGPA: 7.3</span>
              </div>

              <div class="edu-item">
                <div class="edu-header">
                  <span class="edu-title">Central Public Sr. Sec. School, Udaipur</span>
                  <span class="edu-date">2022</span>
                </div>
                <span class="edu-degree">Class XII (Science) · 82%</span>
              </div>
            </div>
          </div>

          <!-- Technical Skills Grid -->
          <section class="skills-wrapper">
            <div class="section-top">
              <span class="section-tag">[ 02 · TECHNICAL SKILLS ]</span>
              <h2 class="section-title">Core Languages &amp; Frameworks</h2>
            </div>

            <div class="skills-grid">
              <div class="skill-box liquid-glass">
                <h4>⚡ Languages &amp; Systems</h4>
                <div class="skill-tags">
                  <span class="tag">Java (21)</span>
                  <span class="tag">C / C++</span>
                  <span class="tag">TypeScript</span>
                  <span class="tag">JavaScript (ES6+)</span>
                  <span class="tag">Python</span>
                  <span class="tag">SQL</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🌐 Frontend &amp; Web</h4>
                <div class="skill-tags">
                  <span class="tag">React.js</span>
                  <span class="tag">Angular 18</span>
                  <span class="tag">React Flow</span>
                  <span class="tag">Zustand</span>
                  <span class="tag">TailwindCSS</span>
                  <span class="tag">HTML5 / CSS3</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🗄️ Backend, Databases &amp; Cloud</h4>
                <div class="skill-tags">
                  <span class="tag">Spring Boot 3.4</span>
                  <span class="tag">Node.js &amp; Express</span>
                  <span class="tag">PostgreSQL (pgvector)</span>
                  <span class="tag">MySQL &amp; HikariCP</span>
                  <span class="tag">Redis In-Memory</span>
                  <span class="tag">Socket.io</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🛠️ Fundamentals &amp; Tools</h4>
                <div class="skill-tags">
                  <span class="tag">Data Structures &amp; Algorithms</span>
                  <span class="tag">OOPs &amp; DBMS</span>
                  <span class="tag">Operating Systems</span>
                  <span class="tag">Computer Networks</span>
                  <span class="tag">Git &amp; GitHub</span>
                  <span class="tag">Testcontainers</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Activity Stats (GitHub + LeetCode) -->
          <app-activity-stats></app-activity-stats>

          <!-- Experience Timeline -->
          <section class="timeline-section">
            <div class="section-top">
              <span class="section-tag">[ 03 · WORK EXPERIENCE &amp; MILESTONES ]</span>
              <h2 class="section-title">Experience &amp; Project Track Record</h2>
            </div>

            <div class="timeline-list">
              <!-- Healthyonegram -->
              <div class="timeline-row">
                <div class="timeline-badge">JAN 2026 — PRESENT</div>
                <div class="timeline-card liquid-glass">
                  <h4>Healthyonegram — IT Intern</h4>
                  <p>Developing scalable web modules, internal tools, and optimizing database workflows for product management operations.</p>
                </div>
              </div>

              <!-- B1GCRM -->
              <div class="timeline-row">
                <div class="timeline-badge">2025 — 2026</div>
                <div class="timeline-card liquid-glass">
                  <h4>B1GCRM (Enterprise Omni-Channel CRM Platform)</h4>
                  <p>Contributed 208K+ LoC across React, Node.js, and PostgreSQL. Built React Flow visual automation builder, Socket.io real-time event engine, and pgvector RAG search.</p>
                </div>
              </div>

              <!-- bogEcom -->
              <div class="timeline-row">
                <div class="timeline-badge">2024 — 2025</div>
                <div class="timeline-card liquid-glass">
                  <h4>bogEcom Enterprise (Java 21 &amp; Spring Boot Monolith)</h4>
                  <p>Migrated e-commerce backend to Java 21/Spring Boot 3.4. Boosted throughput to 1,200 req/sec via HikariCP and implemented JPA optimistic locking for 100% inventory safety.</p>
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

    /* Narrative */
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
    .edu-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding-top: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .edu-title {
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
    }
    .edu-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8e8e9f;
    }
    .edu-degree {
      font-size: 0.85rem;
      color: #8e8e9f;
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
      grid-template-columns: 180px 1fr;
      gap: 2rem;
      align-items: flex-start;
    }
    .timeline-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
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
