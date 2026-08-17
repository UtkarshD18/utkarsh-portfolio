import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../core/services/audio.service';

interface LeafParticle {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  swingAngle: number;
  swingSpeed: number;
  color: string;
  type: 'ginkgo' | 'momiji' | 'bamboo';
  opacity: number;
  isCut: boolean;
  cutProgress: number;
  half?: 'left' | 'right';
  cutAngle?: number;
}

interface BladePoint {
  x: number;
  y: number;
  time: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

@Component({
  selector: 'app-wind-leaves',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #leafCanvas class="wind-leaves-canvas"></canvas>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 15;
    }
    .wind-leaves-canvas {
      width: 100vw;
      height: 100vh;
      display: block;
    }
  `]
})
export class WindLeavesComponent implements OnInit, OnDestroy {
  @ViewChild('leafCanvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  private audio = inject(AudioService);
  private ctx!: CanvasRenderingContext2D;
  private animId: number = 0;

  private particles: LeafParticle[] = [];
  private sparks: SparkParticle[] = [];
  private bladeTrail: BladePoint[] = [];

  private lastMouseX = 0;
  private lastMouseY = 0;
  private mouseWindX = 0;
  private lastSliceSoundTime = 0;

  // High Contrast Monochrome Palette (Pure White, Silver, Slate, Charcoal)
  private colors = {
    pureWhite: '#ffffff',
    silver: '#e2e2e2',
    lightGray: '#cccccc',
    charcoal: '#333333'
  };

  ngOnInit(): void {
    const canvas = this.leafCanvas();
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    this.resizeCanvas();
    this.initParticles(55);
    this.loop();
  }

  ngOnDestroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  private leafCanvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @HostListener('window:resize')
  resizeCanvas(): void {
    const canvas = this.leafCanvas();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    // Add point to blade trail
    this.bladeTrail.push({ x, y, time: now });

    // Wind impulse
    const dx = x - this.lastMouseX;
    const dy = y - this.lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    this.mouseWindX = (dx / (window.innerWidth || 1)) * 12;

    // Real-Time Blade Slash Collision with floating leaves
    if (speed > 8) {
      this.checkBladeLeafCuts(this.lastMouseX, this.lastMouseY, x, y);
    }

    this.lastMouseX = x;
    this.lastMouseY = y;
  }

  private initParticles(count: number): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push(this.createRandomLeaf(Math.random() * (w + 200) - 100, Math.random() * h));
    }
  }

  private createRandomLeaf(x: number, y: number): LeafParticle {
    const rand = Math.random();
    const type: 'ginkgo' | 'momiji' | 'bamboo' = rand < 0.45 ? 'ginkgo' : rand < 0.8 ? 'momiji' : 'bamboo';
    const colorChoices = [this.colors.pureWhite, this.colors.silver, this.colors.lightGray];
    const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

    return {
      id: Math.random(),
      x,
      y,
      z: Math.random() * 0.8 + 0.5,
      size: Math.random() * 10 + 9,
      speedX: Math.random() * 1.4 + 0.6,
      speedY: Math.random() * 1.0 + 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      swingAngle: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.03 + 0.015,
      color,
      type,
      opacity: Math.random() * 0.4 + 0.55,
      isCut: false,
      cutProgress: 0
    };
  }

  private checkBladeLeafCuts(x1: number, y1: number, x2: number, y2: number): void {
    const newHalves: LeafParticle[] = [];

    for (let p of this.particles) {
      if (p.isCut) continue;

      // Distance from point p to line segment (x1,y1)-(x2,y2)
      const dist = this.distToSegment(p.x, p.y, x1, y1, x2, y2);
      if (dist < p.size * 1.3) {
        // Cut the leaf!
        p.isCut = true;
        const slashAngle = Math.atan2(y2 - y1, x2 - x1);

        // Spawn left half
        newHalves.push({
          ...p,
          id: Math.random(),
          half: 'left',
          cutAngle: slashAngle,
          speedX: p.speedX - Math.sin(slashAngle) * 3.5,
          speedY: p.speedY + Math.cos(slashAngle) * 2.5 + 1.2,
          rotSpeed: p.rotSpeed * 3 - 0.08,
          isCut: true
        });

        // Spawn right half
        newHalves.push({
          ...p,
          id: Math.random(),
          half: 'right',
          cutAngle: slashAngle,
          speedX: p.speedX + Math.sin(slashAngle) * 3.5,
          speedY: p.speedY - Math.cos(slashAngle) * 2.5 + 1.2,
          rotSpeed: p.rotSpeed * 3 + 0.08,
          isCut: true
        });

        // Trigger sword slash spark VFX
        this.spawnSparks(p.x, p.y, 8);

        // Audio blade slice trigger
        const now = performance.now();
        if (now - this.lastSliceSoundTime > 60) {
          this.audio.playBladeSlice();
          this.lastSliceSoundTime = now;
        }
      }
    }

    // Remove cut originals and add split halves
    this.particles = this.particles.filter(p => !p.isCut || p.half !== undefined).concat(newHalves);
  }

  private spawnSparks(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 4 + 2;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 1.0,
        maxLife: Math.random() * 0.25 + 0.2,
        size: Math.random() * 2.5 + 1.2
      });
    }
  }

  private distToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  }

  private loop = (): void => {
    const canvas = this.leafCanvas();
    const w = canvas.width;
    const h = canvas.height;
    const now = performance.now();

    this.ctx.clearRect(0, 0, w, h);

    // Fade wind decay
    this.mouseWindX *= 0.95;

    // 1. Draw & Clean Katana Blade Trail
    this.bladeTrail = this.bladeTrail.filter(pt => now - pt.time < 220);
    if (this.bladeTrail.length > 2) {
      this.ctx.save();
      for (let i = 1; i < this.bladeTrail.length; i++) {
        const p1 = this.bladeTrail[i - 1];
        const p2 = this.bladeTrail[i];
        const age = (now - p2.time) / 220;
        const alpha = (1 - age) * 0.95;
        const width = (1 - age) * 4.5;

        this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
        this.ctx.shadowColor = '#ffffff';
        this.ctx.shadowBlur = 12;

        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
      this.ctx.restore();
    }

    // 2. Draw Sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.04;

      if (s.life <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.fillStyle = `rgba(255, 255, 255, ${s.life})`;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Render Leaves
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.swingAngle += p.swingSpeed;
      const swing = Math.sin(p.swingAngle) * 0.8;
      p.x += (p.speedX + this.mouseWindX + swing) * p.z;
      p.y += p.speedY * p.z;
      p.rotation += p.rotSpeed;

      // Despawn cut leaves that fall off screen
      if (p.isCut && (p.y > h + 60 || p.x > w + 80 || p.x < -80)) {
        this.particles.splice(i, 1);
        // Replace with new full leaf
        this.particles.push(this.createRandomLeaf(-20, Math.random() * h * 0.8));
        continue;
      }

      // Wrap around bounds for normal leaves
      if (!p.isCut) {
        if (p.x > w + 60) p.x = -40;
        if (p.y > h + 40) {
          p.y = -30;
          p.x = Math.random() * (w + 100) - 50;
        }
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.opacity;

      // Draw Leaf (Whole or Cut Half)
      this.drawLeafGeometry(p);

      this.ctx.restore();
    }

    // Maintain leaf population
    while (this.particles.length < 55) {
      this.particles.push(this.createRandomLeaf(-30, Math.random() * h));
    }

    this.animId = requestAnimationFrame(this.loop);
  };

  private drawLeafGeometry(p: LeafParticle): void {
    this.ctx.fillStyle = p.color;
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 1;

    // High contrast drop shadow
    this.ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    this.ctx.shadowBlur = 6;

    if (p.half) {
      // Cut Half Leaf Shape
      this.ctx.beginPath();
      if (p.half === 'left') {
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(-p.size, -p.size * 0.8, -p.size * 0.6, -p.size * 1.5, 0, -p.size * 1.2);
        this.ctx.lineTo(0, 0);
      } else {
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -p.size * 1.2);
        this.ctx.bezierCurveTo(p.size * 0.6, -p.size * 1.5, p.size, -p.size * 0.8, 0, 0);
      }
      this.ctx.fill();
      this.ctx.stroke();
      return;
    }

    // Full Leaf Shapes
    if (p.type === 'ginkgo') {
      // Fan shaped Ginkgo
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(-p.size, -p.size * 0.8, -p.size * 0.6, -p.size * 1.5, 0, -p.size * 1.2);
      this.ctx.bezierCurveTo(p.size * 0.6, -p.size * 1.5, p.size, -p.size * 0.8, 0, 0);
      this.ctx.fill();
      this.ctx.stroke();
    } else if (p.type === 'momiji') {
      // 5-point Maple
      this.ctx.beginPath();
      for (let j = 0; j < 5; j++) {
        const a = (j / 5) * Math.PI * 1.6 - Math.PI * 0.8;
        const len = j === 2 ? p.size * 1.25 : p.size * 0.85;
        const x1 = Math.sin(a) * len;
        const y1 = -Math.cos(a) * len;
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(0, 0);
      }
      this.ctx.fill();
      this.ctx.stroke();
    } else {
      // Slender Bamboo leaf
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, p.size * 0.35, p.size * 1.3, Math.PI / 4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}
