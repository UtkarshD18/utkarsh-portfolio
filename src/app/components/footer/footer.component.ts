import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-top">
          <div class="footer-brand">
            <span class="brand-title">UTKARSH DWIVEDI</span>
            <p class="footer-tagline">
              B.Tech CSE student (2022–2026) building low-latency systems, Java 21 Spring Boot backends, and multi-tenant web architectures.
            </p>
            <div class="status-indicator">
              <span class="pulse-dot"></span>
              <span>Available for Software Engineering roles &amp; distributed platforms.</span>
            </div>
          </div>

          <div class="footer-nav-groups">
            <div class="nav-group">
              <span class="group-title">PAGES</span>
              <a routerLink="/" class="footer-link">Home</a>
              <a routerLink="/work" class="footer-link">Work &amp; Architecture</a>
              <a routerLink="/about" class="footer-link">About &amp; Resume</a>
              <a routerLink="/duel" class="footer-link">3D Duel Arena</a>
              <a routerLink="/contact" class="footer-link">Contact</a>
            </div>

            <div class="nav-group">
              <span class="group-title">VERIFIED PROFILES</span>
              <a href="https://github.com/UtkarshD18" target="_blank" class="footer-link">GitHub · UtkarshD18 ↗</a>
              <a href="https://www.linkedin.com/in/utkarsh-dwivedi-01489524b/" target="_blank" class="footer-link">LinkedIn Profile ↗</a>
              <a href="https://leetcode.com/u/UtkarshD18/" target="_blank" class="footer-link">LeetCode Profile ↗</a>
              <a href="mailto:utkarshdwivedi.182@gmail.com" class="footer-link">utkarshdwivedi.182&#64;gmail.com ↗</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© 2026 Utkarsh Dwivedi. All rights reserved.</span>
          <span>Engineered with Angular 18, WebAssembly, and Clean Architecture.</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #050507;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 5rem 0 3rem;
      color: #8e8e9f;
    }
    .footer-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .footer-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 3.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      flex-wrap: wrap;
      gap: 3rem;
    }
    .footer-brand {
      max-width: 440px;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .brand-title {
      font-size: 1.4rem;
      font-weight: 900;
      letter-spacing: 0.15em;
      color: #ffffff;
    }
    .footer-tagline {
      font-size: 0.95rem;
      line-height: 1.65;
    }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-top: 0.8rem;
      font-size: 0.8rem;
      color: #f5f5f7;
    }
    .pulse-dot {
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
    .footer-nav-groups {
      display: flex;
      gap: 4rem;
      flex-wrap: wrap;
    }
    .nav-group {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }
    .group-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      color: #ffffff;
      margin-bottom: 0.4rem;
    }
    .footer-link {
      color: #8e8e9f;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s ease;
    }
    .footer-link:hover {
      color: #ffffff;
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      padding-top: 2rem;
      font-size: 0.8rem;
      color: #5c5c6d;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `]
})
export class FooterComponent {}
