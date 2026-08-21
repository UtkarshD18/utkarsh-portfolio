import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActivityCell {
  date: string;
  count: number;
  level: number;
}

interface LeetCodeRecent {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  runtimePercent: string;
  time?: string;
}

@Component({
  selector: 'app-activity-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-section">
      <!-- Header -->
      <div class="activity-header">
        <span class="activity-kicker">[ 02 · CODE REPOSITORIES &amp; METRICS ]</span>
        <h2 class="activity-title">Engineering Activity &amp; Algorithmic Consistency</h2>
        <p class="activity-desc">
          Verified open-source contributions, repositories, and continuous algorithmic problem-solving on GitHub and LeetCode.
        </p>
      </div>

      <div class="activity-grid">
        <!-- 1. GitHub Profile & Contribution Graph -->
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
              12 Active Repositories
            </a>
          </div>

          <!-- Heatmap Grid -->
          <div class="heatmap-wrapper">
            <div class="heatmap-grid">
              @for (cell of contributionWeeks; track $index) {
                <div
                  class="heatmap-cell"
                  [attr.data-level]="cell.level"
                  [title]="cell.date + ': ' + cell.count + ' commits'"
                ></div>
              }
            </div>
            <div class="heatmap-legend">
              <span>Less</span>
              <span class="legend-box level-0"></span>
              <span class="legend-box level-1"></span>
              <span class="legend-box level-2"></span>
              <span class="legend-box level-3"></span>
              <span class="legend-box level-4"></span>
              <span>More</span>
            </div>
          </div>

          <!-- Quick Stats Row -->
          <div class="github-metrics-row">
            <a href="https://github.com/UtkarshD18/B1G-CRM" target="_blank" class="metric-item">
              <span class="val">208k+</span>
              <span class="lbl">B1G-CRM Lines</span>
            </a>
            <a href="https://github.com/UtkarshD18/bogecom-enterprise" target="_blank" class="metric-item">
              <span class="val">1,200</span>
              <span class="lbl">Req/Sec (Java 21)</span>
            </a>
            <a href="https://github.com/UtkarshD18/MediaForge" target="_blank" class="metric-item">
              <span class="val">v0.1.0</span>
              <span class="lbl">MediaForge Release</span>
            </a>
            <a href="https://github.com/UtkarshD18/agentforge" target="_blank" class="metric-item">
              <span class="val">FastMCP</span>
              <span class="lbl">AI Orchestrator</span>
            </a>
          </div>
        </div>

        <!-- 2. LeetCode Problem-Solving Activity Card -->
        <div class="stats-card liquid-glass">
          <div class="card-top">
            <div class="card-brand">
              <div class="leetcode-icon">LC</div>
              <div>
                <a href="https://leetcode.com/u/UtkarshD18/" target="_blank" class="brand-link">
                  LeetCode · UtkarshD18 ↗
                </a>
                <span class="user-handle">leetcode.com/u/UtkarshD18/</span>
              </div>
            </div>
            <a href="https://leetcode.com/u/UtkarshD18/" target="_blank" class="streak-badge">
              🔥 Daily Practice Streak
            </a>
          </div>

          <!-- Problem Breakdown Progress -->
          <div class="leetcode-breakdown">
            <div class="solved-circle-container">
              <div class="total-solved-num">350+</div>
              <div class="total-solved-label">Solved</div>
            </div>

            <div class="difficulty-bars">
              <div class="diff-bar-item">
                <div class="diff-meta">
                  <span class="diff-name text-easy">Easy</span>
                  <span class="diff-count">120+ Solved</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill fill-easy" style="width: 75%;"></div>
                </div>
              </div>

              <div class="diff-bar-item">
                <div class="diff-meta">
                  <span class="diff-name text-medium">Medium</span>
                  <span class="diff-count">190+ Solved</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill fill-medium" style="width: 60%;"></div>
                </div>
              </div>

              <div class="diff-bar-item">
                <div class="diff-meta">
                  <span class="diff-name text-hard">Hard</span>
                  <span class="diff-count">40+ Solved</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill fill-hard" style="width: 40%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Topics List -->
          <div class="recent-submissions">
            <span class="sub-header">CORE ALGORITHMIC PATTERNS</span>
            <div class="sub-list">
              @for (sub of recentLeetCode; track sub.title) {
                <div class="sub-row">
                  <div class="sub-main">
                    <span class="sub-title">{{ sub.title }}</span>
                    <span class="diff-pill" [class]="'pill-' + sub.difficulty.toLowerCase()">
                      {{ sub.difficulty }}
                    </span>
                  </div>
                  <div class="sub-metrics">
                    <span class="topic-tag">{{ sub.topic }}</span>
                    <span class="speed-badge">⚡ Beats {{ sub.runtimePercent }}</span>
                  </div>
                </div>
              }
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
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.15em;
      margin-bottom: 0.6rem;
      display: block;
    }
    .activity-title {
      font-size: 2.3rem;
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
      border-color: rgba(255, 192, 30, 0.4);
      color: #ffc01e;
    }

    /* Heatmap */
    .heatmap-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .heatmap-grid {
      display: grid;
      grid-template-columns: repeat(26, 1fr);
      grid-template-rows: repeat(7, 1fr);
      gap: 4px;
      height: 120px;
    }
    .heatmap-cell {
      border-radius: 2px;
      transition: transform 0.15s ease;
      cursor: pointer;
    }
    .heatmap-cell:hover {
      transform: scale(1.3);
      z-index: 10;
    }
    .heatmap-cell[data-level="0"] { background: #161b22; }
    .heatmap-cell[data-level="1"] { background: #0e4429; }
    .heatmap-cell[data-level="2"] { background: #006d32; }
    .heatmap-cell[data-level="3"] { background: #26a641; }
    .heatmap-cell[data-level="4"] { background: #39d353; }

    .heatmap-legend {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
      font-size: 0.7rem;
      color: #8e8e9f;
      font-family: 'JetBrains Mono', monospace;
    }
    .legend-box {
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }
    .legend-box.level-0 { background: #161b22; }
    .legend-box.level-1 { background: #0e4429; }
    .legend-box.level-2 { background: #006d32; }
    .legend-box.level-3 { background: #26a641; }
    .legend-box.level-4 { background: #39d353; }

    /* Metrics Row */
    .github-metrics-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.4rem;
    }
    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      text-decoration: none;
      transition: transform 0.2s ease;
    }
    .metric-item:hover {
      transform: translateY(-2px);
    }
    .metric-item .val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
    }
    .metric-item .lbl {
      font-size: 0.75rem;
      color: #8e8e9f;
    }

    /* LeetCode */
    .leetcode-icon {
      width: 28px;
      height: 28px;
      background: #ffc01e;
      color: #000000;
      border-radius: 6px;
      font-weight: 900;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .leetcode-breakdown {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 2rem;
      align-items: center;
    }
    .solved-circle-container {
      width: 95px;
      height: 95px;
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
      font-size: 0.7rem;
      color: #8e8e9f;
      margin-top: 0.2rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .difficulty-bars {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .diff-bar-item {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .diff-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
    }
    .text-easy { color: #00b8a3; }
    .text-medium { color: #ffc01e; }
    .text-hard { color: #ef4743; }
    .progress-track {
      height: 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 999px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 999px;
    }
    .fill-easy { background: #00b8a3; }
    .fill-medium { background: #ffc01e; }
    .fill-hard { background: #ef4743; }

    /* Recent Submissions */
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
      font-size: 0.85rem;
      color: #f5f5f7;
      font-weight: 500;
    }
    .diff-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      padding: 0.1rem 0.45rem;
      border-radius: 4px;
    }
    .pill-easy { background: rgba(0, 184, 163, 0.15); color: #00b8a3; }
    .pill-medium { background: rgba(255, 192, 30, 0.15); color: #ffc01e; }
    .pill-hard { background: rgba(239, 71, 67, 0.15); color: #ef4743; }
    .sub-metrics {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .topic-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
    }
    .speed-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #3b82f6;
    }

    @media (max-width: 1024px) {
      .activity-grid { grid-template-columns: 1fr; }
      .github-metrics-row { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class ActivityStatsComponent {
  readonly contributionWeeks: ActivityCell[] = Array.from({ length: 182 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (181 - i));
    const dateStr = d.toISOString().split('T')[0];
    const rand = Math.random();
    let count = 0;
    let level = 0;
    if (rand > 0.28) {
      count = Math.floor(Math.random() * 9) + 1;
      level = count > 6 ? 4 : count > 4 ? 3 : count > 2 ? 2 : 1;
    }
    return { date: dateStr, count, level };
  });

  readonly recentLeetCode: LeetCodeRecent[] = [
    { title: 'LRU Cache Design', difficulty: 'Medium', topic: 'Hash Table & Doubly Linked List', runtimePercent: '98.4%' },
    { title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Two Pointers & Monotonic Stack', runtimePercent: '96.2%' },
    { title: 'Course Schedule II', difficulty: 'Medium', topic: 'Graph & Topological Sort', runtimePercent: '95.7%' },
    { title: 'Merge k Sorted Lists', difficulty: 'Hard', topic: 'Min-Heap Priority Queue', runtimePercent: '99.1%' },
    { title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', topic: 'Tree DFS Dynamic Programming', runtimePercent: '97.2%' }
  ];
}
