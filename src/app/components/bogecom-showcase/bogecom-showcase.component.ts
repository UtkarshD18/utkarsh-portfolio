import { Component, signal, HostListener, PLATFORM_ID, inject, ElementRef, ViewChild, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ArchitectureStep {
  stepNum: string;
  name: string;
  role: string;
  badge: string;
  details: string;
  codeSnippet: string;
  metric: string;
}

@Component({
  selector: 'app-bogecom-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- 250vh Scroll Track Container for Physical Scroll Physics -->
    <div class="bogecom-scroll-track" #trackRef>
      
      <!-- Pinned Viewport Stage (Sticky during 250vh scroll traversal) -->
      <section class="bogecom-sticky-stage">
        <div class="stage-inner">
          
          <!-- Top Section Header -->
          <div class="stage-top-bar">
            <div>
              <div class="badge-row">
                <span class="system-status-dot"></span>
                <span class="system-tag">SCROLL-TIED ARCHITECTURE STAGE · 5,000+ MAU</span>
              </div>
              <h2 class="stage-heading">BogEcom High-Concurrency Pipeline</h2>
            </div>

            <!-- Real-time Physical Scroll Telemetry -->
            <div class="scroll-telemetry">
              <span class="telemetry-label">SCROLL SCRUB:</span>
              <span class="telemetry-pct">{{ (scrollProgress() * 100).toFixed(0) }}%</span>
              <span class="phase-pill">PHASE {{ activePhaseIndex() + 1 }} OF 3</span>
            </div>
          </div>

          <!-- Physical Scrub Progress Line -->
          <div class="scrub-line-container">
            <div class="scrub-line-fill" [style.width.%]="scrollProgress() * 100"></div>
          </div>

          <!-- Central Architectural Canvas with Dynamic Parallax Scale -->
          <div 
            class="architecture-canvas spotlight-card"
            [style.transform]="canvasTransform()"
          >
            <!-- 3-Phase Interactive Pipeline Steps -->
            <div class="pipeline-track">
              @for (step of steps; track step.stepNum; let i = $index) {
                <div 
                  class="step-card"
                  [class.is-active]="activePhaseIndex() === i"
                  (click)="scrollToPhase(i)"
                >
                  <div class="step-meta">
                    <span class="step-num">0{{ i + 1 }}</span>
                    <span class="step-badge">{{ step.badge }}</span>
                  </div>
                  <h4 class="step-name">{{ step.name }}</h4>
                  <span class="step-role">{{ step.role }}</span>
                  <p class="step-desc">{{ step.details }}</p>
                  
                  <div class="step-status">
                    <span class="metric-tag">{{ step.metric }}</span>
                    @if (activePhaseIndex() === i) {
                      <span class="active-indicator">● LIVE PHASE</span>
                    }
                  </div>
                </div>
              }
            </div>

            <!-- Dynamic Live Code & Transaction Inspector -->
            <div class="inspector-panel">
              <div class="inspector-header">
                <div class="terminal-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="terminal-title">bogEcom/production/{{ currentStep().name.toLowerCase().replace(' ', '_') }}.js</span>
                </div>
                <div class="inspector-metrics">
                  <span class="tag-live">+40% API / DB THROUGHPUT</span>
                  <span class="tag-live">2 PAYMENT GATEWAYS</span>
                </div>
              </div>

              <div class="code-viewport">
                <pre class="code-content"><code>{{ currentStep().codeSnippet }}</code></pre>
              </div>
            </div>

            <!-- Bottom Navigation Prompt -->
            <div class="canvas-footer">
              <span class="scroll-instruction">
                Turn mouse wheel to physically scrub through all 3 architecture phases ↓
              </span>
              <a routerLink="/work" fragment="bogecom" class="explore-btn magnetic-btn">
                <span>View Full BogEcom Case Study in /work →</span>
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  `,
  styles: [`
    /* 250vh Physical Scroll Track */
    .bogecom-scroll-track {
      position: relative;
      min-height: 250vh;
      width: 100%;
      background: transparent;
    }

    /* Sticky Viewport Container (Locks in place while user scrolls through 250vh) */
    .bogecom-sticky-stage {
      position: sticky;
      top: 75px;
      height: calc(100vh - 90px);
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1.5rem 2rem;
      box-sizing: border-box;
      z-index: 10;
    }

    .stage-inner {
      max-width: 1240px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    /* Top Stage Bar */
    .stage-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .badge-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.4rem;
    }

    .system-status-dot {
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

    .system-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #38bdf8;
      letter-spacing: 0.1em;
      font-weight: 700;
    }

    .stage-heading {
      font-size: 2.2rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
    }

    .scroll-telemetry {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
    }

    .telemetry-label {
      color: #8e8e9f;
    }

    .telemetry-pct {
      color: #38bdf8;
      font-weight: 800;
    }

    .phase-pill {
      background: rgba(56, 189, 248, 0.12);
      color: #38bdf8;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-weight: 700;
    }

    /* Scrub Line Container */
    .scrub-line-container {
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 999px;
      overflow: hidden;
    }

    .scrub-line-fill {
      height: 100%;
      background: linear-gradient(90deg, #38bdf8, #3b82f6, #60a5fa);
      transition: width 0.08s linear;
    }

    /* Architecture Canvas */
    .architecture-canvas {
      background: rgba(14, 14, 20, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 20px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
      will-change: transform;
      transition: transform 0.15s ease-out;
    }

    /* 3 Pipeline Steps Grid */
    .pipeline-track {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.2rem;
    }

    .step-card {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .step-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.18);
    }

    .step-card.is-active {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      box-shadow: 0 0 30px rgba(56, 189, 248, 0.15);
      transform: translateY(-3px);
    }

    .step-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .step-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      font-weight: 800;
      color: #38bdf8;
    }

    .step-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.06);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      color: #8e8e9f;
    }

    .step-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
    }

    .step-role {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #93c5fd;
    }

    .step-desc {
      font-size: 0.82rem;
      color: #8e8e9f;
      line-height: 1.5;
    }

    .step-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 0.4rem;
    }

    .metric-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      background: rgba(0, 230, 118, 0.08);
      color: #00e676;
      border: 1px solid rgba(0, 230, 118, 0.2);
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
    }

    .active-indicator {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      color: #38bdf8;
      font-weight: 700;
    }

    /* Inspector & Code Block */
    .inspector-panel {
      background: #060608;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
    }

    .inspector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 1.4rem;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .terminal-dots {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot.red { background: #ef4444; }
    .dot.yellow { background: #f59e0b; }
    .dot.green { background: #10b981; }

    .terminal-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #8e8e9f;
      margin-left: 0.6rem;
    }

    .inspector-metrics {
      display: flex;
      gap: 0.5rem;
    }

    .tag-live {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      background: rgba(59, 130, 246, 0.1);
      color: #93c5fd;
      border: 1px solid rgba(59, 130, 246, 0.2);
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
    }

    .code-viewport {
      padding: 1.2rem 1.4rem;
    }

    .code-content {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      color: #e2e8f0;
      line-height: 1.6;
      overflow-x: auto;
    }

    /* Footer */
    .canvas-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 1rem;
    }

    .scroll-instruction {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8e8e9f;
    }

    .explore-btn {
      color: #38bdf8;
      font-size: 0.82rem;
      font-weight: 700;
      text-decoration: none;
    }

    .explore-btn:hover {
      color: #60a5fa;
    }

    @media (max-width: 1024px) {
      .pipeline-track {
        grid-template-columns: 1fr;
      }
      .bogecom-sticky-stage {
        height: auto;
        position: relative;
        top: 0;
      }
      .bogecom-scroll-track {
        min-height: auto;
      }
    }
  `]
})
export class BogecomShowcaseComponent {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChild('trackRef') trackRef?: ElementRef<HTMLElement>;

  readonly scrollProgress = signal<number>(0);
  
  readonly steps: ArchitectureStep[] = [
    {
      stepNum: '01',
      name: 'Client Storefront',
      role: 'Next.js 14 SSR & Realtime Cart',
      badge: '5,000+ MAU',
      details: 'Optimistic cart mutations, dual payment gateway checkout triggers, and low-latency API hydration.',
      metric: '5,000+ ACTIVE USERS',
      codeSnippet: `// bogEcom Client State Checkout Dispatch (Next.js)
export async function dispatchCheckoutPayload(orderData) {
  const response = await fetch('/api/orders/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${getAuthToken()}\`
    },
    body: JSON.stringify(orderData)
  });
  return response.json();
}`
    },
    {
      stepNum: '02',
      name: 'Auth & RBAC Middleware',
      role: 'Bearer & Cookie Verification',
      badge: 'CRYPTO VERIFIED',
      details: 'Inspects authorization headers and httpOnly cookies with secret rotation, verifying Customer/Admin roles.',
      metric: 'CRYPTO SECURE',
      codeSnippet: `// bogEcom/server/middlewares/auth.js — Production Security Guard
export const auth = async (req, res, next) => {
  let token = req.headers?.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7).trim()
    : req.cookies?.accessToken;

  if (!token) return res.status(401).json({ error: "Missing authentication token" });

  try {
    const decoded = jwt.verify(token, getAccessTokenSecret());
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid cryptographic token payload" });
  }
};`
    },
    {
      stepNum: '03',
      name: 'Order & Transaction Lock',
      role: 'ACID Settlement & Inventory Guard',
      badge: 'POSTGRES / MONGO',
      details: 'Dual payment webhook confirmation with pessimistic inventory lock to prevent stock race conditions.',
      metric: '+40% DB THROUGHPUT',
      codeSnippet: `// bogEcom Transactional Order Settlement Engine
export async function settleOrder(orderPayload) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const inventory = await verifyStock(orderPayload.items, { session });
    const payment = await gateway.verifyWebhook(orderPayload.paymentId);
    const order = await Order.create([orderPayload], { session });
    await session.commitTransaction();
    return { success: true, orderId: order[0]._id };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
}`
    }
  ];

  readonly activePhaseIndex = computed<number>(() => {
    const p = this.scrollProgress();
    if (p < 0.33) return 0;
    if (p < 0.66) return 1;
    return 2;
  });

  readonly currentStep = computed<ArchitectureStep>(() => {
    return this.steps[this.activePhaseIndex()];
  });

  readonly canvasTransform = computed<string>(() => {
    const p = this.scrollProgress();
    const scale = 1 + (p * 0.035);
    return `scale(${scale.toFixed(3)})`;
  });

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId) || !this.trackRef) return;
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const currentScrolled = -rect.top;
    
    // Normalized 0.0 -> 1.0 progress strictly within this 250vh stage
    const progress = Math.max(0, Math.min(1, currentScrolled / Math.max(1, totalScrollable)));
    this.scrollProgress.set(progress);
  }

  scrollToPhase(index: number): void {
    if (!isPlatformBrowser(this.platformId) || !this.trackRef) return;
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const targetScrollY = trackTop + (index * 0.35 * (rect.height - window.innerHeight));
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }
}
