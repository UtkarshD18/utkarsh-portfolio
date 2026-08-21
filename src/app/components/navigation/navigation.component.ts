import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

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
            <span class="brand-name">Utkarsh</span>
            <span class="brand-sub">[ Systems &amp; Web ]</span>
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
      gap: 0.8rem;
      text-decoration: none;
    }
    .brand-mon {
      font-size: 1.2rem;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
    }
    .brand-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
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
      gap: 2rem;
    }
    .nav-item {
      color: #8e8e9f;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.25s ease;
      position: relative;
    }
    .nav-item .item-index {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.35);
    }
    .nav-item:hover, .nav-item.active {
      color: #ffffff;
    }
    .nav-item.active {
      font-weight: 700;
    }
    .nav-item.active::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #3b82f6;
      border-radius: 2px;
    }
    .duel-link {
      color: #e5e5d8;
    }
    .duel-badge {
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.4);
      color: #3b82f6;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      padding: 0.1rem 0.35rem;
      border-radius: 4px;
    }
    .contact-cta {
      padding: 0.45rem 1.1rem;
      border-radius: 999px;
      color: #ffffff;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .contact-cta:active {
      transform: scale(0.96);
    }

    @media (max-width: 900px) {
      .nav-links { gap: 1.2rem; }
      .nav-item .item-index { display: none; }
    }
    @media (max-width: 680px) {
      .nav-links { display: none; }
    }
  `]
})
export class NavigationComponent {}
