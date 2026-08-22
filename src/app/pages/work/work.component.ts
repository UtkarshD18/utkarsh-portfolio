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
              Interactive architectural deep-dives with system data-flow diagrams, genuine codebases, and zoom-motion camera focus.
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
                      <a [href]="project.repoUrl" target="_blank" class="github-repo-pill liquid-glass">
                        <svg class="gh-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span>Verified Repository ↗</span>
                      </a>
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
                      <span>VERIFIED SCREENSHOT · HIGH RESOLUTION</span>
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
      color: #f5f5f7;
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
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
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
      color: #3b82f6;
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
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    .github-repo-pill:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
    .gh-icon {
      color: #ffffff;
      flex-shrink: 0;
    }
    .case-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
      margin-bottom: 0.4rem;
    }
    .case-sub {
      font-size: 1.1rem;
      color: #e5e5d8;
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      margin-bottom: 1rem;
    }
    .case-overview {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.75;
      margin-bottom: 1.5rem;
    }

    /* Architecture Flow Box */
    .arch-flow-box {
      margin: 1.8rem 0;
      background: #08080c;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .arch-flow-header {
      padding: 0.7rem 1.2rem;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      letter-spacing: 0.1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .scroll-hint {
      color: #8e8e9f;
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
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
      scrollbar-color: rgba(59, 130, 246, 0.4) transparent;
    }
    .arch-flow-content::-webkit-scrollbar {
      height: 6px;
    }
    .arch-flow-content::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.3);
    }
    .arch-flow-content::-webkit-scrollbar-thumb {
      background: rgba(59, 130, 246, 0.5);
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
      color: #00e676;
      white-space: pre;
      display: inline-block;
      min-width: max-content;
    }

    /* Resume Bullet Box */
    .bullet-points-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
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
      color: #3b82f6;
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
      color: #cfcfe1;
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
      color: #ffffff;
    }
    .chip-lbl {
      font-size: 0.75rem;
      color: #8e8e9f;
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
      background: linear-gradient(180deg, transparent 0%, rgba(7, 7, 9, 0.95) 100%);
      padding: 1rem 1.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
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
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #8e8e9f;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
    .tab-btn.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: #ffffff;
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
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
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
    // 1. B1GCRM
    {
      id: 'b1gcrm',
      number: '01',
      tag: 'REACT / NODE.JS / POSTGRESQL / LANGGRAPH / LANGCHAIN',
      repoUrl: 'https://github.com/UtkarshD18/B1G-CRM',
      title: 'B1GCRM — Enterprise Multi-Agent Architecture Project',
      subtitle: 'StateGraph-Based Routing · 98% Triage Accuracy · 208K+ LoC',
      imageUrl: '/assets/projects/b1gcrm-clean-flow.png',
      isB1gCrm: true,
      scrollDirection: 'left',
      overview: 'Self-driven enterprise multi-tenant CRM platform integrating LangGraph & LangChain multi-agent systems with real-time omni-channel messaging, PostgreSQL pgvector RAG semantic search, and an interactive React Flow automation builder.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'LangGraph', 'LangChain', 'pgvector (RAG)', 'Socket.io', 'React Flow', 'Zustand'],
      metrics: [
        { label: 'Prompt Tokens', value: '-45%' },
        { label: 'LLM Cost Reduction', value: '-30%' },
        { label: 'Routing Accuracy', value: '98%' },
        { label: 'Fallback Bridge', value: '5 ms' }
      ],
      architectureFlow: `┌─────────────────┐       ┌────────────────────────┐       ┌────────────────────────────────┐
│  Client Query   │ ────> │  Triage Router (State) │ ────> │ Support RAG (pgvector Cosine)  │
│ (WhatsApp/Insta)│       │ (98% Routing Accuracy) │       │ Sales Specialist (CRM Pipeline)│
└─────────────────┘       └────────────────────────┘       │ SQL Order Tracker (PostgreSQL) │
                                      │                    └────────────────────────────────┘
                                      ▼                                     │
                          ┌────────────────────────┐                        ▼
                          │ 5ms Fallback Boundary  │ ─────────────> ┌───────────────────────┐
                          │  (Deterministic SQL)   │                │ Omni-Channel Response │
                          └────────────────────────┘                └───────────────────────┘`,
      bulletPoints: [
        'Agentic Orchestration: Architected a StateGraph-based multi-agent routing system with LangGraph and LangChain, cutting synthesis prompt token size by 45% and LLM API costs by 30%.',
        'Query Triage: Built a Triage Router directing client queries to specialist agents (Support RAG, Sales, SQL Order Tracker) with 98% routing accuracy, eliminating order-status hallucinations via direct PostgreSQL retrieval.',
        'Resiliency: Engineered a self-healing multi-agent architecture with try/catch fallback boundaries and a 5ms fallback bridge, ensuring 100% message delivery reliability.',
        'Context Optimization: Tuned conversation memory with a sliding 5-message window and 800-character truncation guard, preventing token overflow while preserving order metadata.',
        'RAG Knowledge Base: Developed a RAG knowledge base using PostgreSQL pgvector for secure, AI-powered semantic document search and retrieval.',
        'Omni-Channel Architecture: Architected a multi-tenant platform (React, Node.js, PostgreSQL, Socket.io) with real-time WhatsApp/Instagram integrations, contributing 208K+ lines of code across the full stack.',
        'Visual Flow Builder: Built a visual automation flow builder (React Flow, Zustand); optimized backend with raw SQL and indexing, cutting campaign execution time by 90%; implemented RBAC and shipped 30+ automated integration tests.'
      ],
      snippets: [
        {
          id: 'b1g_stategraph',
          tabLabel: 'LangGraph StateGraph Routing',
          title: 'StateGraph Multi-Agent Query Routing Pipeline',
          explanation: 'Routes user queries across Support RAG, Sales, and SQL Order Tracker specialist agents using LangGraph state graphs.',
          language: 'python',
          code: `# LangGraph StateGraph Multi-Agent Triage Router
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    query: str
    tenant_id: str
    selected_agent: str
    response: str
    metadata: dict

def triage_router(state: AgentState):
    query = state["query"].lower()
    if any(k in query for k in ["order", "status", "tracking", "invoice"]):
        return "sql_order_tracker"
    elif any(k in query for k in ["pricing", "buy", "quote", "discount"]):
        return "sales_agent"
    return "support_rag"

workflow = StateGraph(AgentState)
workflow.add_node("triage", triage_router)
workflow.add_node("support_rag", execute_rag_search)
workflow.add_node("sql_order_tracker", execute_sql_retrieval)
workflow.add_conditional_edges("triage", lambda x: x["selected_agent"])
graph = workflow.compile()`
        },
        {
          id: 'b1g_pgvector',
          tabLabel: 'pgvector RAG Search',
          title: 'PostgreSQL pgvector Embedding Similarity Search',
          explanation: 'Performs cosine distance vector similarity queries against chunked enterprise knowledge bases.',
          language: 'sql',
          code: `-- PostgreSQL pgvector Cosine Similarity Search
SELECT 
    document_chunks.id,
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
          id: 'b1g_resiliency',
          tabLabel: '5ms Self-Healing Bridge',
          title: 'Self-Healing Fallback Boundary with 5ms Bridge',
          explanation: 'Ensures 100% message delivery reliability by intercepting LLM timeouts and falling back to cached heuristic routing.',
          language: 'typescript',
          code: `// Self-Healing Multi-Agent Fallback Bridge (5ms target)
export async function executeAgentWithFallback(query: string, tenantId: string): Promise<AgentResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s circuit breaker

    const agentResult = await invokeLangGraphWorkflow({ query, tenantId }, { signal: controller.signal });
    clearTimeout(timeoutId);
    return agentResult;
  } catch (err) {
    // 5ms Instant Deterministic Fallback Bridge
    return await executeDeterministicSQLFallback(query, tenantId);
  }
}`
        }
      ]
    },

    // 2. BogEcom
    {
      id: 'bogecom',
      number: '02',
      tag: 'MERN / NEXT.JS / FIREBASE / GCP / GITHUB ACTIONS',
      repoUrl: 'https://github.com/UtkarshD18/bogEcom',
      title: 'BogEcom — Production E-Commerce Platform',
      subtitle: '5,000+ MAU · 2 Payment Gateways · +40% API/DB Performance',
      imageUrl: '/assets/projects/desktop-home.png',
      scrollDirection: 'right',
      overview: 'Production-deployed e-commerce platform serving 5,000+ monthly active users. Features 2 integrated payment gateways, JWT authentication with Role-Based Access Control (RBAC), and automated CI/CD pipelines via GitHub Actions.',
      tags: ['Next.js', 'React', 'Node.js', 'Firebase', 'GCP', 'JWT Auth', 'RBAC', 'GitHub Actions'],
      metrics: [
        { label: 'Active Users', value: '5,000+ MAU' },
        { label: 'Performance Boost', value: '+40% DB/API' },
        { label: 'CI/CD Speedup', value: '80% Faster' },
        { label: 'Payment Gateways', value: '2 Integrated' }
      ],
      architectureFlow: `┌──────────────────┐       ┌────────────────────────┐       ┌────────────────────────────────┐
│ Next.js Client   │ ────> │ JWT Auth Middleware    │ ────> │ RBAC Role Enforcer (Customer/  │
│ (5,000+ MAU)     │       │ (Bearer & httpOnly)    │       │ Admin / Warehouse Staff)       │
└──────────────────┘       └────────────────────────┘       └────────────────────────────────┘
                                                                            │
                                                                            ▼
                                                            ┌────────────────────────────────┐
                                                            │ Payment Gateways (Stripe/Razor)│
                                                            │ MongoDB Cluster / Cloudinary   │
                                                            └────────────────────────────────┘`,
      bulletPoints: [
        'Developed and deployed a production e-commerce platform with 5,000+ MAU; integrated 2 payment gateways with JWT auth and RBAC, improving API/DB performance by 40%.',
        'Automated CI/CD with GitHub Actions, cutting deployment time by 80% and resolving 100+ production/testing issues.'
      ],
      snippets: [
        {
          id: 'bogecom_auth',
          tabLabel: 'JWT Bearer & Cookie Middleware',
          title: 'Production JWT Authentication & Header/Cookie Parser',
          explanation: 'Genuine bogEcom authentication middleware verifying cryptographic tokens across Authorization headers and httpOnly cookies with secret rotation.',
          language: 'javascript',
          code: `// bogEcom/server/middlewares/auth.js — Production Auth Middleware
import jwt from "jsonwebtoken";
import { getAccessTokenSecret } from "../config/authSecrets.js";

export const auth = async (req, res, next) => {
  let token = null;
  // Support Bearer authorization header
  if (req.headers?.authorization?.toLowerCase().startsWith("bearer ")) {
    token = req.headers.authorization.slice(7).trim();
  }
  // Support secure httpOnly accessToken cookie fallback
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Please provide token", error: true, success: false });
  }

  try {
    const decoded = jwt.verify(token, getAccessTokenSecret());
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: true, success: false });
  }
};`
        }
      ]
    },

    // 3. MediaForge AI
    {
      id: 'mediaforge',
      number: '03',
      tag: 'PYTHON / FFMPEG / SQLITE / PYSIDE6 (QT6) / UNIX SOCKETS',
      repoUrl: 'https://github.com/UtkarshD18/MediaForge',
      title: 'MediaForge AI — Automated Media Transcoding Daemon',
      subtitle: 'Thread-Isolated Daemon · Peak RAM < 73MB · SHA256 Deduplication',
      scrollDirection: 'left',
      overview: 'Thread-isolated background media transcoding daemon with a filesystem watchdog, SQLite-backed FIFO job queue, Unix Domain Socket IPC, and worker-thread pool for concurrent, non-blocking video segmentation.',
      tags: ['Python', 'FFmpeg', 'SQLite', 'PySide6 (Qt6)', 'Unix Sockets', 'AsyncIO'],
      metrics: [
        { label: 'Peak RAM Usage', value: '< 73 MB' },
        { label: 'Concurrent Files', value: '100 Files' },
        { label: 'Duplicate Lookups', value: 'O(1) SHA256' },
        { label: 'Job Queue', value: 'SQLite FIFO' }
      ],
      architectureFlow: `┌──────────────────┐       ┌────────────────────────┐       ┌────────────────────────────────┐
│ File Drop / Watch│ ────> │ SQLite FIFO Queue      │ ────> │ Transcode Worker Thread        │
│ (Local Media)    │       │ (ACID, Thread-Isolated)│       │ (FFmpeg Subprocess, <73MB RAM) │
└──────────────────┘       └────────────────────────┘       └────────────────────────────────┘
                                                                            │
                                                                            ▼
                                                            ┌────────────────────────────────┐
                                                            │ SHA256 Deduplication Table     │
                                                            │ Unix Socket IPC -> PySide6 UI  │
                                                            └────────────────────────────────┘`,
      bulletPoints: [
        'Independently designed a thread-isolated background daemon with a filesystem watchdog, SQLite-backed FIFO job queue, Unix Domain Socket IPC, and a worker-thread pool for concurrent, non-blocking processing.',
        'Built wrapper classes with automated GPU detection/CPU fallback and SHA256-based duplicate detection (O(1) lookups); stress-tested against 100 concurrent files, peak RAM under 73MB.'
      ],
      snippets: [
        {
          id: 'mediaforge_daemon',
          tabLabel: 'Thread-Isolated Daemon',
          title: 'SQLite FIFO Job Queue with Worker-Thread Pool',
          explanation: 'Manages asynchronous video processing jobs with thread-isolated queues and automatic GPU acceleration fallback.',
          language: 'python',
          code: `# Python Worker-Thread Daemon with GPU/CPU Fallback
import sqlite3, subprocess, hashlib, os

class TranscodingDaemon:
    def __init__(self, db_path="queue.db"):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self._init_db()

    def _init_db(self):
        with self.conn:
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS job_queue (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    file_path TEXT NOT NULL,
                    sha256_hash TEXT UNIQUE,
                    status TEXT DEFAULT 'PENDING'
                )
            """)`
        }
      ]
    },

    // 4. Data Structure Visualizer
    {
      id: 'dsvisualizer',
      number: '04',
      tag: 'TYPESCRIPT / TREE-SITTER / BABEL / MERMAID.JS / D3.JS',
      repoUrl: 'https://github.com/UtkarshD18/DS-visualizer',
      title: 'Data Structure Visualizer — VS Code Extension',
      subtitle: 'Step-by-Step Algorithm Animation · 92.8% Test Success',
      scrollDirection: 'right',
      overview: 'Full-featured VS Code extension for real-time visualization of arrays, trees, and linked lists with step-by-step algorithm animation, multi-language AST-based parsing, variable tracking, and breakpoints.',
      tags: ['TypeScript', 'Tree-sitter', 'Babel', 'D3.js', 'Mermaid.js', 'VS Code API'],
      metrics: [
        { label: 'Test Success', value: '92.8%' },
        { label: 'Automated Tests', value: '69 Tests' },
        { label: 'Parsers', value: 'Tree-sitter / Babel' },
        { label: 'Visuals', value: 'D3.js & Mermaid' }
      ],
      bulletPoints: [
        'Built a full-featured extension for real-time visualization of arrays, trees, and linked lists with step-by-step algorithm animation, multi-language AST-based parsing, variable tracking, and breakpoints; achieved 92.8% test success across 69 automated tests.'
      ],
      snippets: [
        {
          id: 'ds_ast',
          tabLabel: 'Tree-sitter AST Parser',
          title: 'Multi-Language AST Node Extraction',
          explanation: 'Traverses dynamic abstract syntax trees to construct live visual representations of heap and stack memory.',
          language: 'typescript',
          code: `// Tree-sitter AST Memory Graph Parser
export function parseDataStructureAST(rootNode: SyntaxNode): GraphModel {
  const nodes: NodeModel[] = [];
  const links: LinkModel[] = [];

  for (let i = 0; i < rootNode.childCount; i++) {
    const child = rootNode.child(i)!;
    if (child.type === 'variable_declaration') {
      nodes.push({ id: child.id, label: child.text });
    }
  }
  return { nodes, links };
}`
        }
      ]
    },

    // 5. Two-Way Sync
    {
      id: 'twowaysync',
      number: '05',
      tag: 'PYTHON / REST APIS / AUTOMATION',
      repoUrl: 'https://github.com/UtkarshD18/automation_testing_trello',
      title: 'Two-Way Sync: Airtable ↔ Trello',
      subtitle: 'Idempotent Logic · 0 Duplicate Cards · 70%+ Sync Error Reduction',
      scrollDirection: 'left',
      overview: 'Automated synchronization engine eliminating 80–90% of manual updates by auto-creating and updating Trello tasks from Airtable leads via REST APIs with idempotent verification and auto-healing deleted card flows.',
      tags: ['Python', 'REST APIs', 'Airtable API', 'Trello API', 'Idempotency'],
      metrics: [
        { label: 'Manual Work Cut', value: '80–90%' },
        { label: 'Duplicate Cards', value: '0 Duplicates' },
        { label: 'Error Reduction', value: '70%+' },
        { label: 'Data Consistency', value: '100%' }
      ],
      bulletPoints: [
        'Built an automated synchronization engine eliminating 80–90% of manual updates by auto-creating and updating Trello tasks from Airtable leads via REST APIs.',
        'Designed idempotent logic ensuring 0 duplicate cards, with auto-healing flows to recreate deleted Trello cards, maintaining 100% data consistency and cutting sync errors by 70%+.'
      ],
      snippets: [
        {
          id: 'sync_idempotent',
          tabLabel: 'Idempotent Sync Engine',
          title: 'REST API Two-Way Synchronization with Auto-Healing',
          explanation: 'Validates unique task hashes to guarantee 0 duplicate cards and auto-recreates deleted boards.',
          language: 'python',
          code: `# Python Idempotent Two-Way Sync Engine
import requests

def sync_airtable_to_trello(airtable_record, trello_list_id, api_key, api_token):
    lead_id = airtable_record["id"]
    existing_cards = requests.get(f"https://api.trello.com/1/lists/{trello_list_id}/cards", params={"key": api_key, "token": api_token}).json()

    matched_card = next((c for c in existing_cards if lead_id in c["desc"]), None)
    if matched_card:
        # Idempotent update
        requests.put(f"https://api.trello.com/1/cards/{matched_card['id']}", json={"name": airtable_record["fields"]["Name"]})
    else:
        # Create fresh card with auto-healing hash
        requests.post("https://api.trello.com/1/cards", json={"idList": trello_list_id, "name": airtable_record["fields"]["Name"], "desc": f"LeadID: {lead_id}"})`
        }
      ]
    },

    // 6. Summitly
    {
      id: 'summitly',
      number: '06',
      tag: 'MERN / REACT + VITE / REST APIS',
      repoUrl: 'https://github.com/UtkarshD18/Summitly',
      title: 'Summitly — Full-Stack Event Management Platform',
      subtitle: '20+ Events Supported · 10+ Dynamic Pages · 100+ Ticket Records',
      scrollDirection: 'right',
      overview: 'Full-stack event platform supporting 20+ events with secure JWT login across 10+ dynamic pages and a ticketing system managing 100+ ticket records, backed by scalable REST APIs across 3 core data models.',
      tags: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      metrics: [
        { label: 'Events Supported', value: '20+ Events' },
        { label: 'Dynamic Pages', value: '10+ Pages' },
        { label: 'Ticket Records', value: '100+ Tickets' },
        { label: 'Data Models', value: '3 Core Models' }
      ],
      bulletPoints: [
        'Built a full-stack event platform supporting 20+ events with secure JWT login across 10+ dynamic pages and a ticketing system managing 100+ ticket records, backed by scalable REST APIs across 3 core data models.'
      ],
      snippets: [
        {
          id: 'summitly_ticketing',
          tabLabel: 'Ticket Booking Controller',
          title: 'ACID-Compliant Event Ticket Booking Controller',
          explanation: 'Manages ticket booking quotas with transactional safety.',
          language: 'javascript',
          code: `// Summitly Event Ticket Reservation Controller
export async function bookEventTicket(req, res) {
  const { eventId, ticketCount } = req.body;
  const event = await Event.findById(eventId);
  if (!event || event.availableTickets < ticketCount) {
    return res.status(400).json({ error: "Insufficient ticket capacity" });
  }

  event.availableTickets -= ticketCount;
  await event.save();
  const ticket = await Ticket.create({ eventId, userId: req.user.id, count: ticketCount });
  return res.status(201).json({ success: true, ticket });
}`
        }
      ]
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
