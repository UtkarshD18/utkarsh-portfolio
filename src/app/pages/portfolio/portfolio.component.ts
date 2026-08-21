import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivityStatsComponent } from '../../components/activity-stats/activity-stats.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent, FooterComponent, ActivityStatsComponent],
  template: `
    <div class="page-viewport">
      <!-- Universal Navigation -->
      <app-navigation></app-navigation>

      <!-- Hero Stage -->
      <main class="hero-stage">
        <div class="hero-container">
          <!-- Availability Pill -->
          <div class="status-pill liquid-glass">
            <span class="status-dot"></span>
            <span>AI / ML Developer &amp; Backend Engineer · B.Tech CSE (2026)</span>
          </div>

          <!-- Bold Kinetic Typography Headline -->
          <h1 class="hero-heading">
            I engineer <span class="highlight-blue">multi-agent AI pipelines</span> &amp; <span class="highlight-sand">scalable backends</span>.
          </h1>

          <p class="hero-subtext">
            B.Tech CSE student specializing in StateGraph-based multi-agent routing with LangGraph/LangChain, PostgreSQL pgvector RAG semantic search, and full-stack production systems.
          </p>

          <!-- Hero Action CTAs -->
          <div class="hero-cta-row">
            <a routerLink="/work" class="primary-btn">
              <span>View Production Codebases →</span>
            </a>
            <a href="https://github.com/UtkarshD18" target="_blank" class="secondary-btn liquid-glass">
              <span>GitHub (12 Repos) ↗</span>
            </a>
            <a href="https://www.linkedin.com/in/utkarsh-dwivedi-01489524b/" target="_blank" class="secondary-btn liquid-glass">
              <span>LinkedIn Profile ↗</span>
            </a>
            <a routerLink="/contact" class="secondary-btn liquid-glass">
              <span>Get In Touch ✉</span>
            </a>
          </div>

          <!-- Key Metrics Grid from Resume -->
          <div class="metrics-ribbon">
            <div class="metric-box liquid-glass">
              <span class="metric-val">-45%</span>
              <span class="metric-label">Prompt Token Reduction (LangGraph)</span>
            </div>
            <div class="metric-box liquid-glass">
              <span class="metric-val">98%</span>
              <span class="metric-label">Multi-Agent Triage Routing Accuracy</span>
            </div>
            <div class="metric-box liquid-glass">
              <span class="metric-val">5,000+</span>
              <span class="metric-label">Monthly Active Users (BogEcom)</span>
            </div>
            <div class="metric-box liquid-glass">
              <span class="metric-val">100+</span>
              <span class="metric-label">DSA Solved (LeetCode &amp; Code360)</span>
            </div>
          </div>
        </div>
      </main>

      <!-- Section: Featured Works Preview -->
      <section class="featured-section">
        <div class="content-container">
          <div class="section-top">
            <span class="section-tag">[ 01 · FEATURED REPOSITORIES ]</span>
            <h2 class="section-title">Verified Production Systems</h2>
            <p class="section-desc">
              StateGraph multi-agent routing, pgvector RAG search, and full-stack production platforms.
            </p>
          </div>

          <div class="featured-grid">
            <!-- 1. B1GCRM -->
            <div class="project-card liquid-glass">
              <div class="card-meta">
                <span class="category-tag">MULTI-AGENT AI / LANGGRAPH / PGVECTOR</span>
                <span class="status-tag">208K+ LINES</span>
              </div>
              <h3 class="card-title">B1GCRM — Multi-Agent Enterprise Platform</h3>
              <p class="card-desc">
                StateGraph-based multi-agent routing system with LangGraph &amp; LangChain (cutting prompt tokens by 45% &amp; costs by 30%), 98% triage accuracy to specialist agents, PostgreSQL pgvector RAG knowledge base, and React Flow visual automation.
              </p>
              <div class="card-pills">
                <span class="pill">LangGraph</span>
                <span class="pill">LangChain</span>
                <span class="pill">pgvector</span>
                <span class="pill">React</span>
                <span class="pill">Node.js</span>
                <span class="pill">Socket.io</span>
              </div>
              <div class="card-footer">
                <a routerLink="/work" fragment="b1gcrm" class="card-link">View Architecture &amp; Code →</a>
              </div>
            </div>

            <!-- 2. BogEcom -->
            <div class="project-card liquid-glass">
              <div class="card-meta">
                <span class="category-tag">PRODUCTION E-COMMERCE / NEXT.JS / GCP</span>
                <span class="status-tag">5,000+ MAU</span>
              </div>
              <h3 class="card-title">BogEcom — Production E-Commerce Platform</h3>
              <p class="card-desc">
                Production-deployed e-commerce platform with 5,000+ MAU, 2 integrated payment gateways with JWT auth &amp; RBAC (+40% API/DB boost), and automated GitHub Actions CI/CD (80% faster deployments).
              </p>
              <div class="card-pills">
                <span class="pill">Next.js</span>
                <span class="pill">React</span>
                <span class="pill">Firebase</span>
                <span class="pill">GCP</span>
                <span class="pill">JWT Auth</span>
                <span class="pill">GitHub Actions</span>
              </div>
              <div class="card-footer">
                <a routerLink="/work" fragment="bogecom" class="card-link">View Architecture &amp; Code →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: GitHub & LeetCode Activity Metrics -->
      <section class="activity-wrapper">
        <div class="content-container">
          <app-activity-stats></app-activity-stats>
        </div>
      </section>

      <!-- Universal Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-viewport {
      min-height: 100vh;
      background: #070709;
      color: #f5f5f7;
    }
    .hero-stage {
      padding: 6.5rem 0 5rem;
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
      padding: 0.4rem 1rem;
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
      font-size: 4.2rem;
      font-weight: 800;
      line-height: 1.12;
      letter-spacing: -0.03em;
      max-width: 1050px;
      margin-bottom: 1.8rem;
      color: #ffffff;
    }
    .highlight-blue {
      color: #3b82f6;
    }
    .highlight-sand {
      color: #e5e5d8;
      font-family: 'Instrument Serif', serif;
      font-style: italic;
      font-weight: 400;
    }
    .hero-subtext {
      font-size: 1.2rem;
      color: #8e8e9f;
      max-width: 760px;
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
      transition: all 0.25s ease;
    }
    .primary-btn:hover {
      background: #e5e5d8;
      transform: translateY(-2px);
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
      transform: translateY(-2px);
    }
    .metrics-ribbon {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
    }
    .metric-box {
      padding: 1.8rem 1.6rem;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .metric-val {
      font-size: 2rem;
      font-weight: 800;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: -0.03em;
    }
    .metric-label {
      font-size: 0.8rem;
      color: #8e8e9f;
    }

    /* Featured Section */
    .featured-section {
      padding: 6rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .section-top {
      margin-bottom: 3.5rem;
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
      font-size: 2.4rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.8rem;
      letter-spacing: -0.02em;
    }
    .section-desc {
      font-size: 1rem;
      color: #8e8e9f;
      max-width: 620px;
    }
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .project-card {
      padding: 2.6rem;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5rem;
      transition: all 0.3s ease;
    }
    .project-card:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .category-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
      letter-spacing: 0.1em;
    }
    .status-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      color: #8e8e9f;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.2rem 0.55rem;
      border-radius: 4px;
    }
    .card-title {
      font-size: 1.55rem;
      font-weight: 700;
      color: #ffffff;
    }
    .card-desc {
      font-size: 0.95rem;
      color: #8e8e9f;
      line-height: 1.7;
    }
    .card-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .pill {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: #f5f5f7;
    }
    .card-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.2rem;
    }
    .card-link {
      color: #ffffff;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    .card-link:hover {
      color: #3b82f6;
    }

    @media (max-width: 1024px) {
      .hero-heading { font-size: 3.2rem; }
      .metrics-ribbon { grid-template-columns: repeat(2, 1fr); }
      .featured-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PortfolioComponent {}
