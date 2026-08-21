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
            <span>Software Engineer · B.Tech CSE (2022-2026) · New Delhi / Jaipur</span>
          </div>

          <!-- Bold Kinetic Typography Headline -->
          <h1 class="hero-heading">
            I engineer <span class="highlight-blue">scalable backends</span>, <span class="highlight-sand">distributed systems</span> &amp; modern web interfaces.
          </h1>

          <p class="hero-subtext">
            Software engineer with expertise in Java 21, Spring Boot 3.4, React/Node.js, PostgreSQL (pgvector RAG), and low-latency C++ WebAssembly architectures.
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
              <span>Contact ✉</span>
            </a>
          </div>

          <!-- Key Metrics Grid from Resume -->
          <div class="metrics-ribbon">
            <div class="metric-box liquid-glass">
              <span class="metric-val">208k+</span>
              <span class="metric-label">Lines of Code (B1G-CRM Enterprise)</span>
            </div>
            <div class="metric-box liquid-glass">
              <span class="metric-val">1,200</span>
              <span class="metric-label">Req/Sec (Java 21 Spring Boot Monolith)</span>
            </div>
            <div class="metric-box liquid-glass">
              <span class="metric-val">90%</span>
              <span class="metric-label">Campaign Query Execution Speedup</span>
            </div>
            <div class="metric-box liquid-glass">
              <span class="metric-val">350+</span>
              <span class="metric-label">LeetCode Algorithmic Problems Solved</span>
            </div>
          </div>
        </div>
      </main>

      <!-- Section: Featured Works Preview -->
      <section class="featured-section">
        <div class="content-container">
          <div class="section-top">
            <span class="section-tag">[ 01 · FEATURED PROJECTS ]</span>
            <h2 class="section-title">Verified Production Repositories</h2>
            <p class="section-desc">
              Real codebases with live databases, concurrency locks, RAG search, and automated tests.
            </p>
          </div>

          <div class="featured-grid">
            <!-- 1. B1G-CRM -->
            <div class="project-card liquid-glass">
              <div class="card-meta">
                <span class="category-tag">ENTERPRISE CRM / REACT / NODE.JS</span>
                <span class="status-tag">208K+ LINES</span>
              </div>
              <h3 class="card-title">B1G-CRM — Omni-Channel Multi-Tenant Platform</h3>
              <p class="card-desc">
                Multi-tenant CRM with real-time Socket.io messaging, React Flow visual automation engine, and pgvector RAG semantic document search.
              </p>
              <div class="card-pills">
                <span class="pill">React</span>
                <span class="pill">Node.js</span>
                <span class="pill">PostgreSQL</span>
                <span class="pill">pgvector</span>
                <span class="pill">Socket.io</span>
                <span class="pill">React Flow</span>
              </div>
              <div class="card-footer">
                <a routerLink="/work" fragment="b1gcrm" class="card-link">View Architecture &amp; Code →</a>
              </div>
            </div>

            <!-- 2. bogEcom Enterprise -->
            <div class="project-card liquid-glass">
              <div class="card-meta">
                <span class="category-tag">JAVA 21 / SPRING BOOT 3.4 / MYSQL</span>
                <span class="status-tag">1,200 REQ/SEC</span>
              </div>
              <h3 class="card-title">bogEcom Enterprise — Modular Monolith</h3>
              <p class="card-desc">
                High-performance e-commerce backend with HikariCP connection pooling (+35% throughput boost), Spring Security stateless JWTs, and JPA optimistic locking.
              </p>
              <div class="card-pills">
                <span class="pill">Java 21</span>
                <span class="pill">Spring Boot 3.4</span>
                <span class="pill">Spring Security</span>
                <span class="pill">MySQL</span>
                <span class="pill">HikariCP</span>
                <span class="pill">Testcontainers</span>
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
