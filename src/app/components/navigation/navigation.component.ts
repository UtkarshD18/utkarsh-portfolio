import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="brand">
          <span class="brand-mon">○</span>
          <div class="brand-text">
            <span class="brand-name">Utkarsh Dwivedi</span>
            <span class="brand-sub">[ Software &amp; Systems ]</span>
          </div>
        </a>

        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item">
            <span class="item-index">[ 01 ]</span>
            <span>Home</span>
          </a>
          <a routerLink="/work" routerLinkActive="active" class="nav-item">
            <span class="item-index">[ 02 ]</span>
            <span>Work &amp; Architecture</span>
          </a>
          <a routerLink="/about" routerLinkActive="active" class="nav-item">
            <span class="item-index">[ 03 ]</span>
            <span>About</span>
          </a>
          <a href="/assets/Utkarsh_Dwivedi_Resume.pdf" target="_blank" class="nav-item resume-link">
            <span>Resume 📄</span>
          </a>
          <a routerLink="/duel" routerLinkActive="active" class="nav-item duel-link">
            <span class="duel-badge">3D</span>
            <span>Duel Arena</span>
          </a>
          <a routerLink="/contact" class="contact-cta liquid-glass">
            <span>Contact ↗</span>
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(7, 7, 9, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.1rem 0;
      transition: all 0.3s ease;
    }
    .nav-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      text-decoration: none;
      color: #ffffff;
    }
    .brand-mon {
      font-size: 1.1rem;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.03);
    }
    .brand-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: -0.01em;
    }
    .brand-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      color: #8e8e9f;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.6rem;
    }
    .nav-item {
      text-decoration: none;
      color: #8e8e9f;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.2s ease;
    }
    .nav-item:hover, .nav-item.active {
      color: #ffffff;
    }
    .item-index {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
    }
    .resume-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: #e5e5d8;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    .resume-link:hover {
      background: #ffffff;
      color: #000000;
    }
    .duel-link {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      color: #ffffff;
    }
    .duel-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      background: #3b82f6;
      color: #ffffff;
      padding: 0.1rem 0.35rem;
      border-radius: 3px;
      font-weight: 700;
    }
    .contact-cta {
      text-decoration: none;
      color: #ffffff;
      font-size: 0.8rem;
      font-family: 'JetBrains Mono', monospace;
      padding: 0.45rem 1.1rem;
      border-radius: 999px;
      transition: all 0.2s ease;
    }
    .contact-cta:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .nav-container { padding: 0 1rem; }
      .nav-links { gap: 0.8rem; }
      .item-index { display: none; }
      .duel-link { display: none; }
      .brand-sub { display: none; }
    }
  `]
})
export class NavigationComponent {}
