import { Component, signal, OnDestroy, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmbientBackdropComponent } from './components/ambient-backdrop/ambient-backdrop.component';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmbientBackdropComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  protected readonly title = signal('utkarsh-portfolio');
  private lenis?: Lenis;
  private rafId?: number;

  constructor() {
    afterNextRender(() => {
      this.initLenis();
    });
  }

  private initLenis(): void {
    if (typeof window !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);
    }
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
  }
}
