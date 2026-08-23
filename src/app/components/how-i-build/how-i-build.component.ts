import { Component, signal, HostListener, PLATFORM_ID, inject, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface BuildStep {
  num: string;
  title: string;
  tagline: string;
  summary: string;
  codeSnippet: string;
  badge: string;
}

@Component({
  selector: 'app-how-i-build',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="how-i-build-section" #sectionRef>
      <div class="section-container">
        
        <!-- Left Column: Pinned Section Heading & Live Step Tracker -->
        <div class="pinned-left-col">
          <div class="eyebrow-tag">
            <span class="pulse-indicator"></span>
            <span>02 — HOW I THINK &amp; BUILD</span>
          </div>
          
          <h2 class="pinned-heading">
            Engineering<br />
            Methodology &amp;<br />
            Systems Thinking
          </h2>

          <p class="pinned-subtext">
            Every production system is engineered through four disciplined phases: from mathematical problem decomposition to hardened deployment.
          </p>

          <!-- Step Navigation Indicators -->
          <div class="step-nav-pills">
            @for (step of steps; track step.num; let i = $index) {
              <div 
                class="step-nav-item"
                [class.is-active]="activeStep() === i"
                (click)="scrollToStep(i)"
              >
                <span class="step-idx">{{ step.num }}</span>
                <span class="step-lbl">{{ step.title }}</span>
                <div class="step-bar" [class.filled]="activeStep() >= i"></div>
              </div>
            }
          </div>
        </div>

        <!-- Right Column: Sequentially Activating Step Cards -->
        <div class="scrolling-right-col">
          @for (step of steps; track step.num; let i = $index) {
            <div 
              class="step-card spotlight-card"
              [class.is-active]="activeStep() === i"
              #stepCardEl
            >
              <div class="card-header">
                <div class="card-meta">
                  <span class="badge-num">{{ step.num }}</span>
                  <span class="badge-tag">{{ step.badge }}</span>
                </div>
                <span class="phase-pill">PHASE {{ i + 1 }} OF 4</span>
              </div>

              <h3 class="step-card-title">{{ step.title }}</h3>
              <p class="step-card-tagline">{{ step.tagline }}</p>
              <p class="step-card-desc">{{ step.summary }}</p>

              <div class="code-terminal">
                <div class="term-header">
                  <div class="dots">
                    <span class="d red"></span>
                    <span class="d yellow"></span>
                    <span class="d green"></span>
                  </div>
                  <span class="term-title">methodology/phase_{{ step.num }}.ts</span>
                </div>
                <pre class="term-code"><code>{{ step.codeSnippet }}</code></pre>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .how-i-build-section {
      padding: 8rem 0 10rem;
      position: relative;
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .section-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 4rem;
      align-items: start;
    }

    /* Pinned Left Column (Sticky at top: 100px during scroll) */
    .pinned-left-col {
      position: sticky;
      top: 100px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .eyebrow-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #38bdf8;
      letter-spacing: 0.08em;
      font-weight: 700;
    }

    .pulse-indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 8px #38bdf8;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .pinned-heading {
      font-size: 2.8rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }

    .pinned-subtext {
      font-size: 1rem;
      color: #8e8e9f;
      line-height: 1.65;
    }

    .step-nav-pills {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      margin-top: 1rem;
    }

    .step-nav-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .step-nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
    }

    .step-nav-item.is-active {
      background: rgba(56, 189, 248, 0.08);
      border-color: #38bdf8;
    }

    .step-idx {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      font-weight: 800;
      color: #38bdf8;
    }

    .step-lbl {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .step-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 0%;
      background: #38bdf8;
      transition: width 0.3s ease;
    }

    .step-bar.filled {
      width: 100%;
    }

    /* Scrolling Right Column */
    .scrolling-right-col {
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }

    .step-card {
      background: rgba(14, 14, 20, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 2.2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .step-card.is-active {
      border-color: #38bdf8;
      box-shadow: 0 0 35px rgba(56, 189, 248, 0.15), 0 20px 50px rgba(0, 0, 0, 0.8);
      transform: translateY(-4px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-meta {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .badge-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.1rem;
      font-weight: 800;
      color: #38bdf8;
    }

    .badge-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      color: #8e8e9f;
    }

    .phase-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-weight: 700;
    }

    .step-card-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.01em;
    }

    .step-card-tagline {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: #38bdf8;
    }

    .step-card-desc {
      font-size: 0.92rem;
      color: #8e8e9f;
      line-height: 1.65;
    }

    .code-terminal {
      background: #060608;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
      margin-top: 0.5rem;
    }

    .term-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.6rem 1rem;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .dots {
      display: flex;
      gap: 0.35rem;
    }

    .d {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .d.red { background: #ef4444; }
    .d.yellow { background: #f59e0b; }
    .d.green { background: #10b981; }

    .term-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      color: #8e8e9f;
    }

    .term-code {
      padding: 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.74rem;
      color: #e2e8f0;
      line-height: 1.6;
      overflow-x: auto;
    }

    @media (max-width: 1024px) {
      .section-container {
        grid-template-columns: 1fr;
      }
      .pinned-left-col {
        position: relative;
        top: 0;
      }
    }
  `]
})
export class HowIBuildComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChildren('stepCardEl') stepCards?: QueryList<ElementRef<HTMLElement>>;

  readonly activeStep = signal<number>(0);

  readonly steps: BuildStep[] = [
    {
      num: '01',
      title: 'Problem Decomposition & State Models',
      tagline: 'Formalizing state machines before writing code',
      summary: 'Mapping asynchronous race conditions, defining typed schemas, and architecting transactional boundaries before touching implementations.',
      badge: 'ARCHITECTURAL RIGOR',
      codeSnippet: `// Step 01: Defining State Machine & Typed State Schema
export interface EngineState {
  readonly query: string;
  readonly intentScore: number;
  readonly executionPlan: ReadonlyArray<AgentAction>;
  readonly status: 'IDLE' | 'ROUTING' | 'EXECUTING' | 'SETTLED';
}`
    },
    {
      num: '02',
      title: 'Multi-Agent & Concurrent Pipelines',
      tagline: 'StateGraph routers with semantic similarity cache',
      summary: 'Deploying LangGraph routers and pgvector cosine caching to reduce redundant LLM token passes by 45% while preserving 98% triage accuracy.',
      badge: 'ROUTING & EFFICIENCY',
      codeSnippet: `// Step 02: LangGraph StateGraph Supervisor Node
export const supervisorNode = async (state: EngineState) => {
  const match = await pgvector.findSimilarQuery(state.query, { threshold: 0.88 });
  if (match) return { cached: true, response: match.payload };
  return { nextAgent: selectOptimalModel(state.intentScore) };
};`
    },
    {
      num: '03',
      title: 'ACID Isolation & Persistent Queues',
      tagline: 'Zero-loss SQLite FIFO daemon & pessimistic DB locks',
      summary: 'Preventing race conditions through database transactions, pessimistic inventory locks, and POSIX pipe IPC for background video rendering (<73 MB heap).',
      badge: 'CONCURRENCY SAFETY',
      codeSnippet: `// Step 03: Pessimistic Inventory Lock in Transaction
export async function processOrderSettlement(items, session) {
  for (const item of items) {
    const stock = await Inventory.findOneAndUpdate(
      { _id: item.id, qty: { $gte: item.count } },
      { $inc: { qty: -item.count } },
      { session, new: true }
    );
    if (!stock) throw new StockUnavailableError(item.id);
  }
}`
    },
    {
      num: '04',
      title: 'Empirical Telemetry & CI/CD Validation',
      tagline: 'Zero-hallucination verification & automated regression tests',
      summary: 'Hardening deployments with GitHub Actions pipelines, Playwright visual regression crawls, and 100% verified integration suites.',
      badge: 'PRODUCTION HARDENED',
      codeSnippet: `// Step 04: Production Readiness Health Assertion
test('order settlement preserves ACID idempotency', async ({ request }) => {
  const [res1, res2] = await Promise.all([
    dispatchOrder(duplicatePayload),
    dispatchOrder(duplicatePayload)
  ]);
  expect(res1.status()).toBe(200);
  expect(res2.status()).toBe(409); // Idempotent rejection
});`
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveStep();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveStep();
    }
  }

  scrollToStep(index: number): void {
    if (!isPlatformBrowser(this.platformId) || !this.stepCards) return;
    const card = this.stepCards.toArray()[index];
    if (card) {
      const top = window.scrollY + card.nativeElement.getBoundingClientRect().top - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  private updateActiveStep(): void {
    if (!this.stepCards) return;
    const cards = this.stepCards.toArray();
    const triggerLine = window.innerHeight * 0.45;

    cards.forEach((card, index) => {
      const rect = card.nativeElement.getBoundingClientRect();
      if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
        this.activeStep.set(index);
      }
    });
  }
}
