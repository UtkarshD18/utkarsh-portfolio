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
            <span class="page-kicker">[ 01 · BACKGROUND &amp; ENGINEERING STORY ]</span>
            <h1 class="page-title">About Me</h1>
            <p class="page-subtitle">
              Software engineer interested in backend architecture, AI tooling &amp; systems internals.
            </p>
          </div>

          <!-- Narrative Grid -->
          <div class="narrative-grid">
            <div class="narrative-card liquid-glass">
              <span class="card-badge">ENGINEERING PERSPECTIVE</span>
              <h3>Going Deeper Than the Framework</h3>
              <p>
                I'm a Computer Science engineer who enjoys understanding how software works under the hood. I started with full-stack web applications and gradually moved toward the deeper layers — system architecture, database optimization, Linux internals, and developer infrastructure.
              </p>
              <p>
                These days, I focus on building systems around LLMs (StateGraph-based multi-agent routing, PostgreSQL pgvector RAG semantic search, and local inference tooling) where AI provides deterministic, measurable utility rather than generic chat gimmicks.
              </p>
              <div class="resume-cta-row">
                <a href="/assets/Utkarsh_Dwivedi_Resume.pdf" target="_blank" class="primary-btn">
                  <span>Download Official Resume (PDF) 📄</span>
                </a>
                <a href="https://github.com/UtkarshD18" target="_blank" class="secondary-btn liquid-glass">
                  <span>GitHub Profile ↗</span>
                </a>
              </div>
            </div>

            <div class="narrative-card liquid-glass">
              <span class="card-badge">EDUCATION &amp; FOUNDATIONS</span>
              <h3>Academic Background</h3>
              <div class="edu-item">
                <div class="edu-header">
                  <span class="edu-title">JECRC University, Jaipur</span>
                  <span class="edu-date">2022 — 2026</span>
                </div>
                <span class="edu-degree">B.Tech in Computer Science &amp; Engineering · CGPA: 7.3</span>
              </div>

              <div class="edu-item">
                <div class="edu-header">
                  <span class="edu-title">Central Public Sr. Sec. School, Udaipur</span>
                  <span class="edu-date">2022</span>
                </div>
                <span class="edu-degree">Class XII (Science Stream) · 82%</span>
              </div>

              <div class="edu-item">
                <div class="edu-header">
                  <span class="edu-title">Central Public Sr. Sec. School, Udaipur</span>
                  <span class="edu-date">2020</span>
                </div>
                <span class="edu-degree">Class X (CBSE) · 87%</span>
              </div>

              <div class="certs-box">
                <span class="cert-title">VERIFIED CERTIFICATIONS:</span>
                <p>• <b>Leadership and Team Effectiveness</b> — NPTEL, Jan–Apr 2025 (ID: NPTEL25MG38S114740245)</p>
                <p>• <b>IBM Python 101 for Data Science</b> — Jul 2025 (ID: f789e8af3738466393e53ab329fd8373)</p>
              </div>
            </div>
          </div>

          <!-- Honest Technologies Grid -->
          <section class="skills-wrapper">
            <div class="section-top">
              <span class="section-tag">[ 02 · TECHNICAL STACK ]</span>
              <h2 class="section-title">Technologies &amp; Tools I Use</h2>
              <p class="section-desc">
                Concrete tools and environments I have built and benchmarked production codebases with.
              </p>
            </div>

            <div class="skills-grid">
              <div class="skill-box liquid-glass">
                <h4>💻 Programming Languages</h4>
                <div class="skill-tags">
                  <span class="tag">Python</span>
                  <span class="tag">Java</span>
                  <span class="tag">C++</span>
                  <span class="tag">TypeScript</span>
                  <span class="tag">JavaScript (ES6+)</span>
                  <span class="tag">SQL</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🤖 AI &amp; LLM Orchestration</h4>
                <div class="skill-tags">
                  <span class="tag">LangGraph</span>
                  <span class="tag">LangChain</span>
                  <span class="tag">StateGraph Routing</span>
                  <span class="tag">PostgreSQL (pgvector)</span>
                  <span class="tag">Local Ollama Models</span>
                  <span class="tag">Semantic RAG Search</span>
                  <span class="tag">Fallback Bridges</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>⚙️ Backend &amp; Systems</h4>
                <div class="skill-tags">
                  <span class="tag">Node.js</span>
                  <span class="tag">Express.js</span>
                  <span class="tag">Spring Boot</span>
                  <span class="tag">REST APIs</span>
                  <span class="tag">Unix Domain Sockets</span>
                  <span class="tag">Thread Isolation</span>
                  <span class="tag">JWT &amp; RBAC Auth</span>
                  <span class="tag">Socket.io</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🗄️ Databases &amp; Infrastructure</h4>
                <div class="skill-tags">
                  <span class="tag">PostgreSQL</span>
                  <span class="tag">MongoDB</span>
                  <span class="tag">SQLite (FIFO Queue)</span>
                  <span class="tag">Redis</span>
                  <span class="tag">Docker</span>
                  <span class="tag">Git &amp; GitHub</span>
                  <span class="tag">Linux / Fedora</span>
                  <span class="tag">GitHub Actions CI/CD</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Live GitHub Activity -->
          <app-activity-stats></app-activity-stats>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-viewport {
      min-height: 100vh;
      background: transparent;
      color: #f5f5f7;
    }
    .about-stage {
      padding: 5rem 0 10rem;
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
      font-size: clamp(0.65rem, 2.5vw, 0.75rem);
      color: #3b82f6;
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
      white-space: nowrap;
    }
    .page-title {
      font-size: 3.6rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      margin-bottom: 0.8rem;
    }
    .page-subtitle {
      font-size: 1.15rem;
      color: #8e8e9f;
      max-width: 780px;
      line-height: 1.7;
    }

    /* Narrative Grid */
    .narrative-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 2rem;
      margin-bottom: 5rem;
    }
    .narrative-card {
      padding: 2.8rem;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
    }
    .card-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      letter-spacing: 0.12em;
    }
    .narrative-card h3 {
      font-size: 1.55rem;
      font-weight: 800;
      color: #ffffff;
    }
    .narrative-card p {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.75;
    }
    .resume-cta-row {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    .primary-btn {
      background: #ffffff;
      color: #000000;
      padding: 0.75rem 1.4rem;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .primary-btn:hover {
      background: #e5e5d8;
      transform: translateY(-2px);
    }
    .secondary-btn {
      padding: 0.75rem 1.4rem;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
      color: #ffffff;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .secondary-btn:hover {
      transform: translateY(-2px);
    }

    /* Education Items */
    .edu-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .edu-title {
      font-weight: 700;
      color: #f5f5f7;
      font-size: 0.95rem;
    }
    .edu-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
    }
    .edu-degree {
      font-size: 0.85rem;
      color: #8e8e9f;
    }
    .certs-box {
      margin-top: 0.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .cert-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      letter-spacing: 0.1em;
    }
    .certs-box p {
      font-size: 0.82rem;
      color: #8e8e9f;
      line-height: 1.5;
    }

    /* Skills Grid */
    .skills-wrapper {
      margin-bottom: 5rem;
    }
    .section-top {
      margin-bottom: 2.5rem;
    }
    .section-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(0.65rem, 2.5vw, 0.75rem);
      color: #3b82f6;
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
      white-space: nowrap;
    }
    .section-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.6rem;
    }
    .section-desc {
      font-size: 0.95rem;
      color: #8e8e9f;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.8rem;
    }
    .skill-box {
      padding: 2.2rem;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .skill-box h4 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
    }
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tag {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      font-size: 0.78rem;
      font-family: 'JetBrains Mono', monospace;
      color: #f5f5f7;
    }

    @media (max-width: 1024px) {
      .narrative-grid { grid-template-columns: 1fr; }
      .skills-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 768px) {
      .page-title { font-size: 2.4rem; }
      .about-stage { padding: 3.5rem 0 6rem; }
      .content-container { padding: 0 1.2rem; }
      .narrative-card, .skill-box { padding: 1.6rem 1.2rem; }
      .resume-cta-row { flex-direction: column; }
      .primary-btn, .secondary-btn { text-align: center; width: 100%; box-sizing: border-box; }
    }
  `]
})
export class AboutComponent {}
