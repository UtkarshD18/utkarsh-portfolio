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
  number: string;
  tag: string;
  repoUrl: string;
  title: string;
  subtitle: string;
  overview: string;
  tags: string[];
  imageUrl?: string;
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
            <span class="page-kicker">[ PRODUCTION CODE &amp; ARCHITECTURE ]</span>
            <h1 class="page-title">Systems Engineering &amp; Production Codebases</h1>
            <p class="page-subtitle">
              Detailed technical architecture, code subsystems, and real production engineering metrics across open-source repositories.
            </p>
          </div>

          <!-- Project Showcase Cards -->
          @for (project of projects; track project.id) {
            <section class="case-study-card liquid-glass" [id]="project.id">
              <div class="case-header">
                <div class="case-meta">
                  <div class="meta-badge-row">
                    <span class="case-badge">{{ project.number }} · {{ project.tag }}</span>
                    <a [href]="project.repoUrl" target="_blank" class="repo-link">
                      GitHub Repository ↗
                    </a>
                  </div>
                  <h2 class="case-title">{{ project.title }}</h2>
                  <p class="case-subtitle">{{ project.subtitle }}</p>
                  <p class="case-desc">{{ project.overview }}</p>
                </div>

                <div class="case-metrics">
                  @for (m of project.metrics; track m.label) {
                    <div class="metric-chip liquid-glass">
                      <span class="chip-val">{{ m.value }}</span>
                      <span class="chip-lbl">{{ m.label }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Real Project Screenshot / Visual Evidence -->
              @if (project.imageUrl) {
                <div class="project-image-container">
                  <img [src]="project.imageUrl" [alt]="project.title" class="project-image" />
                  <div class="image-overlay-caption">
                    <span>LIVE UI/UX PREVIEW · PRODUCTION BUILD</span>
                  </div>
                </div>
              }

              <!-- Tech Pills -->
              <div class="tech-pills-row">
                @for (tag of project.tags; track tag) {
                  <span class="tech-pill">{{ tag }}</span>
                }
              </div>

              <!-- Interactive Architecture Deep Dive Tabs -->
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
                    <pre class="code-content"><code>{{ getActiveSnippet(project.id).code }}</code></pre>
                  </div>
                </div>
              </div>
            </section>
          }
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
      margin-bottom: 4rem;
    }
    .case-header {
      display: grid;
      grid-template-columns: 1.8fr 1fr;
      gap: 3rem;
      align-items: flex-start;
      margin-bottom: 2rem;
    }
    .meta-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
    }
    .case-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.12em;
    }
    .repo-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .repo-link:hover {
      background: #ffffff;
      color: #000000;
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

    /* Project Image Preview */
    .project-image-container {
      margin: 1.5rem 0 2.5rem;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      position: relative;
      background: #0d0d12;
    }
    .project-image {
      width: 100%;
      height: 380px;
      object-fit: cover;
      object-position: top;
      display: block;
      transition: transform 0.4s ease;
    }
    .project-image-container:hover .project-image {
      transform: scale(1.02);
    }
    .image-overlay-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(180deg, transparent 0%, rgba(7, 7, 9, 0.95) 100%);
      padding: 1rem 1.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
      letter-spacing: 0.15em;
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

    /* Deep Dive */
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
      .project-image { height: 260px; }
    }
  `]
})
export class WorkComponent {
  readonly projects: ProjectCaseStudy[] = [
    // 1. B1G-CRM
    {
      id: 'b1gcrm',
      number: '01',
      tag: 'REACT / NODE.JS / POSTGRESQL (PGVECTOR) / SOCKET.IO',
      repoUrl: 'https://github.com/UtkarshD18/B1G-CRM',
      title: 'B1G-CRM — Enterprise Omni-Channel Multi-Tenant Platform',
      subtitle: '208K+ Lines of Code · Real-Time Automation & pgvector RAG',
      overview: 'Architected and developed a multi-tenant, omni-channel CRM platform contributing 208K+ lines of code across React, Node.js, and PostgreSQL. Features real-time event-driven messaging with Socket.io, a visual automation workflow builder with React Flow and Zustand, a pgvector RAG knowledge base for semantic document search, and raw SQL query optimization reducing campaign execution time by 90%.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'pgvector (RAG)', 'Socket.io', 'React Flow', 'Zustand', 'RBAC'],
      metrics: [
        { label: 'Lines of Code', value: '208k+' },
        { label: 'Query Speedup', value: '90%' },
        { label: 'Integration Tests', value: '30+ Tests' },
        { label: 'Architecture', value: 'Multi-Tenant' }
      ],
      snippets: [
        {
          id: 'b1g_rag',
          tabLabel: 'pgvector RAG Search',
          title: 'PostgreSQL pgvector Embedding Distance Query',
          explanation: 'Executes cosine distance vector similarity queries against chunked enterprise knowledge bases for sub-second retrieval augmented generation.',
          language: 'sql',
          code: `// PostgreSQL (pgvector) Cosine Similarity Search
SELECT 
    document_chunks.id,
    document_chunks.document_id,
    document_chunks.content,
    1 - (document_chunks.embedding <=> $1::vector) AS similarity_score
FROM document_chunks
JOIN tenant_documents ON tenant_documents.id = document_chunks.document_id
WHERE tenant_documents.tenant_id = $2
  AND 1 - (document_chunks.embedding <=> $1::vector) > 0.75
ORDER BY similarity_score DESC
LIMIT 5;`
        },
        {
          id: 'b1g_automation',
          tabLabel: 'React Flow Engine',
          title: 'Visual Automation Workflow Evaluator',
          explanation: 'Evaluates dynamic conditional branching graph nodes in conversational WhatsApp and email marketing workflows.',
          language: 'typescript',
          code: `// React Flow Node Execution Engine
export async function executeWorkflowNode(node: WorkflowNode, context: ExecutionContext): Promise<NodeResult> {
  switch (node.type) {
    case 'TRIGGER_WHATSAPP_MSG':
      return await dispatchWhatsAppMessage(context.contact, node.data.templateId);
    case 'AI_INTENT_CLASSIFY':
      const intent = await classifyCustomerIntent(context.lastMessage);
      return { nextNodeId: node.data.routes[intent] || node.data.fallbackRoute };
    case 'UPDATE_LEAD_STATUS':
      await db.update(leads).set({ stage: node.data.targetStage }).where(eq(leads.id, context.leadId));
      return { success: true };
  }
}`
        }
      ]
    },

    // 2. bogEcom Enterprise
    {
      id: 'bogecom',
      number: '02',
      tag: 'JAVA 21 / SPRING BOOT 3.4 / SPRING SECURITY / MYSQL',
      repoUrl: 'https://github.com/UtkarshD18/bogecom-enterprise',
      title: 'bogEcom Enterprise — Java 21 Modular Monolith Backend',
      subtitle: '1,200 Req/Sec Throughput · JPA @Version Optimistic Locking',
      imageUrl: 'assets/projects/desktop-home.png',
      overview: 'Migrated legacy MERN stack e-commerce backend to high-performance Java 21 & Spring Boot 3.4 modular monolith. Boosted concurrent API throughput by 35% (handling up to 1,200 req/sec) using HikariCP connection pooling, enforced stateless JWT security, and prevented checkout overselling via JPA Optimistic Locking (@Version). Validated with 20+ Testcontainers integration tests.',
      tags: ['Java 21', 'Spring Boot 3.4', 'Spring Security', 'JWT', 'MySQL', 'HikariCP', 'Testcontainers', 'JPA'],
      metrics: [
        { label: 'Throughput', value: '1,200 req/s' },
        { label: 'Throughput Boost', value: '+35%' },
        { label: 'Inventory Safety', value: '100% Locked' },
        { label: 'Testcontainers', value: '20+ Suites' }
      ],
      snippets: [
        {
          id: 'jpa_locking',
          tabLabel: 'JPA @Version Locking',
          title: 'Concurrency-Safe Stock Deduct via Optimistic Locking',
          explanation: 'Uses JPA @Version field to prevent race conditions and overselling when hundreds of customers checkout the same inventory item simultaneously.',
          language: 'java',
          code: `// Java 21 / Spring Boot 3.4 Optimistic Locking
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    private Long version; // Optimistic lock counter

    @Column(nullable = false)
    private Integer stockQuantity;

    public void deductStock(int quantity) {
        if (this.stockQuantity < quantity) {
            throw new InsufficientStockException("Out of stock for product ID: " + this.id);
        }
        this.stockQuantity -= quantity;
    }
}`
        },
        {
          id: 'jwt_security',
          tabLabel: 'Spring Security JWT',
          title: 'Stateless JWT Filter & Token Verification',
          explanation: 'Stateless Spring Security filter chain with public route whitelisting and instant token claim validation.',
          language: 'java',
          code: `// Spring Security 6.x Stateless JWT Filter
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }
        String jwt = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(request, response);
    }
}`
        }
      ]
    },

    // 3. MediaForge
    {
      id: 'mediaforge',
      number: '03',
      tag: 'PYTHON / FASTMCP / FFMPEG / REDIS / S3',
      repoUrl: 'https://github.com/UtkarshD18/MediaForge',
      title: 'MediaForge — Automated Video Production & AI Clipping Suite',
      subtitle: 'v0.1.0-rc1 Release · Asynchronous Subprocess Rendering',
      overview: 'Engineered an automated video processing suite utilizing Python, FastMCP, and hardware-accelerated FFmpeg subprocess pipelines. Automatically segments long-form content, synthesizes animated captions, and synchronizes assets to cloud storage with atomic Redis cache locks.',
      tags: ['Python', 'FastMCP', 'FFmpeg', 'Redis', 'AWS S3', 'AsyncIO'],
      metrics: [
        { label: 'Milestone', value: 'v0.1.0-rc1' },
        { label: 'Rendering', value: 'Hardware Accel' },
        { label: 'Locking', value: 'Atomic Redis' },
        { label: 'Protocol', value: 'FastMCP' }
      ],
      snippets: [
        {
          id: 'ffmpeg_pipeline',
          tabLabel: 'FFmpeg Pipeline',
          title: 'Asynchronous Hardware-Accelerated Video Segmentation',
          explanation: 'Subprocess wrapper executing two-pass video encoding with hardware NVENC/VAAPI acceleration and animated subtitle burns.',
          language: 'python',
          code: `# Python FastMCP Subprocess Video Splitter
import asyncio, subprocess

async def render_video_short(source_path: str, start_time: float, duration: float, output_path: str):
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start_time),
        "-t", str(duration),
        "-i", source_path,
        "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
        "-c:v", "libx264", "-preset", "fast",
        "-c:a", "aac", "-b:a", "192k",
        output_path
    ]
    process = await asyncio.create_subprocess_exec(*cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = await process.communicate()
    if process.returncode != 0:
        raise RuntimeError(f"FFmpeg render error: {stderr.decode()}")
    return output_path`
        }
      ]
    },

    // 4. Data Structure Visualizer
    {
      id: 'dsvisualizer',
      number: '04',
      tag: 'TYPESCRIPT / VS CODE EXTENSION API / TREE-SITTER / D3.JS',
      repoUrl: 'https://github.com/UtkarshD18/DS-visualizer',
      title: 'Data Structure Visualizer — VS Code Extension',
      subtitle: '92.8% Test Success Across 69 Automated Test Suites',
      overview: 'Developed a VS Code extension for real-time data structure AST parsing and dynamic visual graph rendering using Tree-sitter, Babel Parser, Mermaid.js, and D3.js. Features live memory graph generation for trees, heaps, and linked lists during active debug sessions.',
      tags: ['TypeScript', 'VS Code API', 'Tree-sitter', 'Babel', 'D3.js', 'Mermaid.js'],
      metrics: [
        { label: 'Test Success', value: '92.8%' },
        { label: 'Automated Tests', value: '69 Suites' },
        { label: 'AST Parsers', value: 'Tree-sitter' },
        { label: 'Rendering', value: 'D3.js / SVG' }
      ],
      snippets: [
        {
          id: 'ast_parser',
          tabLabel: 'Tree-sitter AST Parser',
          title: 'Real-Time Memory Hierarchy Node Extraction',
          explanation: 'Traverses abstract syntax trees to identify pointer linkages and array heap allocations on the fly.',
          language: 'typescript',
          code: `// Tree-sitter AST Linked List Linkage Parser
export function extractMemoryNodes(astRoot: SyntaxNode): GraphData {
  const nodes: VisualNode[] = [];
  const edges: VisualEdge[] = [];

  const cursor = astRoot.walk();
  let hasNext = true;
  while (hasNext) {
    if (cursor.nodeType === 'variable_declarator' && cursor.nodeText.includes('next')) {
      edges.push({ from: cursor.currentNode().id, to: cursor.currentNode().targetId });
    }
    hasNext = cursor.gotoNextSibling() || cursor.gotoParent();
  }
  return { nodes, edges };
}`
        }
      ]
    }
  ];

  private activeSnippetsState = new Map<string, CodeSnippet>();

  constructor() {
    this.projects.forEach(p => {
      this.activeSnippetsState.set(p.id, p.snippets[0]);
    });
  }

  getActiveSnippet(projectId: string): CodeSnippet {
    return this.activeSnippetsState.get(projectId) || this.projects.find(p => p.id === projectId)!.snippets[0];
  }

  setActiveSnippet(projectId: string, snippet: CodeSnippet): void {
    this.activeSnippetsState.set(projectId, snippet);
  }
}
