import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivityStatsComponent } from '../../components/activity-stats/activity-stats.component';
import { StackingShowcaseComponent } from '../../components/stacking-showcase/stacking-showcase.component';
import { HowIBuildComponent } from '../../components/how-i-build/how-i-build.component';

interface ProjectPreview {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  repoUrl: string;
  routeLink: string;
  status: string;
}

interface BuildLogItem {
  date: string;
  project: string;
  badge: string;
  summary: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigationComponent,
    FooterComponent,
    ActivityStatsComponent,
    StackingShowcaseComponent,
    HowIBuildComponent
  ],
  template: `
    <div class="page-viewport">
      <app-navigation></app-navigation>

      <!-- 1. Editorial Hero Section (Substantive Authority) -->
      <main class="hero-stage">
        <div class="hero-container">
          <div class="status-pill liquid-glass">
            <span class="status-dot"></span>
            <span>SOFTWARE ENGINEER · B.TECH CSE (2026)</span>
          </div>

          <h1 class="hero-heading">
            Utkarsh Dwivedi
          </h1>

          <p class="hero-tagline">
            Building backend systems, distributed architectures &amp; AI tooling.
          </p>

          <p class="hero-subtext">
            I like understanding how systems work under the hood — from database isolation and Linux internals to LLM orchestration, local model inference, and low-latency developer tooling.
          </p>

          <!-- Hero Action CTAs (Magnetic Hover Interaction) -->
          <div class="hero-cta-row">
            <a routerLink="/work" class="primary-btn magnetic-btn">
              <span>View Selected Work →</span>
            </a>
            <a href="https://github.com/UtkarshD18" target="_blank" class="secondary-btn magnetic-btn liquid-glass">
              <span>GitHub (11 Repos) ↗</span>
            </a>
            <a href="/assets/Utkarsh_Dwivedi_Resume.pdf" target="_blank" class="secondary-btn resume-btn magnetic-btn liquid-glass">
              <span>Resume (PDF) 📄</span>
            </a>
            <a routerLink="/contact" class="secondary-btn magnetic-btn liquid-glass">
              <span>Get In Touch ✉</span>
            </a>
          </div>

          <!-- Verified Engineering Benchmarks (Substantive Metrics) -->
          <div class="metrics-ribbon">
            <div 
              class="metric-box spotlight-card"
              #mBox1
              (mousemove)="onMouseMove($event, mBox1)"
              (mouseleave)="onMouseLeave(mBox1)"
            >
              <span class="metric-val">-45%</span>
              <span class="metric-label">Prompt Token Overhead (LangGraph)</span>
            </div>

            <div 
              class="metric-box spotlight-card"
              #mBox2
              (mousemove)="onMouseMove($event, mBox2)"
              (mouseleave)="onMouseLeave(mBox2)"
            >
              <span class="metric-val">98%</span>
              <span class="metric-label">Multi-Agent Query Triage Accuracy</span>
            </div>

            <div 
              class="metric-box spotlight-card"
              #mBox3
              (mousemove)="onMouseMove($event, mBox3)"
              (mouseleave)="onMouseLeave(mBox3)"
            >
              <span class="metric-val">&lt; 73 MB</span>
              <span class="metric-label">Peak Daemon RAM (MediaForge)</span>
            </div>

            <div 
              class="metric-box spotlight-card"
              #mBox4
              (mousemove)="onMouseMove($event, mBox4)"
              (mouseleave)="onMouseLeave(mBox4)"
            >
              <span class="metric-val">100+</span>
              <span class="metric-label">DSA Solved (LeetCode &amp; Code360)</span>
            </div>
          </div>
        </div>
      </main>

      <!-- 2. Sticky 4-Step Methodology (portfolio-scroll-design spec) -->
      <app-how-i-build></app-how-i-build>

      <!-- 3. Currently Building & Exploring (Technical Trajectory) -->
      <section class="trajectory-section">
        <div class="content-container">
          <div class="section-top">
            <span class="section-tag">[ 01 · ACTIVE ENGINEERING TRAJECTORY ]</span>
            <h2 class="section-title">What I’m Building &amp; Exploring</h2>
            <p class="section-desc">
              Focus areas where I actively spend time designing, benchmarking, and shipping code.
            </p>
          </div>

          <div class="trajectory-grid">
            <div 
              class="trajectory-card spotlight-card"
              #tCard1
              (mousemove)="onMouseMove($event, tCard1)"
              (mouseleave)="onMouseLeave(tCard1)"
            >
              <div class="card-icon-header">
                <span class="track-index">01</span>
                <span class="track-tag">AI ENGINEERING &amp; TOOLING</span>
              </div>
              <h3 class="track-title">LLM Orchestration &amp; Inference</h3>
              <p class="track-desc">
                StateGraph-based multi-agent routing (LangGraph/LangChain), semantic RAG with PostgreSQL pgvector cosine search, local model inference with Ollama, and deterministic fallback bridges.
              </p>
              <div class="track-chips">
                <span>LangGraph</span><span>pgvector</span><span>Ollama</span><span>FastAPI</span><span>Context Truncation</span>
              </div>
            </div>

            <div 
              class="trajectory-card spotlight-card"
              #tCard2
              (mousemove)="onMouseMove($event, tCard2)"
              (mouseleave)="onMouseLeave(tCard2)"
            >
              <div class="card-icon-header">
                <span class="track-index">02</span>
                <span class="track-tag">BACKEND &amp; INFRASTRUCTURE</span>
              </div>
              <h3 class="track-title">Systems &amp; Data Boundaries</h3>
              <p class="track-desc">
                Controller-service layer separation, thread-isolated background daemons, SQLite FIFO job queues, Unix domain sockets, and cryptographic JWT RBAC auth.
              </p>
              <div class="track-chips">
                <span>Node.js</span><span>Python</span><span>Spring Boot</span><span>PostgreSQL</span><span>Linux / POSIX</span>
              </div>
            </div>

            <div 
              class="trajectory-card spotlight-card"
              #tCard3
              (mousemove)="onMouseMove($event, tCard3)"
              (mouseleave)="onMouseLeave(tCard3)"
            >
              <div class="card-icon-header">
                <span class="track-index">03</span>
                <span class="track-tag">COMPUTER SCIENCE FOUNDATIONS</span>
              </div>
              <h3 class="track-title">Algorithms &amp; Core Systems</h3>
              <p class="track-desc">
                100+ verified DSA problems solved across LeetCode &amp; Naukri Code360. Deep focus on Tree/Graph algorithms, Dynamic Programming, DBMS ACID properties, and Operating Systems.
              </p>
              <div class="track-chips">
                <span>C++</span><span>Java</span><span>Data Structures</span><span>DBMS</span><span>OS Internals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Featured Codebases Grid -->
      <section class="featured-section">
        <div class="content-container">
          <div class="section-top">
            <span class="section-tag">[ 02 · PRODUCTION CODEBASES &amp; CASE STUDIES ]</span>
            <h2 class="section-title">Selected Engineering Projects</h2>
            <p class="section-desc">
              Real codebases with architectural deep-dives, verifiable repositories, and genuine screenshots.
            </p>
          </div>

          <div class="featured-grid">
            @for (project of featuredProjects; track project.number) {
              <div 
                class="project-card spotlight-card"
                #pCard
                (mousemove)="onMouseMove($event, pCard)"
                (mouseleave)="onMouseLeave(pCard)"
              >
                <div class="card-meta">
                  <span class="category-tag">{{ project.number }} · {{ project.category }}</span>
                  <span class="status-tag">{{ project.status }}</span>
                </div>
                <h3 class="card-title">{{ project.title }}</h3>
                <p class="card-desc">{{ project.description }}</p>
                <div class="card-pills">
                  @for (tag of project.tags; track tag) {
                    <span class="pill">{{ tag }}</span>
                  }
                </div>
                <div class="card-footer">
                  <a [routerLink]="project.routeLink" class="card-link magnetic-btn">
                    <span>Explore Architecture &amp; Code →</span>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 4. Architectural Systems Deck (Physical Card Stacking Physics) -->
      <app-stacking-showcase></app-stacking-showcase>

      <!-- 5. Engineering Build Log (Chronological Changelog) -->
      <section class="buildlog-section">
        <div class="content-container">
          <div class="section-top">
            <span class="section-tag">[ 03 · CHRONOLOGICAL BUILD LOG ]</span>
            <h2 class="section-title">Recent Engineering Changelog</h2>
            <p class="section-desc">
              Concrete milestones, refactorings, and architectural improvements shipped across projects.
            </p>
          </div>

          <div class="buildlog-timeline">
            @for (item of buildLogs; track item.summary) {
              <div 
                class="log-item spotlight-card"
                #lItem
                (mousemove)="onMouseMove($event, lItem)"
                (mouseleave)="onMouseLeave(lItem)"
              >
                <div class="log-date-col">
                  <span class="log-date">{{ item.date }}</span>
                  <span class="log-badge">{{ item.badge }}</span>
                </div>
                <div class="log-content-col">
                  <h4 class="log-proj-title">{{ item.project }}</h4>
                  <p class="log-summary-text">{{ item.summary }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 5. Live Activity & GitHub Stats -->
      <div class="content-container">
        <app-activity-stats></app-activity-stats>
      </div>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-viewport {
      min-height: 100vh;
      background: transparent;
      color: #f5f5f7;
    }
    .hero-stage {
      padding: 6.5rem 0 5rem;
      background: #080a0f;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .trajectory-section {
      padding: 6rem 0;
      background: #0a0d13;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .featured-section {
      padding: 6rem 0;
      background: #0d1118;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .buildlog-section {
      padding: 6rem 0;
      background: #080a0e;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .hero-container, .content-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.45rem 1.1rem;
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
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    .hero-heading {
      font-size: 4.4rem;
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
      color: #ffffff;
    }
    .hero-tagline {
      font-size: 1.8rem;
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      color: #e5e5d8;
      margin-bottom: 1.6rem;
      max-width: 900px;
      line-height: 1.3;
    }
    .hero-subtext {
      font-size: 1.15rem;
      color: #8e8e9f;
      max-width: 780px;
      line-height: 1.7;
      margin-bottom: 2.8rem;
    }
    .hero-cta-row {
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
    }
    .primary-btn:hover {
      background: #e5e5d8;
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
      border-color: rgba(255, 255, 255, 0.3);
    }
    .resume-btn {
      border-color: rgba(59, 130, 246, 0.4);
      color: #93c5fd;
    }
    .metrics-ribbon {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
    }
    .metric-box {
      padding: 1.8rem 1.6rem;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .metric-val {
      font-size: 2rem;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      color: #ffffff;
    }
    .metric-label {
      font-size: 0.8rem;
      color: #8e8e9f;
      line-height: 1.4;
    }

    /* Section Headers */
    .section-top {
      margin-bottom: 3.5rem;
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
      font-size: 2.4rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.8rem;
      letter-spacing: -0.02em;
    }
    .section-desc {
      font-size: 1rem;
      color: #8e8e9f;
      max-width: 680px;
      line-height: 1.6;
    }

    /* Trajectory Section */
    .trajectory-section, .featured-section, .buildlog-section, .philosophy-section {
      padding: 5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .trajectory-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.8rem;
    }
    .trajectory-card {
      padding: 2.2rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .card-icon-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
    }
    .track-index {
      color: #3b82f6;
      font-weight: 700;
    }
    .track-tag {
      color: #8e8e9f;
      font-size: 0.68rem;
      letter-spacing: 0.1em;
    }
    .track-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #ffffff;
    }
    .track-desc {
      font-size: 0.9rem;
      color: #8e8e9f;
      line-height: 1.6;
    }
    .track-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: auto;
    }
    .track-chips span {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.3rem 0.65rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-family: 'JetBrains Mono', monospace;
      color: #8e8e9f;
    }

    /* Featured Projects */
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .project-card {
      padding: 2.4rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .category-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #3b82f6;
      letter-spacing: 0.08em;
    }
    .status-tag {
      font-size: 0.68rem;
      font-family: 'JetBrains Mono', monospace;
      background: rgba(0, 230, 118, 0.1);
      color: #00e676;
      border: 1px solid rgba(0, 230, 118, 0.2);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
    }
    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
    }
    .card-desc {
      font-size: 0.92rem;
      color: #8e8e9f;
      line-height: 1.6;
    }
    .card-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.3rem 0.7rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-family: 'JetBrains Mono', monospace;
      color: #8e8e9f;
    }
    .card-footer {
      margin-top: auto;
      padding-top: 1rem;
    }
    .card-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: #3b82f6;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .card-link:hover {
      color: #60a5fa;
    }

    /* Build Log */
    .buildlog-timeline {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .log-item {
      padding: 1.6rem 2rem;
      border-radius: 14px;
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 2rem;
      align-items: center;
    }
    .log-date-col {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .log-date {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8e8e9f;
    }
    .log-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      background: rgba(59, 130, 246, 0.1);
      color: #93c5fd;
      border: 1px solid rgba(59, 130, 246, 0.2);
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      width: fit-content;
    }
    .log-proj-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.3rem;
    }
    .log-summary-text {
      font-size: 0.88rem;
      color: #8e8e9f;
      line-height: 1.5;
    }

    /* Principles Grid */
    .principles-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .principle-card {
      padding: 2rem 1.6rem;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .principle-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.5rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.15);
    }
    .principle-card h4 {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
    }
    .principle-card p {
      font-size: 0.85rem;
      color: #8e8e9f;
      line-height: 1.6;
    }

    @media (max-width: 1024px) {
      .hero-heading { font-size: 3.4rem; }
      .metrics-ribbon { grid-template-columns: repeat(2, 1fr); }
      .trajectory-grid { grid-template-columns: 1fr; }
      .featured-grid { grid-template-columns: 1fr; }
      .principles-grid { grid-template-columns: repeat(2, 1fr); }
      .log-item { grid-template-columns: 1fr; gap: 0.8rem; }
    }

    @media (max-width: 768px) {
      .hero-stage { padding: 4.5rem 0 3.5rem; }
      .hero-heading { font-size: 2.4rem; }
      .hero-tagline { font-size: 1.35rem; }
      .hero-subtext { font-size: 0.98rem; }
      .hero-cta-row { flex-direction: column; align-items: stretch; gap: 0.8rem; }
      .hero-cta-row a { text-align: center; justify-content: center; }
      .metrics-ribbon { grid-template-columns: 1fr; gap: 0.8rem; }
      .section-title { font-size: 1.8rem; }
      .principles-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PortfolioComponent {
  featuredProjects: ProjectPreview[] = [
    {
      number: '01',
      title: 'B1GCRM Multi-Agent Architecture',
      category: 'MULTI-AGENT AI & CRM',
      description: 'Modernized multi-agent customer platform replacing sequential prompts with a StateGraph architecture, reducing token overhead by 45% with pgvector semantic triage.',
      tags: ['LangGraph', 'PostgreSQL', 'pgvector', 'React', 'Node.js'],
      repoUrl: 'https://github.com/UtkarshD18/B1GCRM',
      routeLink: '/work#b1gcrm',
      status: 'VERIFIED REPO'
    },
    {
      number: '02',
      title: 'MediaForge Video & Asset Daemon',
      category: 'SYSTEMS & BACKGROUND WORKERS',
      description: 'High-throughput media ingestion and short-form video assembly engine running in an isolated background process under 73 MB RAM with SQLite job queues.',
      tags: ['TypeScript', 'Node.js', 'FFmpeg', 'SQLite FIFO', 'POSIX IPC'],
      repoUrl: 'https://github.com/UtkarshD18/MediaForge',
      routeLink: '/work#mediaforge',
      status: 'VERIFIED REPO'
    },
    {
      number: '03',
      title: 'BogEcom Production Commerce Platform',
      category: 'ENTERPRISE NEXT.JS 14 & MERN',
      description: 'Production e-commerce platform with dual Bearer/httpOnly JWT authorization, Role-Based Access Control (RBAC), and automated GitHub Actions CI/CD.',
      tags: ['Next.js 14', 'Node.js', 'PostgreSQL', 'MongoDB', 'JWT RBAC'],
      repoUrl: 'https://github.com/UtkarshD18/bogEcom',
      routeLink: '/work#bogecom',
      status: 'VERIFIED REPO'
    },
    {
      number: '04',
      title: 'Two-Way Sync: Airtable ↔ Trello',
      category: 'PYTHON / REST APIS / AUTOMATION',
      description: 'Automated synchronization engine eliminating 80–90% of manual updates by auto-creating and updating Trello tasks from Airtable leads via REST APIs with idempotent verification.',
      tags: ['Python', 'REST APIs', 'Airtable API', 'Trello API', 'Idempotency'],
      repoUrl: 'https://github.com/UtkarshD18',
      routeLink: '/work#airtable-trello',
      status: 'VERIFIED REPO'
    }
  ];

  buildLogs: BuildLogItem[] = [
    {
      date: 'AUG 2026',
      project: 'MediaForge',
      badge: 'RELEASE v0.1.0',
      summary: 'Shipped isolated background daemon with SQLite FIFO queue and POSIX pipe messaging; capped daemon heap at 73 MB.'
    },
    {
      date: 'JUL 2026',
      project: 'B1GCRM',
      badge: 'ARCHITECTURE REFACTOR',
      summary: 'Re-architected prompt chaining into StateGraph-based LangGraph router with pgvector semantic similarity caching, cutting token overhead by 45%.'
    },
    {
      date: 'JUN 2026',
      project: 'BogEcom',
      badge: 'TRANSACTION ISOLATION',
      summary: 'Implemented ACID-compliant order booking with pessimistic row locks to eliminate race conditions under concurrent load testing.'
    }
  ];

  onMouseMove(e: MouseEvent, target: HTMLElement): void {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }

  onMouseLeave(target: HTMLElement): void {
    target.style.removeProperty('--mouse-x');
    target.style.removeProperty('--mouse-y');
  }
}
