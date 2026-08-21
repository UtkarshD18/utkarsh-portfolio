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
            <span class="page-kicker">[ 01 · PROFILE &amp; EXPERIENCE ]</span>
            <h1 class="page-title">Utkarsh Dwivedi</h1>
            <p class="page-subtitle">
              AI / ML Developer &amp; Backend Systems Engineer · B.Tech CSE (2022–2026)
            </p>
          </div>

          <!-- Professional Summary Card -->
          <div class="narrative-grid">
            <div class="narrative-card liquid-glass">
              <span class="card-badge">PROFESSIONAL SUMMARY</span>
              <h3>Multi-Agent AI Systems &amp; Backend Engineering</h3>
              <p>
                B.Tech CSE student (2026) with hands-on experience designing multi-agent AI systems using LangGraph and LangChain, including a StateGraph-based routing pipeline that cut LLM API costs by 30%, alongside a Retrieval-Augmented Generation (RAG) pipeline on PostgreSQL (pgvector) for semantic document search and retrieval.
              </p>
              <p>
                Strong Python and backend engineering foundation across full-stack (MERN, Next.js) and systems-level projects, with a solid grasp of DSA, OOPs, DBMS, and REST API design. Self-driven and fast at picking up new tools and frameworks.
              </p>
            </div>

            <div class="narrative-card liquid-glass">
              <span class="card-badge">EDUCATION &amp; CERTIFICATIONS</span>
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
                <span class="edu-degree">Class XII (Science) · 82%</span>
              </div>

              <div class="edu-item">
                <div class="edu-header">
                  <span class="edu-title">Central Public Sr. Sec. School, Udaipur</span>
                  <span class="edu-date">2020</span>
                </div>
                <span class="edu-degree">Class X · 87%</span>
              </div>

              <div class="certs-box">
                <span class="cert-title">CERTIFICATES:</span>
                <p>• <b>Leadership and Team Effectiveness</b> — NPTEL, Jan–Apr 2025 (ID: NPTEL25MG38S114740245)</p>
                <p>• <b>IBM Python 101 for Data Science</b> — Jul 2025 (ID: f789e8af3738466393e53ab329fd8373)</p>
              </div>
            </div>
          </div>

          <!-- Technical Skills Grid (From Resume) -->
          <section class="skills-wrapper">
            <div class="section-top">
              <span class="section-tag">[ 02 · TECHNICAL SKILLS ]</span>
              <h2 class="section-title">Technical Expertise &amp; Core Tooling</h2>
            </div>

            <div class="skills-grid">
              <div class="skill-box liquid-glass">
                <h4>🤖 AI / LLM Engineering</h4>
                <div class="skill-tags">
                  <span class="tag">LangGraph</span>
                  <span class="tag">LangChain</span>
                  <span class="tag">StateGraph</span>
                  <span class="tag">RAG Pipelines</span>
                  <span class="tag">PostgreSQL (pgvector)</span>
                  <span class="tag">Semantic Search</span>
                  <span class="tag">LLM Query Routing</span>
                  <span class="tag">Agentic Workflows</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>💻 Programming Languages</h4>
                <div class="skill-tags">
                  <span class="tag">Python</span>
                  <span class="tag">C</span>
                  <span class="tag">C++</span>
                  <span class="tag">Java</span>
                  <span class="tag">JavaScript</span>
                  <span class="tag">TypeScript</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🧠 CS Fundamentals</h4>
                <div class="skill-tags">
                  <span class="tag">Data Structures &amp; Algorithms</span>
                  <span class="tag">OOPs</span>
                  <span class="tag">DBMS</span>
                  <span class="tag">Operating Systems</span>
                  <span class="tag">Computer Networks</span>
                  <span class="tag">Multithreading &amp; Concurrency</span>
                </div>
              </div>

              <div class="skill-box liquid-glass">
                <h4>🛠️ Tools &amp; Frameworks</h4>
                <div class="skill-tags">
                  <span class="tag">Node.js / Express</span>
                  <span class="tag">MongoDB / PostgreSQL / SQLite</span>
                  <span class="tag">React / Next.js</span>
                  <span class="tag">Firebase &amp; GCP</span>
                  <span class="tag">Git / GitHub</span>
                  <span class="tag">Postman &amp; REST APIs</span>
                  <span class="tag">FFmpeg &amp; PySide6 (Qt6)</span>
                  <span class="tag">uv</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Activity Stats (GitHub + LeetCode) -->
          <app-activity-stats></app-activity-stats>

          <!-- Work Experience Timeline -->
          <section class="timeline-section">
            <div class="section-top">
              <span class="section-tag">[ 03 · WORK EXPERIENCE ]</span>
              <h2 class="section-title">Professional Experience &amp; Engineering Roles</h2>
            </div>

            <div class="timeline-list">
              <!-- Healthyonegram -->
              <div class="timeline-row">
                <div class="timeline-badge">JAN 2026 — 29 JUN 2026</div>
                <div class="timeline-card liquid-glass">
                  <h4>Healthyonegram — IT Intern</h4>
                  <p>Working on full-stack web modules, backend endpoints, and database performance optimizations.</p>
                </div>
              </div>

              <!-- B1GCRM -->
              <div class="timeline-row">
                <div class="timeline-badge">SELF-DRIVEN ENTERPRISE</div>
                <div class="timeline-card liquid-glass">
                  <h4>B1GCRM (Self-Driven Enterprise Architecture Project)</h4>
                  <p class="role-stack">React, Node.js, PostgreSQL, LangGraph, LangChain</p>
                  <ul class="role-bullets">
                    <li><b>Agentic Orchestration:</b> StateGraph-based multi-agent routing system with LangGraph and LangChain, cutting prompt tokens by 45% and LLM API costs by 30%.</li>
                    <li><b>Query Triage:</b> Triage router directing queries to specialist agents with 98% routing accuracy, eliminating order hallucinations.</li>
                    <li><b>Resiliency:</b> Self-healing multi-agent architecture with try/catch fallback boundaries and 5ms fallback bridge ensuring 100% message delivery.</li>
                    <li><b>RAG Knowledge Base:</b> PostgreSQL pgvector semantic document search and retrieval.</li>
                    <li><b>Omni-Channel Scale:</b> Multi-tenant platform with 208K+ LoC, WhatsApp/Instagram real-time integration, and React Flow visual automation.</li>
                  </ul>
                </div>
              </div>

              <!-- BogEcom -->
              <div class="timeline-row">
                <div class="timeline-badge">PRODUCTION PLATFORM</div>
                <div class="timeline-card liquid-glass">
                  <h4>BogEcom — Production E-Commerce Platform</h4>
                  <p class="role-stack">MERN, Next.js, Firebase, GCP</p>
                  <ul class="role-bullets">
                    <li>Developed and deployed production e-commerce platform with 5,000+ MAU and 2 integrated payment gateways with JWT auth and RBAC, improving API/DB performance by 40%.</li>
                    <li>Automated CI/CD with GitHub Actions, cutting deployment time by 80% and resolving 100+ production/testing issues.</li>
                  </ul>
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
    .certs-box {
      margin-top: 0.8rem;
      padding-top: 0.8rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 0.85rem;
      color: #8e8e9f;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .cert-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      letter-spacing: 0.12em;
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
      grid-template-columns: 200px 1fr;
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
    .role-stack {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      margin-bottom: 0.4rem;
    }
    .role-bullets {
      list-style-type: square;
      padding-left: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      font-size: 0.88rem;
      color: #8e8e9f;
      line-height: 1.6;
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
