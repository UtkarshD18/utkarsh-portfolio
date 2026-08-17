import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { PreloaderService } from '../../core/services/preloader.service';

@Component({
  selector: 'app-moon-footer',
  standalone: true,
  template: `
    <footer class="footer-container" #footerRef>
      <div class="footer-divider">
        <span class="nav-item">BUILD</span>
        <span class="nav-dot">·</span>
        <span class="nav-item">OBSERVE</span>
        <span class="nav-dot">·</span>
        <span class="nav-item">COMPETE</span>
      </div>

      <div
        class="moon-trigger"
        [class.expanding]="isExpanding()"
        (click)="triggerGateway()"
        (mouseenter)="onMoonHover()"
      >
        <span class="moon-icon">{{ isExpanding() ? '○' : '☾' }}</span>
        <span class="moon-label">{{ isExpanding() ? 'ENTERING THE ARENA...' : 'remain still enough to see' }}</span>
      </div>

      <div class="footer-copy">
        © 2026 UTKARSH · SOFTWARE / SYSTEMS / ATHLETE
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      padding: 6rem 2rem 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      background: #08080a;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      position: relative;
      z-index: 10;
    }
    .footer-divider {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      font-size: 0.85rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.4);
      text-transform: uppercase;
    }
    .nav-dot {
      color: rgba(255, 255, 255, 0.2);
    }
    .moon-trigger {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      padding: 1.5rem 3rem;
      border-radius: 999px;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .moon-trigger:hover {
      background: rgba(255, 255, 255, 0.03);
    }
    .moon-icon {
      font-size: 2.5rem;
      color: rgba(255, 255, 255, 0.85);
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.6s ease;
      display: inline-block;
    }
    .moon-trigger:hover .moon-icon {
      transform: scale(1.18) rotate(-12deg);
      text-shadow: 0 0 24px rgba(255, 255, 255, 0.5);
    }
    .moon-label {
      font-size: 0.9rem;
      font-style: italic;
      color: rgba(255, 255, 255, 0.45);
      letter-spacing: 0.05em;
      transition: color 0.3s ease;
    }
    .moon-trigger:hover .moon-label {
      color: rgba(255, 255, 255, 0.9);
    }
    .moon-trigger.expanding .moon-icon {
      transform: scale(3.5);
      text-shadow: 0 0 60px rgba(255, 255, 255, 1);
    }
    .footer-copy {
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.25);
    }
  `]
})
export class MoonFooterComponent implements OnInit, OnDestroy {
  @ViewChild('footerRef', { static: true }) footerRef!: ElementRef<HTMLElement>;

  readonly isExpanding = signal<boolean>(false);
  private router = inject(Router);
  private preloader = inject(PreloaderService);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.preloader.preloadDuelAssets();
            }
          });
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this.footerRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onMoonHover(): void {
    this.preloader.preloadDuelAssets();
  }

  triggerGateway(): void {
    if (this.isExpanding()) return;
    this.isExpanding.set(true);

    setTimeout(() => {
      this.router.navigate(['/duel']);
    }, 600);
  }
}
