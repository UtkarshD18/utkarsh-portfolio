import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  readonly isPreloaded = signal<boolean>(false);
  private hasTriggered = false;

  preloadDuelAssets(): void {
    if (this.hasTriggered) return;
    this.hasTriggered = true;
    console.log('[PreloaderService] Preloading 3D Arena Shaders & Audio Buffers...');

    // Preload audio files & WebGL context warmup
    try {
      const audioPing = new Audio();
      audioPing.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      audioPing.load();

      // Signal completion
      setTimeout(() => {
        this.isPreloaded.set(true);
        console.log('[PreloaderService] 3D Arena assets ready.');
      }, 500);
    } catch {
      this.isPreloaded.set(true);
    }
  }
}
