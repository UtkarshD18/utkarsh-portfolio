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
      <div class="torii-symbol">⛩</div>
      <div class="footer-divider">
        <span class="nav-item">FORGE</span>
        <span class="nav-dot">·</span>
        <span class="nav-item">OBSERVE</span>
        <span class="nav-dot">·</span>
        <span class="nav-item">COMBAT</span>
      </div>

      <div
        class="moon-trigger"
        [class.expanding]="isExpanding()"
        (click)="triggerGateway()"
        (mouseenter)="onMoonHover()"
      >
        <div class="moon-halo"></div>
        <span class="moon-icon">{{ isExpanding() ? '○' : '☾' }}</span>
        <div class="moon-text-block">
          <span class="moon-title">{{ isExpanding() ? 'ENTERING THE ARENA OF TSU-SHIMA' : 'THE BLOOD MOON DUEL' }}</span>
          <span class="moon-label">{{ isExpanding() ? '風の導き · Follow the guiding wind' : 'Step into the circle · 決闘の地へ' }}</span>
        </div>
      </div>

      <div class="footer-copy">
        © 2026 UTKARSH · LOW-LATENCY SYSTEMS · NATIONAL ATHLETE · OBSERVER
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      padding: 7rem 2rem 5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      background: #000000;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
      z-index: 10;
    }
    .torii-symbol {
      font-size: 2.2rem;
      color: #ffffff;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
    }
    .footer-divider {
      display: flex;
      align-items: center;
      gap: 1.8rem;
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      letter-spacing: 0.25em;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
    }
    .nav-dot {
      color: rgba(255, 255, 255, 0.3);
    }
    .moon-trigger {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
      cursor: pointer;
      padding: 2rem 4rem;
      border-radius: 999px;
      position: relative;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .moon-halo {
      position: absolute;
      width: 140px;
      height: 140px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      transition: transform 0.6s ease, opacity 0.6s ease;
      opacity: 0.6;
    }
    .moon-trigger:hover .moon-halo {
      transform: scale(1.6);
      opacity: 1;
    }
    .moon-icon {
      font-size: 3.2rem;
      color: #ffffff;
      text-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.6s ease;
      display: inline-block;
      position: relative;
      z-index: 2;
    }
    .moon-trigger:hover .moon-icon {
      transform: scale(1.25) rotate(-10deg);
      text-shadow: 0 0 45px rgba(255, 255, 255, 1);
    }
    .moon-text-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
      position: relative;
      z-index: 2;
    }
    .moon-title {
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: 0.2em;
      color: #ffffff;
      transition: color 0.3s ease;
    }
    .moon-label {
      font-family: 'Shippori Mincho', serif;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.6);
      letter-spacing: 0.1em;
      transition: color 0.3s ease;
    }
    .moon-trigger:hover .moon-title {
      color: #ffffff;
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    }
    .moon-trigger:hover .moon-label {
      color: #ffffff;
    }
    .moon-trigger.expanding .moon-icon {
      transform: scale(4.5);
      text-shadow: 0 0 80px rgba(255, 255, 255, 1);
    }
    .footer-copy {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.4);
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
