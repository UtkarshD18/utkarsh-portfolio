import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { B1gcrmPreviewComponent } from '../../components/b1gcrm-preview/b1gcrm-preview.component';

interface CodeSnippet {
  id: string;
  tabLabel: string;
  title: string;
  explanation: string;
  language: string;
  code: string;
}

interface ProjectCaseStudy {
  id: string;
  number: string;
  tag: string;
  repoUrl: string;
  title: string;
  subtitle: string;
  overview: string;
  tags: string[];
  imageUrl?: string;
  isB1gCrm?: boolean;
  scrollDirection: 'left' | 'right';
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  architectureFlow?: string;
  snippets: CodeSnippet[];
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent, FooterComponent, B1gcrmPreviewComponent],
  template: `
    <div class="page-viewport">
      <app-navigation></app-navigation>

      <main class="work-stage">
        <div class="content-container">
          <!-- Page Header with Kinetic Stagger -->
          <div class="page-header scroll-in-up reveal-target">
            <span class="page-kicker">[ 01 · PRODUCTION CODEBASES &amp; ARCHITECTURE ]</span>
            <h1 class="page-title">Engineering Systems &amp; High-Impact Projects</h1>
            <p class="page-subtitle">
              Project summaries and figures from my resume. Numerical results describe the work reported there; they are not live performance measurements.
            </p>
          </div>

          <!-- Project Showcase Cards (Shopify Editions Stacking Deck Physics) -->
          <div class="stacked-deck-container">
            @for (project of projects; track project.id; let i = $index) {
              <section
                class="case-study-card stacked-card liquid-glass reveal-target"
                [class.scroll-in-left]="project.scrollDirection === 'left'"
                [class.scroll-in-right]="project.scrollDirection === 'right'"
                [style.top.px]="90 + i * 14"
                [id]="project.id"
              >
                <!-- Card Header -->
                <div class="case-header">
                  <div class="case-meta">
                    <div class="meta-badge-row">
                      <span class="case-badge">{{ project.number }} · {{ project.tag }}</span>
                      @if (project.repoUrl) {
                      <a [href]="project.repoUrl" target="_blank" class="github-repo-pill liquid-glass">
                        <svg class="gh-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span>View Repository ↗</span>
                      </a>
                      }
                    </div>
                    <h2 class="case-title">{{ project.title }}</h2>
                    <p class="case-sub">{{ project.subtitle }}</p>
                    <p class="case-overview">{{ project.overview }}</p>
                  </div>

                  <!-- Metrics Display -->
                  <div class="case-metrics">
                    @for (m of project.metrics; track m.label) {
                      <div class="metric-chip liquid-glass">
                        <span class="chip-val">{{ m.value }}</span>
                        <span class="chip-lbl">{{ m.label }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- High-Resolution Project Preview -->
                @if (project.imageUrl) {
                  <div class="zoom-motion-stage image-container">
                    <img [src]="project.imageUrl" [alt]="project.title" class="project-image" />
                    <div class="image-overlay-caption">
                      <span>PROJECT SCREENSHOT</span>
                    </div>
                  </div>
                }

                <!-- System Architecture Pipeline Diagram -->
                @if (project.architectureFlow) {
                  <div class="arch-flow-box">
                    <div class="arch-flow-header">
                      <span>⚡ SYSTEM ARCHITECTURE &amp; DATA FLOW PIPELINE</span>
                      <span class="scroll-hint">⟷ Drag / Scroll</span>
                    </div>
                    <div class="arch-flow-content" data-lenis-prevent tabindex="0">
                      <pre class="arch-pre"><code>{{ project.architectureFlow }}</code></pre>
                    </div>
                  </div>
                }

                <!-- Architectural Bullets -->
                <div class="bullet-points-box liquid-glass">
                  <span class="bullet-title">ENGINEERING HIGHLIGHTS &amp; ARCHITECTURAL CONTRIBUTIONS:</span>
                  <ul class="bullet-list">
                    @for (pt of project.bulletPoints; track pt) {
                      <li>{{ pt }}</li>
                    }
                  </ul>
                </div>

                <!-- Custom Genuine Interactive Preview for B1GCRM Multi-Agent System -->
                @if (project.isB1gCrm) {
                  <app-b1gcrm-preview></app-b1gcrm-preview>
                }

                <!-- Tech Pills -->
                <div class="tech-pills-row">
                  @for (tag of project.tags; track tag) {
                    <span class="tech-pill">{{ tag }}</span>
                  }
                </div>

                <!-- Interactive Architecture Deep Dive Tabs -->
                @if (project.snippets.length) {
                <div class="interactive-deepdive">
                  <div class="deepdive-nav">
                    <span class="nav-label">INSPECT CODE SUBSYSTEMS:</span>
                    <div class="tabs-list">
                      @for (snip of project.snippets; track snip.id) {
                        <button
                          class="tab-btn"
                          [class.active]="getActiveSnippet(project.id).id === snip.id"
                          (click)="setActiveSnippet(project.id, snip)"
                        >
                          {{ snip.tabLabel }}
                        </button>
                      }
                    </div>
                  </div>

                  <div class="deepdive-view">
                    <div class="view-explanation">
                      <h3>{{ getActiveSnippet(project.id).title }}</h3>
                      <p>{{ getActiveSnippet(project.id).explanation }}</p>
                    </div>

                    <div class="code-window">
                      <div class="code-header">
                        <div class="window-dots">
                          <span></span><span></span><span></span>
                        </div>
                        <span class="filename">{{ getActiveSnippet(project.id).tabLabel }}</span>
                        <span class="lang">{{ getActiveSnippet(project.id).language }}</span>
                      </div>
                      <pre class="code-content" data-lenis-prevent tabindex="0"><code>{{ getActiveSnippet(project.id).code }}</code></pre>
                    </div>
                  </div>
                </div>
              }
              </section>
            }
          </div>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-viewport {
      min-height: 100vh;
      background: transparent;
      color: var(--text-primary);
    }
    .work-stage {
      padding: 5rem 0 10rem;
    }
    .content-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
      width: 100%;
      box-sizing: border-box;
    }
    .page-header {
      margin-bottom: 4rem;
    }
    .page-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(0.65rem, 2.5vw, 0.75rem);
      color: var(--text-primary);
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
      white-space: nowrap;
    }
    .page-title {
      font-size: 3.6rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--text-primary);
      margin-bottom: 0.8rem;
    }
    .page-subtitle {
      font-size: 1.15rem;
      color: var(--text-secondary);
      max-width: 780px;
      line-height: 1.7;
    }

    /* Stacking Deck Container */
    .stacked-deck-container {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      position: relative;
      width: 100%;
      box-sizing: border-box;
    }
    .case-study-card {
      padding: 3.5rem;
      border-radius: 18px;
      margin-bottom: 3.5rem;
      box-shadow: 0 20px 60px rgba(24, 62, 51, 0.132);
      transition: all 0.3s ease;
      width: 100%;
      box-sizing: border-box;
    }
    .stacked-card {
      position: sticky;
    }

    /* Card Header */
    .case-header {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 2.5rem;
      margin-bottom: 2rem;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .case-meta {
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
    }
    .meta-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 1.2rem;
      width: 100%;
    }
    .case-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: var(--text-primary);
      letter-spacing: 0.1em;
      line-height: 1.5;
      word-break: break-word;
      white-space: normal;
      overflow: visible;
      min-width: 0;
      flex: 1;
    }
    .github-repo-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.95rem;
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-primary);
      background: rgba(24, 62, 51, 0.05);
      border: 1px solid rgba(24, 62, 51, 0.12);
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    .github-repo-pill:hover {
      background: rgba(24, 62, 51, 0.15);
      border-color: rgba(24, 62, 51, 0.3);
      transform: translateY(-1px);
    }
    .gh-icon {
      color: var(--text-primary);
      flex-shrink: 0;
    }
    .case-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      margin-bottom: 0.4rem;
    }
    .case-sub {
      font-size: 1.1rem;
      color: var(--text-primary);
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      margin-bottom: 1rem;
    }
    .case-overview {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.75;
      margin-bottom: 1.5rem;
    }

    /* Architecture Flow Box */
    .arch-flow-box {
      margin: 1.8rem 0;
      background: var(--bg-base);
      border: 1px solid rgba(24, 62, 51, 0.12);
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .arch-flow-header {
      padding: 0.7rem 1.2rem;
      background: rgba(24, 62, 51, 0.03);
      border-bottom: 1px solid rgba(24, 62, 51, 0.08);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-primary);
      letter-spacing: 0.1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .scroll-hint {
      color: var(--text-secondary);
      font-size: 0.65rem;
      background: rgba(24, 62, 51, 0.05);
      border: 1px solid rgba(24, 62, 51, 0.1);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
    }
    .arch-flow-content {
      padding: 1.4rem;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x pan-y;
      overscroll-behavior-x: contain;
      user-select: text;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      cursor: grab;
      scrollbar-width: thin;
      scrollbar-color: rgba(24, 62, 51, 0.4) transparent;
    }
    .arch-flow-content::-webkit-scrollbar {
      height: 6px;
    }
    .arch-flow-content::-webkit-scrollbar-track {
      background: var(--bg-surface);
    }
    .arch-flow-content::-webkit-scrollbar-thumb {
      background: rgba(24, 62, 51, 0.5);
      border-radius: 4px;
    }
    .arch-flow-content:active {
      cursor: grabbing;
    }
    .arch-pre {
      margin: 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      line-height: 1.5;
      color: var(--text-primary);
      white-space: pre;
      display: inline-block;
      min-width: max-content;
    }

    /* Resume Bullet Box */
    .bullet-points-box {
      background: rgba(24, 62, 51, 0.02);
      border: 1px solid rgba(24, 62, 51, 0.06);
      border-radius: 10px;
      padding: 1.4rem;
      margin-top: 1rem;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .bullet-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-primary);
      letter-spacing: 0.12em;
      margin-bottom: 0.8rem;
      display: block;
    }
    .bullet-list {
      list-style-type: square;
      padding-left: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .bullet-list li {
      font-size: 0.88rem;
      color: var(--text-primary);
      line-height: 1.6;
    }

    .case-metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
    }
    .metric-chip {
      padding: 1.2rem;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .chip-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--text-primary);
    }
    .chip-lbl {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    /* Full-Width High-Resolution Project Image */
    .project-image {
      width: 100%;
      height: 480px;
      object-fit: cover;
      object-position: top;
      display: block;
    }

    .image-overlay-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(180deg, transparent 0%, var(--bg-surface) 100%);
      padding: 1rem 1.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-secondary);
      letter-spacing: 0.15em;
      pointer-events: none;
    }

    .tech-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin: 2.2rem 0;
    }
    .tech-pill {
      background: rgba(24, 62, 51, 0.05);
      border: 1px solid rgba(24, 62, 51, 0.1);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-primary);
    }

    /* Deep Dive */
    .interactive-deepdive {
      border-top: 1px solid rgba(24, 62, 51, 0.08);
      padding-top: 2rem;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .deepdive-nav {
      margin-bottom: 2rem;
    }
    .nav-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-secondary);
      letter-spacing: 0.15em;
      margin-bottom: 0.8rem;
      display: block;
    }
    .tabs-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }
    .tab-btn {
      background: rgba(24, 62, 51, 0.03);
      border: 1px solid rgba(24, 62, 51, 0.08);
      color: var(--text-secondary);
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn:hover {
      background: rgba(24, 62, 51, 0.08);
      color: var(--text-primary);
    }
    .tab-btn.active {
      background: var(--accent-forest);
      border-color: var(--accent-forest);
      color: var(--palette-ivory);
    }
    .deepdive-view {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 2rem;
      align-items: start;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .view-explanation h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.8rem;
    }
    .view-explanation p {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.75;
    }

    /* Code Window */
    .code-window {
      background: var(--bg-base);
      border: 1px solid rgba(24, 62, 51, 0.12);
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .code-header {
      background: rgba(24, 62, 51, 0.03);
      border-bottom: 1px solid rgba(24, 62, 51, 0.08);
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
    }
    .window-dots span:nth-child(1) { background: var(--accent-forest); }
    .window-dots span:nth-child(2) { background: var(--accent-forest); }
    .window-dots span:nth-child(3) { background: var(--accent-forest); }
    .filename {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    .lang {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-primary);
      text-transform: uppercase;
    }
    .code-content {
      padding: 1.4rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      line-height: 1.7;
      color: var(--text-primary);
      overflow-x: auto;
      white-space: pre-wrap;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    @media (max-width: 1024px) {
      .page-title { font-size: 2.8rem; }
      .case-header { grid-template-columns: 1fr; gap: 1.5rem; }
      .deepdive-view { grid-template-columns: 1fr; }
      .project-image { height: 280px; }
      .meta-badge-row { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
      .stacked-card { position: static; }
    }

    @media (max-width: 768px) {
      .work-stage { padding: 3rem 0 6rem; width: 100%; overflow-x: hidden; }
      .content-container { padding: 0 1rem; width: 100%; max-width: 100%; }
      .page-title { font-size: 2.1rem; line-height: 1.2; }
      .case-study-card { padding: 1.5rem 1rem; margin-bottom: 2rem; border-radius: 14px; box-sizing: border-box; width: 100%; max-width: 100%; overflow-x: hidden; }
      .case-header { grid-template-columns: 1fr; gap: 1.2rem; width: 100%; }
      .case-title { font-size: 1.55rem; word-break: break-word; }
      .case-overview { font-size: 0.88rem; }
      .project-image { height: 220px; }
      .case-metrics { grid-template-columns: 1fr; gap: 0.6rem; width: 100%; }
      .arch-flow-box { max-width: 100%; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .arch-flow-content { padding: 0.8rem; max-width: 100%; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .arch-pre { font-size: 0.65rem; }
      .bullet-points-box { padding: 1rem; width: 100%; box-sizing: border-box; }
      .bullet-list li { font-size: 0.82rem; }
      .code-content { padding: 1rem; font-size: 0.75rem; word-break: break-all; width: 100%; }
      .deepdive-nav .tabs-list { flex-direction: column; width: 100%; }
      .tab-btn { width: 100%; text-align: left; }
    }
  `]
})
export class WorkComponent implements AfterViewInit, OnDestroy {
  readonly projects: ProjectCaseStudy[] = [
    {
        "id": "b1gcrm",
        "number": "01",
        "tag": "REACT / NODE.JS / POSTGRESQL / LANGGRAPH",
        "repoUrl": "https://github.com/UtkarshD18/B1G-CRM",
        "title": "B1GCRM — Multi-Agent CRM",
        "subtitle": "StateGraph routing · pgvector retrieval · Omni-channel messaging",
        "overview": "Self-driven enterprise architecture project documented during my Healthyonegram IT internship. Combines multi-agent routing, PostgreSQL document retrieval, and a multi-tenant CRM.",
        "tags": [
            "React",
            "Node.js",
            "PostgreSQL",
            "LangGraph",
            "LangChain",
            "pgvector",
            "Socket.io",
            "React Flow",
            "Zustand"
        ],
        "metrics": [
            {
                "label": "Synthesis prompt token reduction",
                "value": "45%"
            },
            {
                "label": "LLM API cost reduction",
                "value": "30%"
            },
            {
                "label": "Query routing accuracy",
                "value": "98%"
            },
            {
                "label": "Integration tests",
                "value": "30+"
            }
        ],
        "bulletPoints": [
            "Architected StateGraph-based routing across Support RAG, Sales, and SQL Order Tracker agents.",
            "Built PostgreSQL pgvector semantic document retrieval and conversation memory limits.",
            "Developed multi-tenant WhatsApp/Instagram integrations, a visual automation flow builder, and role-based access control.",
            "Optimized SQL and indexing; the resume reports a 90% reduction in campaign execution time."
        ],
        "scrollDirection": "left",
        "snippets": []
    },
    {
        "id": "bogecom",
        "number": "02",
        "tag": "MERN / NEXT.JS / FIREBASE / GCP",
        "repoUrl": "https://github.com/UtkarshD18/bogEcom",
        "title": "BogEcom — E-Commerce Platform",
        "subtitle": "Payments · Authentication · Deployment automation",
        "overview": "Production e-commerce platform developed during my Healthyonegram IT internship, with payment integrations, JWT authentication, RBAC, and automated deployment.",
        "tags": [
            "MERN",
            "Next.js",
            "Firebase",
            "GCP",
            "JWT",
            "RBAC",
            "GitHub Actions"
        ],
        "imageUrl": "/assets/projects/desktop-home.png",
        "metrics": [
            {
                "label": "Monthly active users",
                "value": "5,000+"
            },
            {
                "label": "Payment gateways",
                "value": "2"
            },
            {
                "label": "API / DB performance improvement",
                "value": "40%"
            },
            {
                "label": "Deployment time reduction",
                "value": "80%"
            }
        ],
        "bulletPoints": [
            "Developed and deployed the commerce platform and integrated two payment gateways.",
            "Implemented JWT authentication and role-based access control.",
            "Automated CI/CD with GitHub Actions and resolved 100+ production/testing issues."
        ],
        "scrollDirection": "right",
        "snippets": []
    },
    {
        "id": "mediaforge",
        "number": "03",
        "tag": "PYTHON / FFMPEG / SQLITE / PYSIDE6",
        "repoUrl": "https://github.com/UtkarshD18/MediaForge",
        "title": "MediaForge AI — Media Transcoding Daemon",
        "subtitle": "Filesystem watcher · FIFO job queue · Unix domain sockets",
        "overview": "Independently designed Python media transcoding daemon with a filesystem watcher, SQLite-backed FIFO queue, Unix Domain Socket IPC, and a PySide6 interface.",
        "tags": [
            "Python",
            "FFmpeg",
            "SQLite",
            "PySide6 (Qt6)",
            "Unix Domain Sockets"
        ],
        "metrics": [
            {
                "label": "Stress-test peak RAM",
                "value": "< 73 MB"
            },
            {
                "label": "Stress-test input files",
                "value": "100"
            },
            {
                "label": "Duplicate detection",
                "value": "SHA256"
            },
            {
                "label": "Job queue",
                "value": "SQLite FIFO"
            }
        ],
        "bulletPoints": [
            "Designed a thread-isolated background daemon and worker-thread pool for concurrent, non-blocking processing.",
            "Built automated GPU detection with CPU fallback.",
            "Implemented SHA256 duplicate detection with O(1) lookups; the resume reports stress testing with 100 concurrent files."
        ],
        "scrollDirection": "left",
        "snippets": []
    },
    {
        "id": "dsvisualizer",
        "number": "04",
        "tag": "TYPESCRIPT / TREE-SITTER / BABEL / D3.JS",
        "repoUrl": "https://github.com/UtkarshD18/DS-visualizer",
        "title": "Data Structure Visualizer — VS Code Extension",
        "subtitle": "Algorithm animation · AST parsing · Variable tracking",
        "overview": "VS Code extension for visualizing arrays, trees, and linked lists with step-by-step algorithm animation, multi-language AST parsing, variable tracking, and breakpoints.",
        "tags": [
            "TypeScript",
            "Tree-sitter",
            "Babel",
            "Mermaid.js",
            "D3.js"
        ],
        "metrics": [
            {
                "label": "Automated tests",
                "value": "69"
            },
            {
                "label": "Reported test success",
                "value": "92.8%"
            }
        ],
        "bulletPoints": [
            "Built visualization and algorithm animation for arrays, trees, and linked lists.",
            "Added AST-based parsing, variable tracking, and breakpoints.",
            "The resume reports 92.8% success across 69 automated tests."
        ],
        "scrollDirection": "right",
        "snippets": []
    },
    {
        "id": "airtable-trello",
        "number": "05",
        "tag": "PYTHON / REST APIS",
        "repoUrl": "https://github.com/UtkarshD18/automation-two-way-sync-Vision",
        "title": "Two-Way Sync: Airtable ↔ Trello",
        "subtitle": "Lead synchronization · Duplicate prevention · Recovery",
        "overview": "Python REST API automation that creates and updates Trello tasks from Airtable leads, with idempotent logic and recovery for deleted cards.",
        "tags": [
            "Python",
            "REST APIs",
            "Airtable",
            "Trello"
        ],
        "metrics": [
            {
                "label": "Manual update reduction",
                "value": "80–90%"
            },
            {
                "label": "Reported sync error reduction",
                "value": "70%+"
            },
            {
                "label": "Duplicate cards in reported results",
                "value": "0"
            }
        ],
        "bulletPoints": [
            "Automated lead-to-task synchronization through Airtable and Trello REST APIs.",
            "Designed idempotent logic to prevent duplicate cards and recreate deleted Trello cards."
        ],
        "scrollDirection": "left",
        "snippets": []
    },
    {
        "id": "summitly",
        "number": "06",
        "tag": "MERN / REACT / VITE",
        "repoUrl": "",
        "title": "Summitly — Event Management Platform",
        "subtitle": "Event pages · JWT login · Ticket records",
        "overview": "Full-stack event platform with JWT login, dynamic pages, ticketing, and REST APIs, as documented in my resume.",
        "tags": [
            "MERN",
            "React",
            "Vite",
            "JWT",
            "REST APIs"
        ],
        "metrics": [
            {
                "label": "Events supported",
                "value": "20+"
            },
            {
                "label": "Dynamic pages",
                "value": "10+"
            },
            {
                "label": "Ticket records",
                "value": "100+"
            },
            {
                "label": "Core data models",
                "value": "3"
            }
        ],
        "bulletPoints": [
            "Built event pages, secure JWT login, a ticketing system, and REST APIs across three core data models."
        ],
        "scrollDirection": "right",
        "snippets": []
    }
];

  private activeSnippetsState = new Map<string, CodeSnippet>();
  private observer?: IntersectionObserver;

  constructor() {
    this.projects.forEach(p => {
      this.activeSnippetsState.set(p.id, p.snippets[0]);
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-visible');
            }
          });
        },
        { threshold: 0.05, rootMargin: '100px 0px -40px 0px' }
      );

      const targets = document.querySelectorAll('.reveal-target');
      targets.forEach((t) => {
        const rect = t.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          t.classList.add('scroll-visible');
        }
        this.observer?.observe(t);
      });
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onMouseMove(e: MouseEvent, target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    target.style.setProperty('--mouse-x', x.toFixed(3));
    target.style.setProperty('--mouse-y', y.toFixed(3));
  }

  onMouseLeave(target: HTMLElement): void {
    target.style.setProperty('--mouse-x', '0.5');
    target.style.setProperty('--mouse-y', '0.5');
  }

  getActiveSnippet(projectId: string): CodeSnippet {
    return this.activeSnippetsState.get(projectId) || this.projects.find(p => p.id === projectId)!.snippets[0];
  }

  setActiveSnippet(projectId: string, snippet: CodeSnippet): void {
    this.activeSnippetsState.set(projectId, snippet);
  }
}
