import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../core/services/github.service';

@Component({
  selector: 'app-activity-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="activity-section" aria-labelledby="github-title">
      <div class="activity-header">
        <h2 id="github-title" class="activity-title">GitHub Activity &amp; Coding Profiles</h2>
        <p class="activity-desc">Public repositories and recent activity fetched from GitHub. Refreshes every ten minutes while this page is open.</p>
      </div>
      <div class="activity-grid">
        <div class="stats-card liquid-glass" [attr.aria-busy]="github.loading()">
          <div class="card-top">
            <div class="card-brand">
              <div>
                <a href="https://github.com/UtkarshD18" target="_blank" rel="noopener noreferrer" class="brand-link">GitHub · UtkarshD18 ↗</a>
                <span class="user-handle">Public GitHub API</span>
              </div>
            </div>
            @if (github.profile(); as profile) {
              <a href="https://github.com/UtkarshD18?tab=repositories" target="_blank" rel="noopener noreferrer" class="total-badge">{{ profile.public_repos }} Public Repositories</a>
            }
          </div>
          <div class="refresh-status" aria-live="polite">
            @if (github.loading()) { <p>Fetching GitHub data…</p> }
            @if (github.error()) { <p role="status">{{ github.error() }} {{ github.updatedAt() ? 'Showing the last successful fetch.' : '' }}</p> }
            @if (github.updatedAt(); as updatedAt) { <p>Last fetched {{ updatedAt | date:'medium' }}. GitHub activity may be delayed.</p> }
            <button type="button" class="total-badge refresh-btn" (click)="github.refresh()" [disabled]="github.loading()">Refresh GitHub data</button>
            <small>Refresh requests are limited to once per minute.</small>
          </div>
          <div class="github-metrics-row">
            @for (repo of github.repositories(); track repo.id) {
              <a [href]="repo.html_url" target="_blank" rel="noopener noreferrer" class="metric-item">
                <span class="val">{{ repo.name }}</span>
                <span class="lbl">{{ repo.description || 'View repository on GitHub' }}</span>
                <span class="lbl">{{ repo.language || 'Repository' }} · Last pushed {{ repo.pushed_at | date:'mediumDate' }}</span>
              </a>
            }
          </div>
          <div class="recent-submissions">
            <h3 class="sub-header">Recent public activity</h3>
            @for (event of github.events(); track event.id) {
              <a class="activity-event" [href]="'https://github.com/' + event.repo.name" target="_blank" rel="noopener noreferrer">
                <span>{{ github.eventLabel(event.type) }} · {{ event.repo.name }}</span>
                <time [attr.datetime]="event.created_at">{{ event.created_at | date:'medium' }}</time>
              </a>
            } @empty {
              @if (github.updatedAt()) { <p>No recent public activity returned by GitHub.</p> }
            }
          </div>
        </div>
        <div class="stats-card liquid-glass">
          <div class="card-top">
            <div>
              <a href="https://leetcode.com/u/UtkarshD18/" target="_blank" rel="noopener noreferrer" class="brand-link">LeetCode ↗</a>
              <span class="user-handle">Coding practice</span>
            </div>
            <span class="streak-badge">From resume · not a live counter</span>
          </div>
          <div class="leetcode-breakdown">
            <div class="solved-circle-container"><div class="total-solved-num">100+</div><div class="total-solved-label">DSA problems</div></div>
            <p class="activity-desc">Problems solved across LeetCode and Naukri Code360, as listed in my resume.</p>
          </div>
          <div class="profile-details">
            <h3>Computer science foundations</h3>
            <p class="activity-desc">Data structures and algorithms, object-oriented programming, DBMS, operating systems, computer networks, multithreading and concurrency.</p>
            <a href="/assets/Utkarsh_Dwivedi_Resume.pdf" target="_blank" class="brand-link">View resume ↗</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .refresh-status { display: flex; flex-direction: column; align-items: flex-start; gap: .65rem; color: var(--text-secondary); font-size: .8rem; }
    .refresh-btn { cursor: pointer; }
    .refresh-btn:disabled { opacity: .6; cursor: wait; }
    .activity-event { display: flex; flex-direction: column; gap: .3rem; padding: .7rem 0; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border-subtle); font-size: .85rem; overflow-wrap: anywhere; }
    .activity-event time { color: var(--text-secondary); font-size: .75rem; }
    .metric-item { min-width: 0; overflow-wrap: anywhere; }

    .activity-section {
      padding: 5rem 0;
      border-bottom: 1px solid rgba(24, 62, 51, 0.06);
    }
    .activity-header {
      margin-bottom: 3rem;
    }
    .activity-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(0.65rem, 2.5vw, 0.75rem);
      color: var(--text-primary);
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
      white-space: nowrap;
    }
    .activity-title {
      font-size: clamp(1.8rem, 5vw, 2.3rem);
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.8rem;
      letter-spacing: -0.02em;
    }
    .activity-desc {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 680px;
    }

    /* Grid */
    .activity-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      align-items: start;
    }
    .stats-card {
      border-radius: 16px;
      padding: 2.4rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
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
      color: var(--text-primary);
      text-decoration: none;
      display: block;
      transition: color 0.2s ease;
    }
    .brand-link:hover {
      color: var(--text-primary);
    }
    .user-handle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    .total-badge, .streak-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      background: rgba(24, 62, 51, 0.05);
      border: 1px solid rgba(24, 62, 51, 0.12);
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      color: var(--text-primary);
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .total-badge:hover, .streak-badge:hover {
      background: rgba(24, 62, 51, 0.12);
      color: var(--text-primary);
    }
    .streak-badge {
      border-color: rgba(24, 62, 51, 0.4);
      color: var(--text-primary);
    }

    /* Live GitHub Chart */
    .gh-chart-container {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      background: var(--bg-surface);
      padding: 1.2rem;
      border-radius: 10px;
      border: 1px solid rgba(24, 62, 51, 0.06);
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
      color: var(--text-secondary);
      letter-spacing: 0.12em;
    }

    /* Metrics Row */
    .github-metrics-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      border-top: 1px solid rgba(24, 62, 51, 0.08);
      padding-top: 1.4rem;
    }
    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      text-decoration: none;
      padding: 0.6rem;
      border-radius: 8px;
      background: rgba(24, 62, 51, 0.02);
      border: 1px solid rgba(24, 62, 51, 0.04);
      transition: all 0.2s ease;
    }
    .metric-item:hover {
      background: rgba(24, 62, 51, 0.06);
      transform: translateY(-2px);
    }
    .metric-item .val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .metric-item .lbl {
      font-size: 0.72rem;
      color: var(--text-secondary);
    }

    /* LeetCode & Code360 */
    .leetcode-icon {
      width: 32px;
      height: 32px;
      background: var(--accent-forest);
      color: var(--palette-ivory);
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
      border: 3px solid var(--accent-forest);
      background: rgba(24, 62, 51, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .total-solved-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
    }
    .total-solved-label {
      font-size: 0.65rem;
      color: var(--text-secondary);
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
      color: var(--text-secondary);
    }
    .prof-val {
      font-size: 0.85rem;
      color: var(--text-primary);
      font-weight: 600;
    }

    /* Submissions / Competencies */
    .recent-submissions {
      border-top: 1px solid rgba(24, 62, 51, 0.08);
      padding-top: 1.2rem;
    }
    .sub-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      color: var(--text-secondary);
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
      border-bottom: 1px solid rgba(24, 62, 51, 0.03);
    }
    .sub-main {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .sub-title {
      font-size: 0.82rem;
      color: var(--text-primary);
      font-weight: 500;
    }
    .diff-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      padding: 0.1rem 0.45rem;
      border-radius: 4px;
    }
    .pill-easy { background: rgba(24, 62, 51, 0.15); color: var(--text-primary); }
    .pill-medium { background: rgba(24, 62, 51, 0.15); color: var(--text-primary); }
    .pill-hard { background: rgba(24, 62, 51, 0.15); color: var(--text-primary); }
    .speed-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-primary);
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
export class ActivityStatsComponent { readonly github = inject(GithubService); }
