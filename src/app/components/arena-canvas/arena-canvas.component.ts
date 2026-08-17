import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  effect,
  inject,
  input
} from '@angular/core';
import * as THREE from 'three';
import { CombatEvent, EntityState, WasmEngineService } from '../../core/services/wasm-engine.service';
import { AudioService } from '../../core/services/audio.service';
import { CharacterConfigService } from '../../core/services/character-config.service';

@Component({
  selector: 'app-arena-canvas',
  standalone: true,
  template: `
    <div class="canvas-container" #container>
      <canvas #canvas></canvas>
      @if (whiteFlash()) {
        <div class="white-flash"></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    .canvas-container {
      width: 100%;
      height: 100%;
      position: relative;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    .white-flash {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.85);
      pointer-events: none;
      animation: flashFade 0.15s ease-out forwards;
      z-index: 10;
    }
    @keyframes flashFade {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `]
})
export class ArenaCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  readonly mode = input<'explore' | 'combat'>('combat');

  private wasmEngine = inject(WasmEngineService);
  private audio = inject(AudioService);
  private charConfig = inject(CharacterConfigService);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animId = 0;
  private clock = new THREE.Clock();

  // 3D Meshes
  private playerMesh!: THREE.Group;
  private opponentMesh!: THREE.Group;
  private arenaRingMesh!: THREE.Mesh;
  private crackFloorMesh!: THREE.Mesh;
  private crackMaterial!: THREE.ShaderMaterial;
  private sparkParticles!: THREE.Points;
  private sparkGeometry!: THREE.BufferGeometry;

  whiteFlash = this.wasmEngine.hitStopActive;

  // Input states
  private keys: { [key: string]: boolean } = {};
  private currentAction = EntityState.IDLE;

  constructor() {
    effect(() => {
      const event = this.wasmEngine.latestEvent();
      if (event === CombatEvent.PERFECT_PARRY) {
        this.triggerParryVFX();
      } else if (event === CombatEvent.HIT) {
        this.audio.playHit();
      } else if (event === CombatEvent.ULT_TRIGGERED) {
        this.audio.playUlt();
      }
    });

    // Reactive 3D Character Mesh Updates
    effect(() => {
      const p = this.charConfig.selectedPlayer();
      const opp = this.charConfig.selectedOpponent();
      if (this.scene && this.playerMesh && this.opponentMesh) {
        this.scene.remove(this.playerMesh);
        this.scene.remove(this.opponentMesh);
        this.createCharacters();
      }
    });
  }

  ngOnInit(): void {
    this.initThree();
    this.setupEventListeners();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('resize', this.handleResize);
    this.renderer.dispose();
  }

  private initThree(): void {
    const width = this.containerRef.nativeElement.clientWidth || window.innerWidth;
    const height = this.containerRef.nativeElement.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0c);
    this.scene.fog = new THREE.FogExp2(0x0a0a0c, 0.035);

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    this.camera.position.set(0, 7, 13);
    this.camera.lookAt(0, 1, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x4facfe, 2, 20);
    pointLight.position.set(0, 4, 0);
    this.scene.add(pointLight);

    this.createArena();
    this.createCharacters();
    this.createSparkSystem();
  }

  private createArena(): void {
    const radius = this.wasmEngine.arenaRadius;

    // 1. Multi-layered circular stone floor
    const floorGeo = new THREE.CylinderGeometry(radius, radius * 1.05, 0.6, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x121216,
      roughness: 0.7,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.3;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Inner tatami / combat ring
    const innerRingGeo = new THREE.CylinderGeometry(radius * 0.85, radius * 0.85, 0.05, 64);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a22,
      roughness: 0.85,
      metalness: 0.1
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerMat);
    innerRing.position.y = 0.01;
    innerRing.receiveShadow = true;
    this.scene.add(innerRing);

    // Glowing perimeter ink boundary
    const ringGeo = new THREE.TorusGeometry(radius, 0.12, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    this.arenaRingMesh = new THREE.Mesh(ringGeo, ringMat);
    this.arenaRingMesh.rotation.x = Math.PI / 2;
    this.arenaRingMesh.position.y = 0.04;
    this.scene.add(this.arenaRingMesh);

    // 2. Surrounding Ancient Stone Lanterns / Pillars
    const lanternCount = 8;
    for (let i = 0; i < lanternCount; i++) {
      const angle = (i / lanternCount) * Math.PI * 2;
      const lantern = this.createStoneLantern();
      lantern.position.set(
        Math.cos(angle) * (radius + 2.2),
        0,
        Math.sin(angle) * (radius + 2.2)
      );
      this.scene.add(lantern);
    }

    // 3. Dynamic procedural crack floor
    const crackGeo = new THREE.PlaneGeometry(20, 20, 32, 32);
    this.crackMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uProgress: { value: 0.0 },
        uOrigin: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(0x00f2fe) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uProgress;
        uniform vec2 uOrigin;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float d = distance(vUv * 20.0 - 10.0, uOrigin);
          float ring = smoothstep(uProgress * 12.0, (uProgress * 12.0) - 2.0, d);
          float glow = (1.0 - uProgress) * ring;
          if (glow <= 0.05) discard;
          gl_FragColor = vec4(uColor, glow * 0.95);
        }
      `
    });
    this.crackFloorMesh = new THREE.Mesh(crackGeo, this.crackMaterial);
    this.crackFloorMesh.rotation.x = -Math.PI / 2;
    this.crackFloorMesh.position.y = 0.06;
    this.scene.add(this.crackFloorMesh);
  }

  private createStoneLantern(): THREE.Group {
    const group = new THREE.Group();

    // Pillar base
    const baseGeo = new THREE.CylinderGeometry(0.3, 0.45, 1.4, 8);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x22222a, roughness: 0.9 });
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 0.7;
    group.add(base);

    // Glowing lantern core
    const coreGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x4facfe,
      emissive: 0x4facfe,
      emissiveIntensity: 1.5
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 1.6;
    group.add(core);

    // Lantern Roof
    const roofGeo = new THREE.ConeGeometry(0.6, 0.35, 4);
    const roof = new THREE.Mesh(roofGeo, stoneMat);
    roof.position.y = 2.0;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    return group;
  }

  private createCharacters(): void {
    const pId = this.charConfig.selectedPlayer().id;
    const oppId = this.charConfig.selectedOpponent().id;

    // 1. Create Stylized 3D Player Character
    this.playerMesh = this.buildStylizedFighter(0x4facfe, 0x00f2fe, pId);
    this.scene.add(this.playerMesh);

    // 2. Create Stylized 3D Opponent Fighter
    this.opponentMesh = this.buildStylizedFighter(0xff416c, 0xff4b2b, oppId);
    this.scene.add(this.opponentMesh);
  }

  private buildStylizedFighter(primaryColor: number, emissiveColor: number, charId: string): THREE.Group {
    const fighter = new THREE.Group();

    // Base Materials
    const bodyMat = new THREE.MeshStandardMaterial({ color: primaryColor, roughness: 0.35, metalness: 0.4 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 });
    const navyMat = new THREE.MeshStandardMaterial({ color: 0x111c2e, roughness: 0.4, metalness: 0.2 });
    const saffronMat = new THREE.MeshStandardMaterial({ color: 0xff7700, roughness: 0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x15151b, roughness: 0.6, metalness: 0.3 });
    const glowMat = new THREE.MeshStandardMaterial({ color: emissiveColor, emissive: emissiveColor, emissiveIntensity: 1.4 });

    // 1. Torso & Outfits
    let torsoMesh: THREE.Mesh;
    if (charId === 'donald_trump') {
      // Navy Executive Suit Jacket
      const torsoGeo = new THREE.BoxGeometry(1.2, 1.2, 0.7);
      torsoMesh = new THREE.Mesh(torsoGeo, navyMat);
      torsoMesh.position.y = 1.4;
      fighter.add(torsoMesh);

      // White Shirt V-collar
      const shirtGeo = new THREE.BoxGeometry(0.4, 0.6, 0.72);
      const shirt = new THREE.Mesh(shirtGeo, whiteMat);
      shirt.position.set(0, 1.5, 0.02);
      fighter.add(shirt);

      // Signature Long Red Tie
      const tieGeo = new THREE.BoxGeometry(0.16, 0.85, 0.75);
      const tieMat = new THREE.MeshStandardMaterial({ color: 0xee2727, roughness: 0.3 });
      const tie = new THREE.Mesh(tieGeo, tieMat);
      tie.position.set(0, 1.3, 0.04);
      fighter.add(tie);
    } else if (charId === 'modi_ji') {
      // White Kurta Body
      const kurtaGeo = new THREE.BoxGeometry(1.1, 1.3, 0.65);
      torsoMesh = new THREE.Mesh(kurtaGeo, whiteMat);
      torsoMesh.position.y = 1.35;
      fighter.add(torsoMesh);

      // Saffron Modi Sleeveless Vest / Jacket
      const vestGeo = new THREE.BoxGeometry(1.15, 0.95, 0.7);
      const vest = new THREE.Mesh(vestGeo, saffronMat);
      vest.position.set(0, 1.45, 0);
      fighter.add(vest);
    } else if (charId === 'ravi_kishan') {
      // Stylized Saffron/Maroon Kurta with Golden Shawl
      const kurtaGeo = new THREE.BoxGeometry(1.15, 1.2, 0.68);
      torsoMesh = new THREE.Mesh(kurtaGeo, bodyMat);
      torsoMesh.position.y = 1.4;
      fighter.add(torsoMesh);

      // Gold Chain / Shawl Border
      const shawlGeo = new THREE.BoxGeometry(0.2, 1.1, 0.74);
      const shawl = new THREE.Mesh(shawlGeo, goldMat);
      shawl.position.set(-0.25, 1.4, 0.02);
      fighter.add(shawl);
    } else {
      // Muscular Armor / Hakama
      const torsoGeo = new THREE.BoxGeometry(1.1, 1.1, 0.65);
      torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
      torsoMesh.position.y = 1.4;
      fighter.add(torsoMesh);

      const beltGeo = new THREE.BoxGeometry(1.15, 0.2, 0.7);
      const belt = new THREE.Mesh(beltGeo, darkMat);
      belt.position.y = 0.9;
      fighter.add(belt);
    }

    // 2. Legs / Pants
    const legMat = (charId === 'donald_trump') ? navyMat : (charId === 'modi_ji' ? whiteMat : darkMat);
    const leftLegGeo = new THREE.BoxGeometry(0.42, 0.9, 0.5);
    const leftLeg = new THREE.Mesh(leftLegGeo, legMat);
    leftLeg.position.set(-0.3, 0.45, 0);
    leftLeg.castShadow = true;
    fighter.add(leftLeg);

    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.3;
    fighter.add(rightLeg);

    // 3. Head & Distinct Hairstyles / Facial Features
    const headGroup = new THREE.Group();
    headGroup.position.y = 2.25;

    const skinTone = (charId === 'donald_trump') ? 0xffc499 : (charId === 'modi_ji' ? 0xe6b89c : 0xd99b77);
    const skinMat = new THREE.MeshStandardMaterial({ color: skinTone, roughness: 0.5 });
    const headGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    if (charId === 'donald_trump') {
      // Signature Blonde Swept Hair
      const hairGeo = new THREE.BoxGeometry(0.75, 0.3, 0.85);
      const hairMat = new THREE.MeshStandardMaterial({ color: 0xffd447, roughness: 0.4 });
      const hair = new THREE.Mesh(hairGeo, hairMat);
      hair.position.set(0, 0.38, 0.05);
      hair.rotation.z = -0.08;
      headGroup.add(hair);
    } else if (charId === 'modi_ji') {
      // White Hair & Signature Beard
      const hairGeo = new THREE.BoxGeometry(0.72, 0.25, 0.72);
      const beardGeo = new THREE.BoxGeometry(0.68, 0.35, 0.3);
      const whiteHairMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
      const hair = new THREE.Mesh(hairGeo, whiteHairMat);
      hair.position.y = 0.36;
      headGroup.add(hair);

      const beard = new THREE.Mesh(beardGeo, whiteHairMat);
      beard.position.set(0, -0.22, 0.24);
      headGroup.add(beard);

      // Spectacles
      const specsGeo = new THREE.BoxGeometry(0.55, 0.12, 0.12);
      const specs = new THREE.Mesh(specsGeo, goldMat);
      specs.position.set(0, 0.06, 0.34);
      headGroup.add(specs);
    } else if (charId === 'ravi_kishan') {
      // Stylish Dark Hair & Aviator Shades
      const hairGeo = new THREE.BoxGeometry(0.72, 0.3, 0.72);
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3 });
      const hair = new THREE.Mesh(hairGeo, hairMat);
      hair.position.y = 0.38;
      headGroup.add(hair);

      // Dark Aviator Shades
      const shadesGeo = new THREE.BoxGeometry(0.68, 0.18, 0.18);
      const shadesMat = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.9, roughness: 0.1 });
      const shades = new THREE.Mesh(shadesGeo, shadesMat);
      shades.position.set(0, 0.06, 0.32);
      headGroup.add(shades);
    } else {
      // Default Samurai / Kasa Hat
      const hatGeo = new THREE.ConeGeometry(1.1, 0.35, 16);
      const hat = new THREE.Mesh(hatGeo, darkMat);
      hat.position.y = 0.45;
      headGroup.add(hat);
    }
    fighter.add(headGroup);

    // 4. Arms & Signature Weapon Props
    const armMat = (charId === 'donald_trump') ? navyMat : (charId === 'modi_ji' ? whiteMat : bodyMat);
    const armGeo = new THREE.BoxGeometry(0.35, 0.85, 0.35);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.name = 'rightArm';
    rightArmGroup.position.set(0.75, 1.7, 0);

    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.y = -0.35;
    rightArmGroup.add(arm);

    // Weapon
    const bladeGroup = new THREE.Group();
    bladeGroup.name = 'weapon';
    bladeGroup.position.set(0, -0.7, 0.2);

    const hiltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.4, 8);
    const hilt = new THREE.Mesh(hiltGeo, darkMat);
    bladeGroup.add(hilt);

    const swordBladeGeo = new THREE.BoxGeometry(0.09, 1.9, 0.12);
    const swordMat = new THREE.MeshStandardMaterial({
      color: (charId === 'donald_trump' || charId === 'ravi_kishan') ? 0xffd700 : 0xffffff,
      emissive: emissiveColor,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.1
    });
    const swordBlade = new THREE.Mesh(swordBladeGeo, swordMat);
    swordBlade.position.y = 1.15;
    bladeGroup.add(swordBlade);

    bladeGroup.rotation.x = Math.PI / 3;
    rightArmGroup.add(bladeGroup);
    fighter.add(rightArmGroup);

    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.75, 1.7, 0);
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.y = -0.35;
    leftArmGroup.add(leftArm);
    leftArmGroup.rotation.x = -0.4;
    leftArmGroup.rotation.z = 0.3;
    fighter.add(leftArmGroup);

    // Ground Aura
    const shadowGeo = new THREE.RingGeometry(0.2, 1.15, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: emissiveColor, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = Math.PI / 2;
    shadow.position.y = 0.02;
    fighter.add(shadow);

    return fighter;
  }

  private createSparkSystem(): void {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = 0;
    }
    this.sparkGeometry = new THREE.BufferGeometry();
    this.sparkGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.sparkParticles = new THREE.Points(this.sparkGeometry, sparkMat);
    this.sparkParticles.visible = false;
    this.scene.add(this.sparkParticles);
  }

  private triggerParryVFX(): void {
    this.audio.playParry();
    this.sparkParticles.visible = true;
    const p = this.wasmEngine.player;
    this.sparkParticles.position.set(p.x, 1.2, p.z - 0.8);

    const positions = this.sparkGeometry.attributes['position'].array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2.5;
      positions[i + 1] = (Math.random() - 0.5) * 2.5;
      positions[i + 2] = (Math.random() - 0.5) * 2.5;
    }
    this.sparkGeometry.attributes['position'].needsUpdate = true;

    setTimeout(() => {
      this.sparkParticles.visible = false;
    }, 250);
  }

  private setupEventListeners(): void {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    this.keys[e.code] = true;
    // Player 1 controls
    if (e.code === 'KeyJ' || e.code === 'KeyZ') {
      this.currentAction = EntityState.ATTACK;
      this.audio.playAttack();
    } else if (e.code === 'KeyK' || e.code === 'KeyX') {
      this.currentAction = EntityState.PARRY;
    } else if (e.code === 'KeyL' || e.code === 'KeyC') {
      this.currentAction = EntityState.BLOCK;
    } else if (e.code === 'Space') {
      this.wasmEngine.triggerUlt();
    }

    // Player 2 controls (PvP Mode)
    if (e.code === 'KeyU' || e.code === 'Numpad1') {
      this.currentP2Action = EntityState.ATTACK;
      this.audio.playAttack();
    } else if (e.code === 'KeyI' || e.code === 'Numpad2') {
      this.currentP2Action = EntityState.PARRY;
    } else if (e.code === 'KeyO' || e.code === 'Numpad3') {
      this.currentP2Action = EntityState.BLOCK;
    }
  }

  private currentP2Action = EntityState.IDLE;

  private handleKeyUp(e: KeyboardEvent): void {
    this.keys[e.code] = false;
    if (
      !this.keys['KeyJ'] &&
      !this.keys['KeyK'] &&
      !this.keys['KeyL'] &&
      !this.keys['KeyZ'] &&
      !this.keys['KeyX'] &&
      !this.keys['KeyC']
    ) {
      this.currentAction = EntityState.IDLE;
    }

    if (
      !this.keys['KeyU'] &&
      !this.keys['KeyI'] &&
      !this.keys['KeyO'] &&
      !this.keys['Numpad1'] &&
      !this.keys['Numpad2'] &&
      !this.keys['Numpad3']
    ) {
      this.currentP2Action = EntityState.IDLE;
    }
  }

  private handleResize(): void {
    const width = this.containerRef.nativeElement.clientWidth || window.innerWidth;
    const height = this.containerRef.nativeElement.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate = (): void => {
    this.animId = requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 0.05);

    // Player 1 Move Vectors (WASD)
    let moveX = 0;
    let moveZ = 0;
    if (this.keys['KeyW']) moveZ -= 1;
    if (this.keys['KeyS']) moveZ += 1;
    if (this.keys['KeyA']) moveX -= 1;
    if (this.keys['KeyD']) moveX += 1;

    const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (len > 0) {
      moveX /= len;
      moveZ /= len;
    }

    // Player 2 Move Vectors (Arrow Keys in PvP)
    let p2MoveX = 0;
    let p2MoveZ = 0;
    if (this.wasmEngine.gameMode() === 'pvp') {
      if (this.keys['ArrowUp']) p2MoveZ -= 1;
      if (this.keys['ArrowDown']) p2MoveZ += 1;
      if (this.keys['ArrowLeft']) p2MoveX -= 1;
      if (this.keys['ArrowRight']) p2MoveX += 1;
      const p2Len = Math.sqrt(p2MoveX * p2MoveX + p2MoveZ * p2MoveZ);
      if (p2Len > 0) {
        p2MoveX /= p2Len;
        p2MoveZ /= p2Len;
      }
    }

    // Step physics & simulation via WASM engine
    this.wasmEngine.update(dt, this.currentAction, moveX, moveZ, this.currentP2Action, p2MoveX, p2MoveZ);

    // Sync 3D transforms
    const p = this.wasmEngine.player;
    const ai = this.wasmEngine.opponent;

    this.playerMesh.position.set(p.x, p.y, p.z);
    this.playerMesh.rotation.y = p.rotation;

    this.opponentMesh.position.set(ai.x, ai.y, ai.z);
    this.opponentMesh.rotation.y = ai.rotation;

    // Dynamic Attack Arm Animations
    const pArm = this.playerMesh.getObjectByName('rightArm');
    if (pArm) {
      if (p.state === EntityState.ATTACK) {
        pArm.rotation.x = Math.sin((1 - (p.stateTimer / 0.35)) * Math.PI) * 1.6;
        pArm.rotation.z = -0.6;
      } else if (p.state === EntityState.PARRY) {
        pArm.rotation.x = -0.8;
        pArm.rotation.z = 0.5;
      } else {
        pArm.rotation.x = 0;
        pArm.rotation.z = 0;
      }
    }

    const aiArm = this.opponentMesh.getObjectByName('rightArm');
    if (aiArm) {
      if (ai.state === EntityState.ATTACK) {
        aiArm.rotation.x = Math.sin((1 - (ai.stateTimer / 0.35)) * Math.PI) * 1.6;
        aiArm.rotation.z = -0.6;
      } else if (ai.state === EntityState.PARRY) {
        aiArm.rotation.x = -0.8;
        aiArm.rotation.z = 0.5;
      } else {
        aiArm.rotation.x = 0;
        aiArm.rotation.z = 0;
      }
    }

    // Update Ult ground crack shader
    if (this.wasmEngine.ultActive()) {
      this.crackMaterial.uniforms['uProgress'].value = this.wasmEngine.ultProgress();
      this.crackMaterial.uniforms['uOrigin'].value.set(this.wasmEngine.ultOriginX, this.wasmEngine.ultOriginZ);
    } else {
      this.crackMaterial.uniforms['uProgress'].value = 0.0;
    }

    // Smooth combat camera tracking
    const midX = (p.x + ai.x) * 0.5;
    const midZ = (p.z + ai.z) * 0.5;
    this.camera.position.x += (midX - this.camera.position.x) * 0.08;
    this.camera.position.z += (p.z + 9.5 - this.camera.position.z) * 0.08;
    this.camera.lookAt(midX, 1.4, midZ);

    this.renderer.render(this.scene, this.camera);
  };
}
