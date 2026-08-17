import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';
import { CharacterConfigService } from '../../core/services/character-config.service';

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
      <!-- Game Canvas for Flying Birds, AKM Muzzle Flash, Feathers & Combat Effects -->
      <canvas #huntCanvas class="hunt-canvas"></canvas>

      <!-- Tactical Duck Hunt HUD (Top Left, Glassmorphism with Sleek Micro-Interactions) -->
      <div class="hunt-hud">
        <div class="hud-card">
          <div class="hud-header">
            <div class="hud-badge-group">
              <span class="weapon-icon">⚡</span>
              <span class="hud-badge">AKM 7.62mm</span>
            </div>
            <span class="hud-mode">CLICK ANYWHERE TO FIRE</span>
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
          @if (lastPraise()) {
            <div class="kill-callout">
              <span class="dynamo-quote">{{ lastPraise() }}</span>
            </div>
          }
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
      pointer-events: none;
    }
    .hunt-hud {
      position: absolute;
      top: 5.5rem;
      left: 4.5rem;
      pointer-events: auto;
      z-index: 20;
    }
    .hud-card {
      background: rgba(10, 10, 10, 0.88);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 10px;
      padding: 0.75rem 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 255, 255, 0.05);
      user-select: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .hud-card:hover {
      border-color: #ffffff;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
    .hud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.2rem;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 0.35rem;
    }
    .hud-badge-group {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .weapon-icon {
      font-size: 0.85rem;
    }
    .hud-badge {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      color: #ffffff;
    }
    .hud-mode {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.65rem;
      letter-spacing: 0.1em;
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
      font-size: 1.15rem;
      font-weight: 900;
      color: #ffffff;
    }
    .streak-num {
      color: #ffffff;
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
    }
    .kill-callout {
      margin-top: 0.2rem;
      padding: 0.3rem 0.6rem;
      background: rgba(255, 255, 255, 0.08);
      border-left: 2px solid #ffffff;
      border-radius: 4px;
      animation: pulseIn 0.25s ease-out;
    }
    @keyframes pulseIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .dynamo-quote {
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      font-weight: 900;
      letter-spacing: 0.15em;
      color: #ffffff;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
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
  private charConfig = inject(CharacterConfigService);

  private ctx!: CanvasRenderingContext2D;
  private animId: number = 0;

  // Game Stats
  readonly ducksDown = signal<number>(0);
  readonly score = signal<number>(0);
  readonly streak = signal<number>(1);
  readonly totalShots = signal<number>(0);
  readonly totalHits = signal<number>(0);
  readonly accuracy = signal<number>(100);
  readonly lastPraise = signal<string>('');

  // Entities
  private birds: Bird[] = [];
  private feathers: Feather[] = [];
  private floatingTexts: FloatingText[] = [];
  private shotFlashes: ShotFlash[] = [];

  // Tactical Reticle
  private mouseX = -100;
  private mouseY = -100;
  private lastMouseMoveTime = 0;
  private isHoveringClickable = false;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    this.resizeCanvas();
    this.initFlock(7);
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
    this.lastMouseMoveTime = performance.now();

    // Check if hovering interactive element
    const target = e.target as HTMLElement;
    this.isHoveringClickable = !!target?.closest('button, a, select, input, .stance-pill, .washi-card, .sound-btn, .word-prop-badge');
  }

  @HostListener('window:click', ['$event'])
  onGlobalClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    // Don't intercept clicks inside specific buttons, navbar or inputs
    if (target?.closest('button, a, select, input, .stance-pill, .sound-btn, .return-btn, .action-btn')) {
      return;
    }

    const clickX = e.clientX;
    const clickY = e.clientY;

    this.totalShots.update(s => s + 1);

    // Play Authentic 7.62mm AKM Gunshot
    this.audio.playAkmShot();

    // Trigger AKM Muzzle Flash
    this.shotFlashes.push({
      x: clickX,
      y: clickY,
      radius: 40,
      life: 1.0
    });

    let hitAny = false;

    // Check hit collision against flying birds
    for (let bird of this.birds) {
      if (bird.state !== 'flying') continue;

      const dist = Math.hypot(clickX - bird.x, clickY - bird.y);
      if (dist < bird.size * 1.7) {
        // HIT / HEADSHOT!
        hitAny = true;
        bird.state = 'hit';
        bird.fallSpeed = 3.2;
        bird.rotSpeed = (Math.random() - 0.5) * 0.3;

        this.totalHits.update(h => h + 1);
        this.ducksDown.update(d => d + 1);

        const currentStreak = this.streak();
        const earned = bird.points * currentStreak;
        this.score.update(s => s + earned);
        this.streak.update(st => Math.min(st + 1, 10));

        // Play Dynamo Gaming "Patt Se Headshot!" Kill Voice
        const config = this.charConfig.huntConfig();
        this.audio.playHeadshotDialogue(config.killSoundUrl, config.killDialogueText || 'Patt Se Headshot!');

        // Update HUD Callout
        const callout = `🎯 PATT SE HEADSHOT! (+${earned})`;
        this.lastPraise.set(callout);
        setTimeout(() => {
          if (this.lastPraise() === callout) this.lastPraise.set('');
        }, 3500);

        // Spawn Feather Explosion
        this.spawnFeathers(bird.x, bird.y, 16);

        // Spawn Floating Combo Text
        this.floatingTexts.push({
          id: Math.random(),
          x: bird.x,
          y: bird.y - 20,
          text: `PATT SE HEADSHOT! +${earned}`,
          color: '#ffffff',
          opacity: 1.0,
          vy: -2.2
        });

        break;
      }
    }

    if (!hitAny) {
      this.streak.set(1);
    }

    // Update Accuracy
    const acc = Math.round((this.totalHits() / (this.totalShots() || 1)) * 100);
    this.accuracy.set(acc);
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
    const y = initialY !== undefined ? initialY : Math.random() * (h * 0.55) + 50;

    // Flight Velocity
    const baseSpeed = Math.random() * 2.8 + 2.4;
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
      wingSpeed: Math.random() * 0.16 + 0.18,
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

  private spawnFeathers(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.0 + 1.8;
      this.feathers.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 9 + 6,
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
    const now = performance.now();

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw AKM Shot Flashes
    for (let i = this.shotFlashes.length - 1; i >= 0; i--) {
      const flash = this.shotFlashes[i];
      flash.life -= 0.14;
      if (flash.life <= 0) {
        this.shotFlashes.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.fillStyle = `rgba(255, 255, 255, ${flash.life * 0.8})`;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 24;
      this.ctx.beginPath();
      this.ctx.arc(flash.x, flash.y, flash.radius * (1 - flash.life * 0.5), 0, Math.PI * 2);
      this.ctx.fill();

      // Crosshair Flash Burst
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${flash.life})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.moveTo(flash.x - 35, flash.y);
      this.ctx.lineTo(flash.x + 35, flash.y);
      this.ctx.moveTo(flash.x, flash.y - 35);
      this.ctx.lineTo(flash.x, flash.y + 35);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 2. Update and Draw Flying Birds
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
        b.fallSpeed += 0.4;
        b.y += b.fallSpeed;
        b.rotation += b.rotSpeed;

        if (b.y > h + 80) {
          this.birds.splice(i, 1);
          this.spawnBird();
          continue;
        }
      }

      this.drawBird(b);
    }

    // Maintain flock count
    while (this.birds.length < 7) {
      this.spawnBird();
    }

    // 3. Update and Draw Feathers
    for (let i = this.feathers.length - 1; i >= 0; i--) {
      const f = this.feathers[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.08;
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
      this.ctx.shadowBlur = 8;

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
      this.ctx.font = '900 17px "Cinzel", serif';
      this.ctx.fillStyle = `rgba(255, 255, 255, ${txt.opacity})`;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 14;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(txt.text, txt.x, txt.y);
      this.ctx.restore();
    }

    // 5. Draw Tactical AKM Scope Reticle (only when active and not hovering cards/buttons)
    const isMouseActive = now - this.lastMouseMoveTime < 2500;
    if (this.mouseX > 0 && this.mouseY > 0 && isMouseActive && !this.isHoveringClickable) {
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
      const angle = Math.atan2(b.vy, b.vx);
      this.ctx.rotate(angle);
      if (b.vx < 0) {
        this.ctx.scale(1, -1);
      }
    }

    const wingFlap = Math.sin(b.wingAngle) * (b.size * 0.95);

    this.ctx.fillStyle = b.color;
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
    this.ctx.shadowBlur = 12;

    // Bird Body
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, b.size * 0.8, b.size * 0.35, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Head
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
    this.ctx.shadowBlur = 10;

    // Outer Reticle Circle
    this.ctx.beginPath();
    this.ctx.arc(x, y, 16, 0, Math.PI * 2);
    this.ctx.stroke();

    // Inner Center Dot
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    // 4 Crosshair Lines
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
