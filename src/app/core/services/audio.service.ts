import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted = false;

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Synthesizes a crisp, metallic parry snap with high-frequency ring and time-freeze reverb
  playParry(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // 1. High metallic ping oscillator
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(2400, now);
      osc1.frequency.exponentialRampToValueAtTime(450, now + 0.18);

      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // 2. Resonant metallic strike (square with low-pass)
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain2 = ctx.createGain();

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now);
      osc2.frequency.exponentialRampToValueAtTime(220, now + 0.12);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(8, now);

      gain2.gain.setValueAtTime(0.9, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc2.connect(filter);
      filter.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Synthesizes a fast blade swoosh
  playAttack(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.14);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  // Synthesizes a crisp paper/leaf cutting blade slice
  playBladeSlice(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Synthesizes a sharp arrow/gunshot firing sound for Duck Hunt
  playShot(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // 1. Noise burst / shot crack
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  // Synthesizes bird hit / feather scatter impact
  playBirdHit(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  // Synthesizes heavy blunt hit impact
  playHit(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.2);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  // Synthesizes explosive ultimate ground slam / fissure sound
  playUlt(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(30, now + 0.8);

      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    } catch {}
  }

  // Plays custom meme dialogue audio clip from URL
  playDialogueUrl(url: string): void {
    if (this.isMuted || !url) return;
    try {
      const audio = new Audio(url);
      audio.volume = 0.85;
      audio.play().catch(() => {});
    } catch {}
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}
