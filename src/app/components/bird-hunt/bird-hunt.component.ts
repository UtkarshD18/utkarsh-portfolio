import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';

interface Bird {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  wingAngle: number;
  wingSpeed: number;
  state: 'flying' | 'hit' | 'falling';
  fallSpeed: number;
  rotation: number;
  rotSpeed: number;
  type: 'mallard' | 'crane' | 'hawk';
  color: string;
  points: number;
  wobbleFreq: number;
  wobbleAmp: number;
  timeAlive: number;
}

interface Feather {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
  vy: number;
}

interface ShotFlash {
  x: number;
  y: number;
  radius: number;
  life: number;
}

@Component({
  selector: 'app-bird-hunt',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bird-hunt-layer">
      <!-- Fullscreen Game Canvas for Flying Birds, Crosshairs, Feathers & Flash -->
      <canvas #huntCanvas class="hunt-canvas" (click)="onShoot($event)"></canvas>

      <!-- Duck Hunt Arcade HUD (Top Left) -->
      <div class="hunt-hud">
        <div class="hud-card">
          <div class="hud-header">
            <span class="hud-badge">HUNT ARCADE</span>
            <span class="hud-mode">CLICK SCREEN TO SHOOT</span>
          </div>
          <div class="hud-stats">
            <div class="stat-box">
              <span class="stat-label">DUCKS DOWN</span>
              <span class="stat-num">{{ ducksDown() }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">SCORE</span>
              <span class="stat-num">{{ score() }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">STREAK</span>
              <span class="stat-num streak-num">x{{ streak() }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">ACCURACY</span>
              <span class="stat-num">{{ accuracy() }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 15;
    }
    .bird-hunt-layer {
      position: relative;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
    }
    .hunt-canvas {
      width: 100vw;
      height: 100vh;
      display: block;
      pointer-events: auto;
      cursor: crosshair;
    }
    .hunt-hud {
      position: absolute;
      top: 5.5rem;
      left: 4.5rem;
      pointer-events: auto;
      z-index: 20;
    }
    .hud-card {
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 8px;
      padding: 0.65rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      user-select: none;
    }
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 0.3rem;
    }
    .hud-badge {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      color: #ffffff;
    }
    .hud-mode {
      color: rgba(255, 255, 255, 0.5);
    }
    .hud-stats {
      display: flex;
      gap: 1.2rem;
      align-items: center;
    }
    .stat-box {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    .stat-label {
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 0.1em;
      font-weight: 700;
    }
    .stat-num {
      font-family: 'Cinzel', serif;
      font-size: 1.1rem;
      font-weight: 900;
      color: #ffffff;
    }
    .streak-num {
      color: #ffffff;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }

    @media (max-width: 1024px) {
      .hunt-hud {
        top: 4.8rem;
        left: 1.5rem;
      }
    }
  `]
})
export class BirdHuntComponent implements OnInit, OnDestroy {
  @ViewChild('huntCanvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  private audio = inject(AudioService);
  private ctx!: CanvasRenderingContext2D;
  private animId: number = 0;

  // Game Stats
  readonly ducksDown = signal<number>(0);
  readonly score = signal<number>(0);
  readonly streak = signal<number>(1);
  readonly totalShots = signal<number>(0);
  readonly totalHits = signal<number>(0);

  readonly accuracy = signal<number>(100);

  // Entities
  private birds: Bird[] = [];
  private feathers: Feather[] = [];
  private floatingTexts: FloatingText[] = [];
  private shotFlashes: ShotFlash[] = [];

  // Crosshair Mouse Coordinates
  private mouseX = -100;
  private mouseY = -100;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    this.resizeCanvas();
    this.initFlock(6);
    this.loop();
  }

  ngOnDestroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  @HostListener('window:resize')
  resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  private initFlock(count: number): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.birds = [];

    for (let i = 0; i < count; i++) {
      this.spawnBird(Math.random() * w, Math.random() * (h * 0.6) + 40);
    }
  }

  private spawnBird(initialX?: number, initialY?: number): void {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const fromLeft = Math.random() > 0.5;
    const x = initialX !== undefined ? initialX : fromLeft ? -60 : w + 60;
    const y = initialY !== undefined ? initialY : Math.random() * (h * 0.6) + 50;

    // Flight Velocity
    const baseSpeed = Math.random() * 2.8 + 2.2;
    const vx = fromLeft ? baseSpeed : -baseSpeed;
    const vy = (Math.random() - 0.5) * 1.2;

    const randType = Math.random();
    const type: 'mallard' | 'crane' | 'hawk' = randType < 0.5 ? 'mallard' : randType < 0.8 ? 'crane' : 'hawk';
    const size = type === 'mallard' ? 22 : type === 'crane' ? 28 : 24;
    const points = type === 'mallard' ? 100 : type === 'crane' ? 250 : 150;

    this.birds.push({
      id: Math.random(),
      x,
      y,
      vx,
      vy,
      size,
      wingAngle: Math.random() * Math.PI * 2,
      wingSpeed: Math.random() * 0.15 + 0.18,
      state: 'flying',
      fallSpeed: 0,
      rotation: 0,
      rotSpeed: 0,
      type,
      color: '#ffffff',
      points,
      wobbleFreq: Math.random() * 0.03 + 0.02,
      wobbleAmp: Math.random() * 1.5 + 0.8,
      timeAlive: 0
    });
  }

  onShoot(e: MouseEvent): void {
    const clickX = e.clientX;
    const clickY = e.clientY;

    this.totalShots.update(s => s + 1);
    this.audio.playShot();

    // Trigger Shot Flash at Click Point
    this.shotFlashes.push({
      x: clickX,
      y: clickY,
      radius: 35,
      life: 1.0
    });

    let hitAny = false;

    // Check hit collision against flying birds
    for (let bird of this.birds) {
      if (bird.state !== 'flying') continue;

      const dist = Math.hypot(clickX - bird.x, clickY - bird.y);
      if (dist < bird.size * 1.6) {
        // HIT!
        hitAny = true;
        bird.state = 'hit';
        bird.fallSpeed = 2.5;
        bird.rotSpeed = (Math.random() - 0.5) * 0.25;

        this.totalHits.update(h => h + 1);
        this.ducksDown.update(d => d + 1);

        const currentStreak = this.streak();
        const earned = bird.points * currentStreak;
        this.score.update(s => s + earned);
        this.streak.update(st => Math.min(st + 1, 10));

        // Audio hit
        this.audio.playBirdHit();

        // Spawn Feather Explosion
        this.spawnFeathers(bird.x, bird.y, 14);

        // Spawn Floating Score Text
        const praise = currentStreak > 3 ? `x${currentStreak} MEGA SHOT! +${earned}` : `+${earned}`;
        this.floatingTexts.push({
          id: Math.random(),
          x: bird.x,
          y: bird.y - 15,
          text: praise,
          color: '#ffffff',
          opacity: 1.0,
          vy: -1.8
        });

        break;
      }
    }

    if (!hitAny) {
      // Missed shot resets streak
      this.streak.set(1);
    }

    // Update Accuracy
    const acc = Math.round((this.totalHits() / (this.totalShots() || 1)) * 100);
    this.accuracy.set(acc);
  }

  private spawnFeathers(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.5;
      this.feathers.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 8 + 6,
        life: 1.0,
        maxLife: Math.random() * 0.3 + 0.7,
        color: Math.random() > 0.3 ? '#ffffff' : '#b0b0b0'
      });
    }
  }

  private loop = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.width;
    const h = canvas.height;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Shot Flashes
    for (let i = this.shotFlashes.length - 1; i >= 0; i--) {
      const flash = this.shotFlashes[i];
      flash.life -= 0.12;
      if (flash.life <= 0) {
        this.shotFlashes.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.fillStyle = `rgba(255, 255, 255, ${flash.life * 0.7})`;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 20;
      this.ctx.beginPath();
      this.ctx.arc(flash.x, flash.y, flash.radius * (1 - flash.life * 0.5), 0, Math.PI * 2);
      this.ctx.fill();

      // Cross lines flash
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${flash.life})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(flash.x - 30, flash.y);
      this.ctx.lineTo(flash.x + 30, flash.y);
      this.ctx.moveTo(flash.x, flash.y - 30);
      this.ctx.lineTo(flash.x, flash.y + 30);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 2. Update and Draw Birds
    for (let i = this.birds.length - 1; i >= 0; i--) {
      const b = this.birds[i];
      b.timeAlive++;

      if (b.state === 'flying') {
        b.wingAngle += b.wingSpeed;
        const wobble = Math.sin(b.timeAlive * b.wobbleFreq) * b.wobbleAmp;
        b.x += b.vx;
        b.y += b.vy + wobble;

        // Despawn off screen and respawn
        if ((b.vx > 0 && b.x > w + 100) || (b.vx < 0 && b.x < -100)) {
          this.birds.splice(i, 1);
          this.spawnBird();
          continue;
        }
      } else if (b.state === 'hit') {
        b.fallSpeed += 0.35; // Gravity
        b.y += b.fallSpeed;
        b.rotation += b.rotSpeed;

        // Despawn after falling below screen
        if (b.y > h + 80) {
          this.birds.splice(i, 1);
          this.spawnBird();
          continue;
        }
      }

      // Draw Bird
      this.drawBird(b);
    }

    // Maintain flock count
    while (this.birds.length < 6) {
      this.spawnBird();
    }

    // 3. Update and Draw Feathers
    for (let i = this.feathers.length - 1; i >= 0; i--) {
      const f = this.feathers[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.08; // subtle feather gravity
      f.vx *= 0.96;
      f.rotation += f.rotSpeed;
      f.life -= 0.015;

      if (f.life <= 0 || f.y > h + 30) {
        this.feathers.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(f.x, f.y);
      this.ctx.rotate(f.rotation);
      this.ctx.fillStyle = f.color;
      this.ctx.globalAlpha = f.life;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 6;

      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, f.size * 0.35, f.size, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 4. Update and Draw Floating Combo Texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const txt = this.floatingTexts[i];
      txt.y += txt.vy;
      txt.opacity -= 0.02;

      if (txt.opacity <= 0) {
        this.floatingTexts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.font = '900 16px "Cinzel", serif';
      this.ctx.fillStyle = `rgba(255, 255, 255, ${txt.opacity})`;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 12;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(txt.text, txt.x, txt.y);
      this.ctx.restore();
    }

    // 5. Draw Animated Crosshair Scope on Cursor
    if (this.mouseX > 0 && this.mouseY > 0) {
      this.drawCrosshair(this.mouseX, this.mouseY);
    }

    this.animId = requestAnimationFrame(this.loop);
  };

  private drawBird(b: Bird): void {
    this.ctx.save();
    this.ctx.translate(b.x, b.y);
    if (b.state === 'hit') {
      this.ctx.rotate(b.rotation);
    } else {
      // Facing direction
      const angle = Math.atan2(b.vy, b.vx);
      this.ctx.rotate(angle);
      if (b.vx < 0) {
        this.ctx.scale(1, -1);
      }
    }

    const wingFlap = Math.sin(b.wingAngle) * (b.size * 0.9);

    this.ctx.fillStyle = b.color;
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
    this.ctx.shadowBlur = 10;

    // Bird Body (Mallard / Crane / Hawk)
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, b.size * 0.8, b.size * 0.35, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Head & Beak
    this.ctx.beginPath();
    this.ctx.arc(b.size * 0.7, -2, b.size * 0.28, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Sharp Beak
    this.ctx.beginPath();
    this.ctx.moveTo(b.size * 0.9, -4);
    this.ctx.lineTo(b.size * 1.3, 0);
    this.ctx.lineTo(b.size * 0.9, 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Flapping Wings
    this.ctx.beginPath();
    this.ctx.moveTo(-b.size * 0.2, 0);
    this.ctx.quadraticCurveTo(0, wingFlap, b.size * 0.4, wingFlap * 0.5);
    this.ctx.lineTo(0, 0);
    this.ctx.fill();
    this.ctx.stroke();

    // Tail Feathers
    this.ctx.beginPath();
    this.ctx.moveTo(-b.size * 0.7, 0);
    this.ctx.lineTo(-b.size * 1.1, -4);
    this.ctx.lineTo(-b.size * 1.1, 4);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  private drawCrosshair(x: number, y: number): void {
    this.ctx.save();
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowColor = '#ffffff';
    this.ctx.shadowBlur = 8;

    // Outer Circle
    this.ctx.beginPath();
    this.ctx.arc(x, y, 16, 0, Math.PI * 2);
    this.ctx.stroke();

    // Inner Dot
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    // 4 Crosshair Notches
    this.ctx.beginPath();
    this.ctx.moveTo(x - 24, y);
    this.ctx.lineTo(x - 8, y);
    this.ctx.moveTo(x + 8, y);
    this.ctx.lineTo(x + 24, y);
    this.ctx.moveTo(x, y - 24);
    this.ctx.lineTo(x, y - 8);
    this.ctx.moveTo(x, y + 8);
    this.ctx.lineTo(x, y + 24);
    this.ctx.stroke();

    this.ctx.restore();
  }
}
