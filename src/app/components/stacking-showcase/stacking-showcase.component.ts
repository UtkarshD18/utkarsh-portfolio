import { Component, signal, HostListener, PLATFORM_ID, inject, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

interface StackingCard {
  number: string;
  tag: string;
  repoUrl: string;
  title: string;
  subtitle: string;
  overview: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  routeLink: string;
  codeSnippet: string;
  architectureFlow: string;
  activeTab?: string;
}

@Component({
  selector: 'app-stacking-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="stacking-deck-section" #sectionRef>
      
      <!-- Layer 1: Background Parallax Coordinate Lattice (0.20x velocity) -->
      <div 
        class="parallax-grid-bg"
        [style.transform]="'translateY(' + (scrollYOffset() * 0.18) + 'px)'"
        aria-hidden="true"
      ></div>

      <div class="deck-container">
        
        <!-- Layer 3: Editorial Typography Anchor (1.00x velocity) -->
        <div class="deck-header">
          <div class="header-badge">
            <span class="pulse-dot"></span>
            <span>SHOPIFY EDITIONS CHOREOGRAPHY · 5-LAYER STACKING PHYSICS</span>
          </div>
          <h2 class="header-title">Architectural Systems Deck</h2>
          <p class="header-desc">
            Independent layered scroll stage driving 3D card deck compression, background coordinate parallax (0.20x), and floating interactive code inspectors (1.35x).
          </p>
        </div>

        <!-- Layer 4: 3D Stacking Deck Track (perspective: 1400px) -->
        <div class="cards-stack-track">
          @for (card of cards; track card.number; let i = $index) {
            <div 
              class="stacked-system-card spotlight-card"
              [style.top.px]="85 + (i * 22)"
              [style.z-index]="i + 1"
              #cardEl
            >
              
              <!-- Card Top Bar -->
              <div class="card-top-bar">
                <div class="top-meta">
                  <span class="card-num">{{ card.number }}</span>
                  <span class="card-tag">{{ card.tag }}</span>
                </div>
                <a [href]="card.repoUrl" target="_blank" class="repo-pill">
                  <span>Verified Repository ↗</span>
                </a>
              </div>

              <!-- Main Card Body Grid -->
              <div class="card-main-grid">
                
                <!-- Left Column (Overview & Real Metrics) -->
                <div class="col-left">
                  <h3 class="card-title">{{ card.title }}</h3>
                  <p class="card-subtitle">{{ card.subtitle }}</p>
                  <p class="card-overview">{{ card.overview }}</p>

                  <!-- Metric Badges with Spring Physics -->
                  <div class="card-metrics-grid">
                    @for (m of card.metrics; track m.label) {
                      <div class="metric-box">
                        <span class="metric-val">{{ m.value }}</span>
                        <span class="metric-lbl">{{ m.label }}</span>
                      </div>
                    }
                  </div>

                  <!-- Tech Stack Pills -->
                  <div class="card-pills">
                    @for (t of card.tags; track t) {
                      <span class="pill-chip">{{ t }}</span>
                    }
                  </div>
                </div>

                <!-- Right Column: Layer 5 Floating UI Props (1.35x Velocity Parallax) -->
                <div 
                  class="col-right floating-ui-prop"
                  [style.transform]="'translateY(' + getPropParallax(i) + 'px)'"
                >
                  
                  <!-- Architecture Topology Box -->
                  <div class="architecture-flow-box">
                    <div class="flow-header">
                      <span class="flow-dot"></span>
                      <span>SYSTEM ARCHITECTURE TOPOLOGY</span>
                    </div>
                    <pre class="flow-text"><code>{{ card.architectureFlow }}</code></pre>
                  </div>

                  <!-- Live Code Terminal Preview -->
                  <div class="code-preview-box">
                    <div class="code-top">
                      <div class="terminal-dots">
                        <span class="dot-icon red"></span>
                        <span class="dot-icon yellow"></span>
                        <span class="dot-icon green"></span>
                      </div>
                      <span class="file-name">subsystem/{{ card.title.toLowerCase().split(' ')[0] }}_engine.js</span>
                      <span class="live-pill">● 1.35x PARALLAX</span>
                    </div>
                    <pre class="code-view"><code>{{ card.codeSnippet }}</code></pre>
                  </div>

                </div>

              </div>

              <!-- Card Bottom Bar -->
              <div class="card-bottom-bar">
                <span class="stack-indicator">Layer 0{{ i + 1 }} of 03 · Scroll to stack next system card ↓</span>
                <a [routerLink]="card.routeLink" class="deepdive-link magnetic-btn">
                  <span>Explore Deep-Dive Case Study →</span>
                </a>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .stacking-deck-section {
      padding: 6rem 0 12rem;
      position: relative;
      background: transparent;
      border-bottom: 1px solid rgba(24, 62, 51, 0.06);
      overflow: hidden;
    }

    /* Layer 1: Background Parallax Coordinate Lattice */
    .parallax-grid-bg {
      position: absolute;
      inset: -20% -10%;
      background-image: 
        linear-gradient(to right, rgba(24, 62, 51, 0.018) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(24, 62, 51, 0.018) 1px, transparent 1px);
      background-size: 72px 72px;
      pointer-events: none;
      z-index: 0;
      will-change: transform;
    }

    .deck-container {
      position: relative;
      z-index: 1;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .deck-header {
      margin-bottom: 4rem;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(24, 62, 51, 0.1);
      border: 1px solid rgba(24, 62, 51, 0.25);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: var(--text-primary);
      margin-bottom: 0.8rem;
    }

    .pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-forest);
      box-shadow: 0 0 8px var(--accent-forest);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .header-title {
      font-size: 2.6rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      margin-bottom: 0.6rem;
    }

    .header-desc {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 720px;
      line-height: 1.6;
    }

    /* Stacking Cards Track with 3D Perspective Context */
    .cards-stack-track {
      display: flex;
      flex-direction: column;
      gap: 8rem;
      position: relative;
      perspective: 1400px;
      perspective-origin: 50% 20%;
    }

    /* Individual Sticky Stacking Card */
    .stacked-system-card {
      position: sticky;
      background: var(--bg-surface);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid rgba(24, 62, 51, 0.11);
      border-radius: 24px;
      padding: 2.5rem 3rem;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      box-shadow: 0 -15px 45px rgba(24, 62, 51, 0.160), 0 35px 85px rgba(24, 62, 51, 0.160);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease, box-shadow 0.35s ease;
      will-change: transform, filter;
      transform-origin: center top;
    }

    .card-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(24, 62, 51, 0.07);
      padding-bottom: 1.2rem;
    }

    .top-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .card-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .card-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-secondary);
      letter-spacing: 0.08em;
    }

    .repo-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      background: rgba(24, 62, 51, 0.05);
      border: 1px solid rgba(24, 62, 51, 0.1);
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      color: var(--text-primary);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .repo-pill:hover {
      background: rgba(24, 62, 51, 0.15);
      border-color: rgba(24, 62, 51, 0.4);
    }

    /* Main Card Grid */
    .card-main-grid {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 2.5rem;
      align-items: start;
    }

    .col-left {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .card-title {
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }

    .card-subtitle {
      font-size: 0.95rem;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-primary);
    }

    .card-overview {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.65;
    }

    .card-metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
      margin-top: 0.5rem;
    }

    .metric-box {
      background: rgba(24, 62, 51, 0.03);
      border: 1px solid rgba(24, 62, 51, 0.06);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      transition: transform 0.25s ease, border-color 0.25s ease;
    }

    .metric-box:hover {
      transform: translateY(-2px);
      border-color: rgba(24, 62, 51, 0.15);
    }

    .metric-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .metric-lbl {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .card-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .pill-chip {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      background: rgba(24, 62, 51, 0.05);
      border: 1px solid rgba(24, 62, 51, 0.08);
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      color: var(--text-primary);
    }

    /* Right Column: Layer 5 Floating UI Props (1.35x Velocity Parallax) */
    .col-right {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      will-change: transform;
      transition: transform 0.15s ease-out;
    }

    .architecture-flow-box {
      background: var(--bg-base);
      border: 1px solid rgba(24, 62, 51, 0.08);
      border-radius: 14px;
      padding: 1.2rem;
      box-shadow: inset 0 2px 10px rgba(24, 62, 51, 0.110);
    }

    .flow-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      color: var(--text-primary);
      margin-bottom: 0.6rem;
    }

    .flow-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent-forest);
    }

    .flow-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: var(--text-primary);
      line-height: 1.5;
      overflow-x: auto;
    }

    .code-preview-box {
      background: var(--bg-base);
      border: 1px solid rgba(24, 62, 51, 0.08);
      border-radius: 14px;
      overflow: hidden;
    }

    .code-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.6rem 1rem;
      background: rgba(24, 62, 51, 0.02);
      border-bottom: 1px solid rgba(24, 62, 51, 0.06);
    }

    .terminal-dots {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .dot-icon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .dot-icon.red { background: var(--accent-forest); }
    .dot-icon.yellow { background: var(--accent-forest); }
    .dot-icon.green { background: var(--accent-forest); }

    .file-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      color: var(--text-secondary);
    }

    .live-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem;
      color: var(--text-primary);
      background: rgba(24, 62, 51, 0.1);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
    }

    .code-view {
      padding: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.74rem;
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: auto;
      max-height: 160px;
    }

    /* Card Bottom Bar */
    .card-bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(24, 62, 51, 0.07);
      padding-top: 1.2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .stack-indicator {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .deepdive-link {
      color: var(--text-primary);
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
    }

    .deepdive-link:hover {
      color: var(--text-primary);
    }

    @media (max-width: 1024px) {
      .card-main-grid {
        grid-template-columns: 1fr;
      }
      .stacked-system-card {
        padding: 2rem;
      }
      .cards-stack-track {
        gap: 5rem;
      }
    }

    @media (max-width: 768px) {
      .header-title {
        font-size: 2rem;
      }
      .stacked-system-card {
        position: relative;
        top: 0 !important;
        padding: 1.5rem;
      }
      .card-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class StackingShowcaseComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChildren('cardEl') cardElements?: QueryList<ElementRef<HTMLElement>>;

  readonly scrollYOffset = signal<number>(0);

  readonly cards: StackingCard[] = [
    {
      number: '01',
      tag: 'LANGGRAPH / PGVECTOR / STATEGRAPH / MULTI-AGENT',
      repoUrl: 'https://github.com/UtkarshD18/B1GCRM',
      title: 'B1GCRM Multi-Agent Platform',
      subtitle: '-45% Token Overhead · 98% Triage Accuracy · pgvector Cache',
      overview: 'Modernized customer intelligence architecture replacing sequential prompt chains with a StateGraph multi-agent router. Evaluates queries with semantic cosine similarity.',
      tags: ['LangGraph', 'PostgreSQL', 'pgvector', 'React', 'Node.js'],
      metrics: [
        { label: 'Token Reduction', value: '-45%' },
        { label: 'Triage Accuracy', value: '98%' },
        { label: 'Vector Similarity', value: 'Cosine' },
        { label: 'State Checkpoints', value: 'Postgres' }
      ],
      routeLink: '/work#b1gcrm',
      architectureFlow: `User Inbound Request ────> Supervisor Router Node
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
       Support Agent Node              Lead Scorer Node
               │                               │
               └───────────────┬───────────────┘
                               ▼
            pgvector Semantic RAG Cache (PostgreSQL)`,
      codeSnippet: `// B1GCRM StateGraph Router Dispatch
export async function routeUserQuery(state) {
  const supervisor = await evaluateQueryIntent(state.currentMessage);
  if (supervisor.confidence > 0.85) {
    return { nextNode: supervisor.targetAgent, state };
  }
  return { nextNode: "deterministicFallback", state };
}`
    },
    {
      number: '02',
      tag: 'MERN / NEXT.JS 14 / ACID ISOLATION / GCP / DUAL PAYMENTS',
      repoUrl: 'https://github.com/UtkarshD18/bogEcom',
      title: 'BogEcom Production Commerce Platform',
      subtitle: '5,000+ MAU · Dual Payment Gateways · +40% DB Performance',
      overview: 'Production e-commerce engine with dual Bearer/httpOnly JWT authorization, Role-Based Access Control (RBAC), and automated GitHub Actions CI/CD.',
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'JWT RBAC'],
      metrics: [
        { label: 'Active Users', value: '5,000+ MAU' },
        { label: 'Throughput Boost', value: '+40% DB/API' },
        { label: 'CI/CD Speedup', value: '80% Faster' },
        { label: 'Gateways', value: '2 Integrated' }
      ],
      routeLink: '/work#bogecom',
      architectureFlow: `Next.js 14 Storefront ────> JWT Auth Middleware (Bearer/Cookie)
                                    │
                                    ▼
                         RBAC Role Guard (Customer/Admin)
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
        Stripe/Razorpay Settlement        MongoDB / PostgreSQL Lock`,
      codeSnippet: `// bogEcom/server/middlewares/auth.js — Security Guard
export const auth = async (req, res, next) => {
  let token = req.headers?.authorization?.slice(7) || req.cookies?.accessToken;
  if (!token) return res.status(401).json({ error: "Missing token" });
  const decoded = jwt.verify(token, getAccessTokenSecret());
  req.userId = decoded.id;
  req.userRole = decoded.role;
  next();
};`
    },
    {
      number: '03',
      tag: 'POSIX WORKERS / SQLITE FIFO / FFMPEG / IPC PIPES',
      repoUrl: 'https://github.com/UtkarshD18/MediaForge',
      title: 'MediaForge Video & Asset Daemon',
      subtitle: '< 73 MB RAM Heap · SQLite FIFO Queue · Zero-Loss IPC',
      overview: 'Isolated background worker process for automated short-form video assembly. Features crash-resilient SQLite FIFO job queues and non-blocking IPC pipe streaming.',
      tags: ['TypeScript', 'Node.js', 'FFmpeg', 'SQLite FIFO', 'POSIX IPC'],
      metrics: [
        { label: 'Peak Daemon RAM', value: '< 73 MB' },
        { label: 'Job Persistence', value: 'SQLite FIFO' },
        { label: 'IPC Protocol', value: 'POSIX Pipes' },
        { label: 'Crash Recovery', value: 'Auto-Healing' }
      ],
      routeLink: '/work#mediaforge',
      architectureFlow: `Electron / CLI UI ────> Named POSIX Pipe IPC ────> Isolated Background Daemon
                                                              │
                                                              ▼
                                                   SQLite FIFO Task Queue
                                                              │
                                                              ▼
                                                  FFmpeg Video Stitcher`,
      codeSnippet: `// MediaForge Daemon IPC Message Loop
export async function pollDaemonTasks() {
  const job = await db.prepare("SELECT * FROM jobs WHERE status='QUEUED' ORDER BY id ASC LIMIT 1").get();
  if (!job) return;
  await processVideoAssembly(job);
}`
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCardTransforms();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollYOffset.set(window.scrollY);
      this.updateCardTransforms();
    }
  }

  getPropParallax(cardIndex: number): number {
    // 1.35x foreground offset relative to scroll position
    const baseOffset = (this.scrollYOffset() * 0.035) % 30;
    return (cardIndex % 2 === 0 ? baseOffset : -baseOffset);
  }

  private updateCardTransforms(): void {
    if (!this.cardElements) return;

    const cardsArray = this.cardElements.toArray();
    cardsArray.forEach((cardRef, index) => {
      const el = cardRef.nativeElement;
      const rect = el.getBoundingClientRect();
      const targetTop = 85 + (index * 22);

      // Check if this card is pinned at targetTop
      if (rect.top <= targetTop + 5) {
        // Find if subsequent card is overlapping it
        const nextCard = cardsArray[index + 1];
        if (nextCard) {
          const nextRect = nextCard.nativeElement.getBoundingClientRect();
          const overlap = Math.max(0, (targetTop + el.offsetHeight) - nextRect.top);
          const progress = Math.min(1, overlap / el.offsetHeight);
          
          // Physical 3D tilt, scale reduction and depth dimming
          const scale = 1 - (progress * 0.055);
          const rotateX = progress * -2.5; // 3D backward tilt
          const brightness = 1 - (progress * 0.22);
          el.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          el.style.filter = `brightness(${brightness.toFixed(2)})`;
        }
      } else {
        el.style.transform = 'perspective(1400px) rotateX(0deg) scale(1)';
        el.style.filter = 'brightness(1)';
      }
    });
  }
}
