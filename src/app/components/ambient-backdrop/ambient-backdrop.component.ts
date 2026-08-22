import { Component, HostListener, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ambient-backdrop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ambient-backdrop-root" aria-hidden="true">
      <!-- 1. Deep Atmospheric Gradient Layers (GPU Composited) -->
      <div 
        class="ambient-glow glow-primary"
        [style.transform]="primaryTransform()"
      ></div>
      <div 
        class="ambient-glow glow-secondary"
        [style.transform]="secondaryTransform()"
      ></div>

      <!-- 2. Subtle Filmic Grain Overlay -->
      <div class="ambient-grain"></div>

      <!-- 3. Ultra-fine Perspective Grid (Low Opacity) -->
      <div class="ambient-lattice"></div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .ambient-backdrop-root {
      position: absolute;
      inset: 0;
      background-color: #08080c;
    }

    /* Ambient Glow Nodes (Subtle, large blur, low opacity) */
    .ambient-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.22;
      will-change: transform;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .glow-primary {
      top: -10vw;
      left: 20vw;
      width: 55vw;
      height: 55vw;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(30, 58, 138, 0.1) 70%, transparent 100%);
    }

    .glow-secondary {
      top: 40vh;
      right: 5vw;
      width: 45vw;
      height: 45vw;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(67, 56, 202, 0.05) 70%, transparent 100%);
    }

    /* Subtle Filmic Grain (SVG Noise Generator) */
    .ambient-grain {
      position: absolute;
      inset: 0;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
    }

    /* Ultra-fine Perspective Grid Lattice */
    .ambient-lattice {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
      background-size: 80px 80px;
      mask-image: radial-gradient(circle at 50% 30%, black 20%, transparent 85%);
      -webkit-mask-image: radial-gradient(circle at 50% 30%, black 20%, transparent 85%);
    }

    @media (max-width: 768px) {
      .ambient-glow {
        filter: blur(80px);
        opacity: 0.15;
      }
      .glow-primary {
        width: 80vw;
        height: 80vw;
        left: -10vw;
      }
      .glow-secondary {
        display: none; /* Conserve mobile GPU resources */
      }
    }
  `]
})
export class AmbientBackdropComponent {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Smoothly interpolated mouse positions
  private mouseX = 0;
  private mouseY = 0;
  private scrollY = 0;

  readonly primaryTransform = signal<string>('translate3d(0, 0, 0)');
  readonly secondaryTransform = signal<string>('translate3d(0, 0, 0)');

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || window.innerWidth < 768) return;
    
    // Normalized [-1, 1]
    this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    this.updateTransforms();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollY = window.scrollY || 0;
    this.updateTransforms();
  }

  private updateTransforms(): void {
    const shiftX1 = this.mouseX * 35;
    const shiftY1 = (this.mouseY * 35) + (this.scrollY * -0.06);
    this.primaryTransform.set(`translate3d(${shiftX1.toFixed(1)}px, ${shiftY1.toFixed(1)}px, 0)`);

    const shiftX2 = this.mouseX * -25;
    const shiftY2 = (this.mouseY * -25) + (this.scrollY * -0.12);
    this.secondaryTransform.set(`translate3d(${shiftX2.toFixed(1)}px, ${shiftY2.toFixed(1)}px, 0)`);
  }
}
