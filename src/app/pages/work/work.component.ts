import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';

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
  tag: string;
  title: string;
  subtitle: string;
  overview: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  snippets: CodeSnippet[];
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent, FooterComponent],
  template: `
    <div class="page-viewport">
      <app-navigation></app-navigation>

      <main class="work-stage">
        <div class="content-container">
          <!-- Page Header -->
          <div class="page-header">
            <span class="page-kicker">[ CASE STUDIES &amp; ARCHITECTURE ]</span>
            <h1 class="page-title">Systems Engineering &amp; Platform Architecture</h1>
            <p class="page-subtitle">
              In-depth technical breakdowns of low-level WebAssembly engines, distributed cloud media pipelines, and interactive 3D WebGL shaders.
            </p>
          </div>

          <!-- Project 1: C++ WebAssembly Combat Engine -->
          <section class="case-study-card liquid-glass">
            <div class="case-header">
              <div class="case-meta">
                <span class="case-badge">01 · LOW-LATENCY SYSTEMS</span>
                <h2 class="case-title">{{ projectCombat.title }}</h2>
                <p class="case-subtitle">{{ projectCombat.subtitle }}</p>
                <p class="case-desc">{{ projectCombat.overview }}</p>
              </div>

              <div class="case-metrics">
                @for (m of projectCombat.metrics; track m.label) {
                  <div class="metric-chip liquid-glass">
                    <span class="chip-val">{{ m.value }}</span>
                    <span class="chip-lbl">{{ m.label }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Tech Pills -->
            <div class="tech-pills-row">
              @for (tag of projectCombat.tags; track tag) {
                <span class="tech-pill">{{ tag }}</span>
              }
            </div>

            <!-- Interactive Architecture Deep Dive Tabs -->
            <div class="interactive-deepdive">
              <div class="deepdive-nav">
                <span class="nav-label">INSPECT CODE SUBSYSTEMS:</span>
                <div class="tabs-list">
                  @for (snip of projectCombat.snippets; track snip.id) {
                    <button
                      class="tab-btn"
                      [class.active]="activeCombatSnippet().id === snip.id"
                      (click)="activeCombatSnippet.set(snip)"
                    >
                      {{ snip.tabLabel }}
                    </button>
                  }
                </div>
              </div>

              <div class="deepdive-view">
                <div class="view-explanation">
                  <h3>{{ activeCombatSnippet().title }}</h3>
                  <p>{{ activeCombatSnippet().explanation }}</p>
                </div>

                <div class="code-window">
                  <div class="code-header">
                    <div class="window-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <span class="filename">{{ activeCombatSnippet().tabLabel }}.cpp</span>
                    <span class="lang">{{ activeCombatSnippet().language }}</span>
                  </div>
                  <pre class="code-content"><code>{{ activeCombatSnippet().code }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- Project 2: MediaForge Cloud Platform -->
          <section class="case-study-card liquid-glass mt-16">
            <div class="case-header">
              <div class="case-meta">
                <span class="case-badge">02 · DISTRIBUTED CLOUD SERVICES</span>
                <h2 class="case-title">{{ projectMediaForge.title }}</h2>
                <p class="case-subtitle">{{ projectMediaForge.subtitle }}</p>
                <p class="case-desc">{{ projectMediaForge.overview }}</p>
              </div>

              <div class="case-metrics">
                @for (m of projectMediaForge.metrics; track m.label) {
                  <div class="metric-chip liquid-glass">
                    <span class="chip-val">{{ m.value }}</span>
                    <span class="chip-lbl">{{ m.label }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Tech Pills -->
            <div class="tech-pills-row">
              @for (tag of projectMediaForge.tags; track tag) {
                <span class="tech-pill">{{ tag }}</span>
              }
            </div>

            <!-- Interactive Architecture Deep Dive Tabs -->
            <div class="interactive-deepdive">
              <div class="deepdive-nav">
                <span class="nav-label">INSPECT CODE SUBSYSTEMS:</span>
                <div class="tabs-list">
                  @for (snip of projectMediaForge.snippets; track snip.id) {
                    <button
                      class="tab-btn"
                      [class.active]="activeMediaForgeSnippet().id === snip.id"
                      (click)="activeMediaForgeSnippet.set(snip)"
                    >
                      {{ snip.tabLabel }}
                    </button>
                  }
                </div>
              </div>

              <div class="deepdive-view">
                <div class="view-explanation">
                  <h3>{{ activeMediaForgeSnippet().title }}</h3>
                  <p>{{ activeMediaForgeSnippet().explanation }}</p>
                </div>

                <div class="code-window">
                  <div class="code-header">
                    <div class="window-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <span class="filename">{{ activeMediaForgeSnippet().tabLabel }}.ts</span>
                    <span class="lang">{{ activeMediaForgeSnippet().language }}</span>
                  </div>
                  <pre class="code-content"><code>{{ activeMediaForgeSnippet().code }}</code></pre>
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
    .work-stage {
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

    /* Case Study Card */
    .case-study-card {
      border-radius: 18px;
      padding: 3.5rem;
    }
    .mt-16 { margin-top: 4.5rem; }
    .case-header {
      display: grid;
      grid-template-columns: 1.8fr 1fr;
      gap: 3rem;
      align-items: flex-start;
      margin-bottom: 2rem;
    }
    .case-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: block;
    }
    .case-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
      margin-bottom: 0.4rem;
    }
    .case-subtitle {
      font-size: 1.1rem;
      color: #e5e5d8;
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      margin-bottom: 1rem;
    }
    .case-desc {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.75;
    }
    .case-metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
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
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
    }
    .chip-lbl {
      font-size: 0.75rem;
      color: #8e8e9f;
    }
    .tech-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-bottom: 2.5rem;
    }
    .tech-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: #f5f5f7;
    }

    /* Interactive Deep-Dive */
    .interactive-deepdive {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 2rem;
    }
    .deepdive-nav {
      margin-bottom: 2rem;
    }
    .nav-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
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
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #8e8e9f;
      padding: 0.55rem 1.2rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-family: 'JetBrains Mono', monospace;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn.active {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      font-weight: 700;
    }
    .tab-btn:hover:not(.active) {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
    .deepdive-view {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      gap: 2.5rem;
      align-items: flex-start;
    }
    .view-explanation h3 {
      font-size: 1.35rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.8rem;
    }
    .view-explanation p {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.75;
    }

    /* Code Window */
    .code-window {
      background: #0b0b0f;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      overflow: hidden;
    }
    .code-header {
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
    .window-dots span:nth-child(1) { background: #ff5f56; }
    .window-dots span:nth-child(2) { background: #ffbd2e; }
    .window-dots span:nth-child(3) { background: #27c93f; }
    .filename {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8e8e9f;
    }
    .lang {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      text-transform: uppercase;
    }
    .code-content {
      padding: 1.4rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      line-height: 1.7;
      color: #d1d5db;
      overflow-x: auto;
      white-space: pre-wrap;
    }

    @media (max-width: 1024px) {
      .page-title { font-size: 2.8rem; }
      .case-header { grid-template-columns: 1fr; }
      .deepdive-view { grid-template-columns: 1fr; }
    }
  `]
})
export class WorkComponent {
  readonly projectCombat: ProjectCaseStudy = {
    id: 'combat_engine',
    tag: 'C++20 / WebAssembly / WebGL',
    title: 'Deterministic C++ & WebAssembly Combat Engine',
    subtitle: 'Zero-Copy Linear Memory Physics at 60 FPS',
    overview: 'Engineered a deterministic physics and combat simulation compiled from C++20 to WebAssembly. Features sub-frame 70ms parry detection calculation, zero-copy linear float memory buffer streaming to Three.js vertex shaders, and deterministic collision math with 0ms garbage-collection pauses.',
    tags: ['C++20', 'WebAssembly', 'Three.js GLSL', 'Emscripten', 'Fixed-Point Math'],
    metrics: [
      { label: 'GC Heap Pauses', value: '0 ms' },
      { label: 'Parry Time Window', value: '70 ms' },
      { label: 'Frame Consistency', value: '60 FPS' },
      { label: 'Memory Footprint', value: '< 2.4 MB' }
    ],
    snippets: [
      {
        id: 'memory_stream',
        tabLabel: 'Zero-Copy Memory Buffer',
        title: 'Direct WASM Linear Memory Buffer Streaming',
        explanation: 'Reads memory offsets directly from WebAssembly HEAPF32 into Three.js Float32BufferAttributes without allocating intermediate JavaScript objects.',
        language: 'cpp',
        code: `// C++20 WASM Memory Alignment & Linear Buffer
#include <emscripten/emscripten.h>

struct alignas(16) CombatEntityState {
    float position[3];
    float velocity[3];
    float hitboxRadius;
    uint32_t stanceFlags; // 70ms Parry Detection bitmask
};

static CombatEntityState g_Entities[MAX_COMBATANTS];

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    float* get_entity_buffer_offset() {
        return reinterpret_cast<float*>(g_Entities);
    }
}`
      },
      {
        id: 'parry_detection',
        tabLabel: '70ms Parry Math',
        title: 'Deterministic Collision & Parry Window Math',
        explanation: 'Calculates capsule-to-capsule proximity to detect clash strikes within the sub-frame 70ms deflection window.',
        language: 'cpp',
        code: `// Deterministic Capsule Proximity & Clash Detection
bool DetectParryWindow(const CombatEntityState& attacker, const CombatEntityState& defender) {
    if (!(defender.stanceFlags & PARRY_ACTIVE_BIT)) return false;

    float dx = attacker.position[0] - defender.position[0];
    float dy = attacker.position[1] - defender.position[1];
    float dz = attacker.position[2] - defender.position[2];
    float distSq = dx*dx + dy*dy + dz*dz;

    float collisionRadius = attacker.hitboxRadius + defender.hitboxRadius;
    return distSq <= (collisionRadius * collisionRadius);
}`
      },
      {
        id: 'glsl_shaders',
        tabLabel: 'GLSL Terrain Shader',
        title: 'Three.js Vertex Displacement Shaders',
        explanation: 'Custom GLSL vertex shader creating dynamic ground fissure shockwaves triggered upon weapon clashes.',
        language: 'glsl',
        code: `// Three.js Custom Ground Fissure Vertex Shader
uniform float uTime;
uniform vec3 uClashOrigin;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 displacedPosition = position;
    float dist = distance(position.xz, uClashOrigin.xz);
    if (dist < 4.0) {
        displacedPosition.y += sin(dist * 3.0 - uTime * 8.0) * 0.45;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}`
      }
    ]
  };

  readonly projectMediaForge: ProjectCaseStudy = {
    id: 'mediaforge',
    tag: 'Angular 18 / Redis / PostgreSQL',
    title: 'MediaForge — Distributed Media & Workflow Platform',
    subtitle: 'Event-Driven Microservices with Redis & PostgreSQL',
    overview: 'High-throughput cloud architecture designed for asynchronous media encoding, idempotent webhook ingestion, Redis cache stampede prevention, and streaming AWS S3 asset deliveries with 99.99% availability.',
    tags: ['Angular 18', 'TypeScript', 'Redis', 'PostgreSQL', 'Docker', 'AWS S3'],
    metrics: [
      { label: 'System Uptime', value: '99.99%' },
      { label: 'Throughput', value: '50k req/min' },
      { label: 'Cache Hit Ratio', value: '94.2%' },
      { label: 'P99 API Latency', value: '< 18 ms' }
    ],
    snippets: [
      {
        id: 'redis_cache',
        tabLabel: 'Redis Cache Layer',
        title: 'Stampede-Safe In-Memory Cache Wrapper',
        explanation: 'Guarantees cache freshness while preventing concurrent cache stampedes using atomic distributed locks.',
        language: 'typescript',
        code: `// Redis Cache Wrapper with Stampede Prevention
export async function getOrSetCache<T>(key: string, ttlSeconds: number, fetchFn: () => Promise<T>): Promise<T> {
  const cached = await redisClient.get(key);
  if (cached) return JSON.parse(cached) as T;

  const lockAcquired = await redisClient.set(\`lock:\${key}\`, '1', 'EX', 5, 'NX');
  if (!lockAcquired) {
    await new Promise(res => setTimeout(res, 50));
    return getOrSetCache(key, ttlSeconds, fetchFn);
  }

  try {
    const result = await fetchFn();
    await redisClient.set(key, JSON.stringify(result), 'EX', ttlSeconds);
    return result;
  } finally {
    await redisClient.del(\`lock:\${key}\`);
  }
}`
      },
      {
        id: 'idempotent_webhooks',
        tabLabel: 'Idempotent Webhooks',
        title: 'ACID Transactional Webhook Handlers',
        explanation: 'Ensures external events (payments, notifications) are handled exactly once under heavy concurrent load.',
        language: 'typescript',
        code: `// Idempotent Webhook Handler with Drizzle Transactions
export async function processIdempotentWebhook(event: WebhookEvent) {
  return await db.transaction(async (tx) => {
    const existing = await tx.query.processedEvents.findFirst({
      where: eq(processedEvents.id, event.id)
    });
    if (existing) return { status: 'ALREADY_PROCESSED' };

    await tx.insert(processedEvents).values({
      id: event.id,
      eventType: event.type,
      processedAt: new Date()
    });

    await handleDomainEvent(tx, event);
    return { status: 'SUCCESS' };
  });
}`
      }
    ]
  };

  readonly activeCombatSnippet = signal<CodeSnippet>(this.projectCombat.snippets[0]);
  readonly activeMediaForgeSnippet = signal<CodeSnippet>(this.projectMediaForge.snippets[0]);
}
