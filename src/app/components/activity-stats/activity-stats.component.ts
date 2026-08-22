import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-section">
      <!-- Header -->
      <div class="activity-header">
        <span class="activity-kicker">[ 02 · VERIFIED ACTIVITY &amp; REPOSITORIES ]</span>
        <h2 class="activity-title">Live GitHub Contributions &amp; Coding Profiles</h2>
        <p class="activity-desc">
          Live snapshot mapped directly from GitHub and verified DSA profiles on LeetCode &amp; Naukri Code360.
        </p>
      </div>

      <div class="activity-grid">
        <!-- 1. Live GitHub Contributions Card -->
        <div class="stats-card liquid-glass">
          <div class="card-top">
            <div class="card-brand">
              <svg class="icon-svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <div>
                <a href="https://github.com/UtkarshD18" target="_blank" class="brand-link">
                  GitHub · UtkarshD18 ↗
                </a>
                <span class="user-handle">github.com/UtkarshD18</span>
              </div>
            </div>
            <a href="https://github.com/UtkarshD18?tab=repositories" target="_blank" class="total-badge">
              11 Public Repositories
            </a>
          </div>

          <!-- Live GitHub Contribution Heatmap SVG -->
          <div class="gh-chart-container">
            <div class="chart-scroll">
              <img
                src="https://ghchart.rshah.org/3b82f6/UtkarshD18"
                alt="UtkarshD18 GitHub Contributions Graph"
                class="gh-live-svg"
                loading="lazy"
              />
            </div>
            <span class="chart-caption">LIVE SYNCHRONIZED COMMITS VIA GITHUB GRAPHQL API</span>
          </div>

          <!-- Verified Repositories Quick Links -->
          <div class="github-metrics-row">
            <a href="https://github.com/UtkarshD18/B1G-CRM" target="_blank" class="metric-item">
              <span class="val">B1G-CRM</span>
              <span class="lbl">Multi-Agent CRM · 208K+ LoC</span>
            </a>
            <a href="https://github.com/UtkarshD18/bogEcom" target="_blank" class="metric-item">
              <span class="val">BogEcom</span>
              <span class="lbl">5,000+ MAU E-Commerce</span>
            </a>
            <a href="https://github.com/UtkarshD18/MediaForge" target="_blank" class="metric-item">
              <span class="val">MediaForge</span>
              <span class="lbl">FFmpeg Transcoding Daemon</span>
            </a>
            <a href="https://github.com/UtkarshD18/DS-visualizer" target="_blank" class="metric-item">
              <span class="val">DS-Visualizer</span>
              <span class="lbl">VS Code Extension API</span>
            </a>
          </div>
        </div>

        <!-- 2. Coding Profiles: LeetCode & Naukri Code360 -->
        <div class="stats-card liquid-glass">
          <div class="card-top">
            <div class="card-brand">
              <div class="leetcode-icon">DSA</div>
              <div>
                <a href="https://leetcode.com/u/UtkarshD18/" target="_blank" class="brand-link">
                  LeetCode &amp; Naukri Code360 ↗
                </a>
                <span class="user-handle">LeetCode · Naukri Code360</span>
              </div>
            </div>
            <a href="https://leetcode.com/u/UtkarshD18/" target="_blank" class="streak-badge">
              Verified Profiles
            </a>
          </div>

          <!-- Problems Solved Progress Circle -->
          <div class="leetcode-breakdown">
            <div class="solved-circle-container">
              <div class="total-solved-num">100+</div>
              <div class="total-solved-label">DSA Solved</div>
            </div>

            <div class="profile-details">
              <div class="profile-row">
                <span class="prof-name">Data Structures &amp; Algorithms:</span>
                <span class="prof-val">100+ Problems Across Platforms</span>
              </div>
              <div class="profile-row">
                <span class="prof-name">Core Focus:</span>
                <span class="prof-val">Trees, Graphs, Dynamic Programming, Heaps</span>
              </div>
              <div class="profile-row">
                <span class="prof-name">CS Fundamentals:</span>
                <span class="prof-val">DBMS, Operating Systems, Computer Networks</span>
              </div>
            </div>
          </div>

          <!-- Algorithmic Patterns Solved -->
          <div class="recent-submissions">
            <span class="sub-header">PROVEN ALGORITHMIC COMPETENCIES</span>
            <div class="sub-list">
              <div class="sub-row">
                <div class="sub-main">
                  <span class="sub-title">StateGraph Multi-Agent Routing &amp; Triage</span>
                  <span class="diff-pill pill-medium">LangGraph</span>
                </div>
                <span class="speed-badge">98% Accuracy</span>
              </div>

              <div class="sub-row">
                <div class="sub-main">
                  <span class="sub-title">pgvector Cosine Distance Search</span>
                  <span class="diff-pill pill-hard">PostgreSQL</span>
                </div>
                <span class="speed-badge">Sub-Second RAG</span>
              </div>

              <div class="sub-row">
                <div class="sub-main">
                  <span class="sub-title">Tree-sitter AST Multi-Language Parsing</span>
                  <span class="diff-pill pill-easy">TypeScript</span>
                </div>
                <span class="speed-badge">69 Test Suites</span>
              </div>

              <div class="sub-row">
                <div class="sub-main">
                  <span class="sub-title">Idempotent Two-Way Lead Sync Engine</span>
                  <span class="diff-pill pill-medium">Python REST</span>
                </div>
                <span class="speed-badge">0 Duplicates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .activity-section {
      padding: 5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .activity-header {
      margin-bottom: 3rem;
    }
    .activity-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(0.65rem, 2.5vw, 0.75rem);
      color: #3b82f6;
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
      white-space: nowrap;
    }
    .activity-title {
      font-size: clamp(1.8rem, 5vw, 2.3rem);
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.8rem;
      letter-spacing: -0.02em;
    }
    .activity-desc {
      font-size: 1rem;
      color: #8e8e9f;
      max-width: 680px;
    }

    /* Grid */
    .activity-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .stats-card {
      border-radius: 16px;
      padding: 2.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.8rem;
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .card-brand {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .brand-link {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      text-decoration: none;
      display: block;
      transition: color 0.2s ease;
    }
    .brand-link:hover {
      color: #3b82f6;
    }
    .user-handle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8e8e9f;
    }
    .total-badge, .streak-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      color: #f5f5f7;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .total-badge:hover, .streak-badge:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }
    .streak-badge {
      border-color: rgba(59, 130, 246, 0.4);
      color: #3b82f6;
    }

    /* Live GitHub Chart */
    .gh-chart-container {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      background: rgba(0, 0, 0, 0.35);
      padding: 1.2rem;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .chart-scroll {
      overflow-x: auto;
      width: 100%;
    }
    .gh-live-svg {
      width: 100%;
      min-width: 540px;
      height: auto;
      display: block;
      filter: invert(1) hue-rotate(180deg) brightness(0.95);
    }
    .chart-caption {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      color: #5c5c6d;
      letter-spacing: 0.12em;
    }

    /* Metrics Row */
    .github-metrics-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.4rem;
    }
    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      text-decoration: none;
      padding: 0.6rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      transition: all 0.2s ease;
    }
    .metric-item:hover {
      background: rgba(255, 255, 255, 0.06);
      transform: translateY(-2px);
    }
    .metric-item .val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
    }
    .metric-item .lbl {
      font-size: 0.72rem;
      color: #8e8e9f;
    }

    /* LeetCode & Code360 */
    .leetcode-icon {
      width: 32px;
      height: 32px;
      background: #3b82f6;
      color: #ffffff;
      border-radius: 6px;
      font-weight: 900;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'JetBrains Mono', monospace;
    }
    .leetcode-breakdown {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 2rem;
      align-items: center;
    }
    .solved-circle-container {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 3px solid #3b82f6;
      background: rgba(59, 130, 246, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .total-solved-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.6rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
    }
    .total-solved-label {
      font-size: 0.65rem;
      color: #8e8e9f;
      margin-top: 0.2rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .profile-details {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .profile-row {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .prof-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
    }
    .prof-val {
      font-size: 0.85rem;
      color: #f5f5f7;
      font-weight: 600;
    }

    /* Submissions / Competencies */
    .recent-submissions {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.2rem;
    }
    .sub-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      color: #8e8e9f;
      margin-bottom: 0.8rem;
      display: block;
    }
    .sub-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .sub-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }
    .sub-main {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .sub-title {
      font-size: 0.82rem;
      color: #f5f5f7;
      font-weight: 500;
    }
    .diff-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      padding: 0.1rem 0.45rem;
      border-radius: 4px;
    }
    .pill-easy { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
    .pill-medium { background: rgba(0, 230, 118, 0.15); color: #00e676; }
    .pill-hard { background: rgba(255, 192, 30, 0.15); color: #ffc01e; }
    .speed-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
    }

    @media (max-width: 1024px) {
      .activity-grid { grid-template-columns: 1fr; }
      .github-metrics-row { grid-template-columns: 1fr; }
    }

    @media (max-width: 768px) {
      .stats-card {
        padding: 1.5rem 1.2rem;
        box-sizing: border-box;
      }
      .card-top {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
      }
      .profile-top-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.2rem;
      }
      .sub-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3rem;
      }
      .gh-chart-container {
        overflow-x: auto;
        max-width: 100%;
      }
    }
  `]
})
export class ActivityStatsComponent {}
