import { Component, signal, HostListener, PLATFORM_ID, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ArchitectureStep {
  stepNum: string;
  name: string;
  role: string;
  badge: string;
  details: string;
  codeSnippet: string;
}

@Component({
  selector: 'app-bogecom-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="bogecom-stage-section" #stageSection>
      <div class="content-container">
        
        <!-- Section Header -->
        <div class="section-top">
          <span class="section-tag">[ ARCHITECTURAL SPOTLIGHT · 5,000+ MAU PLATFORM ]</span>
          <h2 class="section-title">BogEcom — Production E-Commerce Architecture</h2>
          <p class="section-desc">
            High-concurrency MERN &amp; Next.js architecture with dual-token JWT authentication, Role-Based Access Control (RBAC), and multi-gateway payment orchestration.
          </p>
        </div>

        <!-- Pinned / Sticky Interactive Canvas -->
        <div class="showcase-card spotlight-card" #showcaseCard (mousemove)="onMouseMove($event)" (mouseleave)="onMouseLeave()">
          
          <!-- Top Architecture Header -->
          <div class="stage-header">
            <div class="header-left">
              <div class="repo-badge">
                <span class="pulse-indicator"></span>
                <span>PRODUCTION SYSTEM · 5,000+ MAU</span>
              </div>
              <h3 class="stage-title">End-to-End Request &amp; Auth Pipeline</h3>
            </div>
            <div class="header-right">
              <button 
                class="simulate-btn magnetic-btn"
                [class.is-simulating]="isSimulating()"
                (click)="triggerSimulation()"
              >
                <span>{{ isSimulating() ? 'Dispatching Inbound Packet...' : '▶ Simulate Order Checkout' }}</span>
              </button>
            </div>
          </div>

          <!-- Interactive Pipeline Stages -->
          <div class="pipeline-grid">
            @for (step of steps; track step.stepNum; let i = $index) {
              <div 
                class="pipeline-node"
                [class.is-active]="activeStepIndex() === i || isSimulating()"
                [class.is-highlighted]="simulatedStep() === i"
                (click)="selectStep(i)"
              >
                <div class="node-header">
                  <span class="node-num">{{ step.stepNum }}</span>
                  <span class="node-badge">{{ step.badge }}</span>
                </div>
                <h4 class="node-name">{{ step.name }}</h4>
                <span class="node-role">{{ step.role }}</span>
                <p class="node-details">{{ step.details }}</p>
                
                @if (i < steps.length - 1) {
                  <div class="flow-arrow">⟶</div>
                }
              </div>
            }
          </div>

          <!-- Active Step Deep Dive & Live Code Inspector -->
          <div class="stage-inspector">
            <div class="inspector-header">
              <div class="tab-indicator">
                <span class="tab-label">ACTIVE SUB-SYSTEM:</span>
                <span class="tab-val">{{ currentStep.name }} ({{ currentStep.badge }})</span>
              </div>
              <div class="metrics-mini">
                <span class="metric-pill">+40% DB/API BOOST</span>
                <span class="metric-pill">2 PAYMENT GATEWAYS</span>
                <span class="metric-pill">80% FASTER CI/CD</span>
              </div>
            </div>

            <div class="code-viewport">
              <div class="code-header">
                <span class="code-dot red"></span>
                <span class="code-dot yellow"></span>
                <span class="code-dot green"></span>
                <span class="code-filename">bogEcom/server/middlewares/auth.js</span>
              </div>
              <pre class="code-block"><code>{{ currentStep.codeSnippet }}</code></pre>
            </div>
          </div>

          <!-- Card Footer Action -->
          <div class="stage-footer">
            <div class="footer-note">
              <span>Verified codebase running Next.js, Node.js, Express, MongoDB, and automated GitHub Actions CI/CD.</span>
            </div>
            <a routerLink="/work" fragment="bogecom" class="explore-link magnetic-btn">
              <span>Explore Complete BogEcom Deep-Dive in Work →</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .bogecom-stage-section {
      padding: 5.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      position: relative;
    }

    .content-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-top {
      margin-bottom: 3rem;
    }

    .section-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
    }

    .section-title {
      font-size: 2.3rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.8rem;
      letter-spacing: -0.02em;
    }

    .section-desc {
      font-size: 1rem;
      color: #8e8e9f;
      max-width: 760px;
      line-height: 1.6;
    }

    /* Main Showcase Card */
    .showcase-card {
      padding: 3rem;
      background: rgba(14, 14, 20, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 2.2rem;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
    }

    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 1.8rem;
    }

    .repo-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.25);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #93c5fd;
      margin-bottom: 0.6rem;
    }

    .pulse-indicator {
      width: 6px;
      height: 6px;
      background: #3b82f6;
      border-radius: 50%;
      box-shadow: 0 0 8px #3b82f6;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .stage-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: #ffffff;
    }

    .simulate-btn {
      background: #ffffff;
      color: #000000;
      padding: 0.75rem 1.6rem;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
    }

    .simulate-btn:hover {
      background: #e5e5d8;
    }

    .simulate-btn.is-simulating {
      background: #3b82f6;
      color: #ffffff;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }

    /* Pipeline 4-Step Grid */
    .pipeline-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
      position: relative;
    }

    .pipeline-node {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      cursor: pointer;
      position: relative;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .pipeline-node:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.18);
      transform: translateY(-3px);
    }

    .pipeline-node.is-active {
      border-color: rgba(59, 130, 246, 0.4);
      background: rgba(59, 130, 246, 0.05);
    }

    .pipeline-node.is-highlighted {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.25);
      transform: scale(1.02);
    }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .node-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      font-weight: 700;
      color: #3b82f6;
    }

    .node-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      color: #8e8e9f;
    }

    .node-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
    }

    .node-role {
      font-size: 0.78rem;
      font-family: 'JetBrains Mono', monospace;
      color: #93c5fd;
    }

    .node-details {
      font-size: 0.82rem;
      color: #8e8e9f;
      line-height: 1.5;
    }

    .flow-arrow {
      position: absolute;
      right: -14px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.2);
      z-index: 3;
    }

    /* Inspector & Code Section */
    .stage-inspector {
      background: #08080c;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      overflow: hidden;
    }

    .inspector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.6rem;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      flex-wrap: wrap;
      gap: 1rem;
    }

    .tab-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #8e8e9f;
      margin-right: 0.5rem;
    }

    .tab-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      color: #38bdf8;
      font-weight: 700;
    }

    .metrics-mini {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
    }

    .metric-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      background: rgba(0, 230, 118, 0.08);
      color: #00e676;
      border: 1px solid rgba(0, 230, 118, 0.2);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
    }

    .code-viewport {
      padding: 1.4rem;
    }

    .code-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 1rem;
    }

    .code-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .code-dot.red { background: #ef4444; }
    .code-dot.yellow { background: #f59e0b; }
    .code-dot.green { background: #10b981; }

    .code-filename {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #8e8e9f;
      margin-left: 0.6rem;
    }

    .code-block {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      color: #d1d5db;
      line-height: 1.6;
      overflow-x: auto;
    }

    /* Stage Footer */
    .stage-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 1.5rem;
    }

    .footer-note {
      font-size: 0.85rem;
      color: #8e8e9f;
    }

    .explore-link {
      color: #3b82f6;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
    }

    .explore-link:hover {
      color: #60a5fa;
    }

    @media (max-width: 1024px) {
      .pipeline-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .flow-arrow {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .showcase-card {
        padding: 1.6rem;
      }
      .pipeline-grid {
        grid-template-columns: 1fr;
      }
      .section-title {
        font-size: 1.8rem;
      }
      .stage-title {
        font-size: 1.3rem;
      }
      .stage-header, .stage-footer {
        flex-direction: column;
        align-items: flex-start;
      }
      .simulate-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class BogecomShowcaseComponent {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChild('showcaseCard') showcaseCardRef?: ElementRef<HTMLElement>;

  readonly activeStepIndex = signal<number>(1);
  readonly isSimulating = signal<boolean>(false);
  readonly simulatedStep = signal<number>(-1);

  readonly steps: ArchitectureStep[] = [
    {
      stepNum: '01',
      name: 'Client Layer',
      role: 'Next.js 14 SSR / SPA',
      badge: '5,000+ MAU',
      details: 'High-speed storefront rendering, responsive catalog state, and optimistic UI cart updates.',
      codeSnippet: `// bogEcom Client State Checkout Dispatch
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
      name: 'Auth Middleware',
      role: 'Dual Bearer & httpOnly',
      badge: 'CRYPTO VERIFIED',
      details: 'Inspects authorization headers and httpOnly cookies with HMAC secret rotation and token expiry.',
      codeSnippet: `// bogEcom/server/middlewares/auth.js
export const auth = async (req, res, next) => {
  let token = req.headers?.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7).trim()
    : req.cookies?.accessToken;

  if (!token) return res.status(401).json({ error: "Missing auth token" });

  try {
    const decoded = jwt.verify(token, getAccessTokenSecret());
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token payload" });
  }
};`
    },
    {
      stepNum: '03',
      name: 'RBAC Enforcement',
      role: 'Role Isolation Guard',
      badge: 'ACCESS CONTROL',
      details: 'Strict permission boundary verifying Customer, Vendor, and Admin authorization per route.',
      codeSnippet: `// bogEcom Role-Based Access Control Guard
export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ 
        error: "Forbidden: Insufficient privileges",
        required: allowedRoles,
        current: req.userRole 
      });
    }
    next();
  };
};`
    },
    {
      stepNum: '04',
      name: 'Order & DB Engine',
      role: 'ACID Transactional Lock',
      badge: 'POSTGRES / MONGO',
      details: 'Dual payment gateway settlement (Stripe/Razorpay) with inventory verification.',
      codeSnippet: `// bogEcom Transactional Order Settlement
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

  get currentStep(): ArchitectureStep {
    return this.steps[this.activeStepIndex()];
  }

  selectStep(index: number): void {
    this.activeStepIndex.set(index);
  }

  triggerSimulation(): void {
    if (this.isSimulating()) return;
    this.isSimulating.set(true);

    let current = 0;
    this.simulatedStep.set(0);
    this.activeStepIndex.set(0);

    const interval = setInterval(() => {
      current++;
      if (current < this.steps.length) {
        this.simulatedStep.set(current);
        this.activeStepIndex.set(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.simulatedStep.set(-1);
          this.isSimulating.set(false);
        }, 800);
      }
    }, 650);
  }

  onMouseMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || window.innerWidth < 768) return;
    if (!this.showcaseCardRef) return;
    const rect = this.showcaseCardRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.showcaseCardRef.nativeElement.style.setProperty('--mouse-x', `${x}px`);
    this.showcaseCardRef.nativeElement.style.setProperty('--mouse-y', `${y}px`);
  }

  onMouseLeave(): void {
    if (!this.showcaseCardRef) return;
    this.showcaseCardRef.nativeElement.style.removeProperty('--mouse-x');
    this.showcaseCardRef.nativeElement.style.removeProperty('--mouse-y');
  }
}
