import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ambient-backdrop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="editorial-backdrop" aria-hidden="true">
      <!-- 1. Architectural Precision Grid (Architectural Lines, NOT AI Blobs) -->
      <div class="precision-grid"></div>

      <!-- 2. Single-Source Header Light Gradient -->
      <div class="subtle-header-glow"></div>

      <!-- 3. Grounded Vignette Edges -->
      <div class="matte-vignette"></div>
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

    .editorial-backdrop {
      position: absolute;
      inset: 0;
      background-color: var(--bg-base);
    }

    /* Architectural Precision Grid */
    .precision-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(24, 62, 51, 0.022) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(24, 62, 51, 0.022) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse 90% 70% at 50% 20%, black 20%, transparent 85%);
      -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 20%, black 20%, transparent 85%);
    }

    /* Subtle Single-Source Architectural Header Lighting */
    .subtle-header-glow {
      position: absolute;
      top: -10vh;
      left: 20%;
      right: 20%;
      height: 45vh;
      background: radial-gradient(ellipse at 50% 0%, rgba(24, 62, 51, 0.04) 0%, transparent 75%);
      filter: blur(40px);
    }

    /* Matte Vignette Edge Framing */
    .matte-vignette {
      position: absolute;
      inset: 0;
      box-shadow: inset 0 0 120px rgba(24, 62, 51, 0.025);
    }
  `]
})
export class AmbientBackdropComponent {}
