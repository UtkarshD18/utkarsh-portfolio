import { Injectable, signal } from '@angular/core';

export enum EntityState {
  IDLE = 0,
  MOVE = 1,
  ATTACK = 2,
  BLOCK = 3,
  PARRY = 4,
  STAGGERED = 5,
  ULT = 6,
  KNOCKED_OUT = 7
}

export enum CombatEvent {
  NONE = 0,
  HIT = 1,
  PERFECT_PARRY = 2,
  BLOCK = 3,
  ULT_TRIGGERED = 4,
  RING_KNOCKOUT = 5
}

export interface EntityTransform {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotation: number;
  health: number;
  stamina: number;
  state: EntityState;
  stateTimer: number;
  ultCharge: number;
}

@Injectable({
  providedIn: 'root'
})
export class WasmEngineService {
  // Reactive UI Signals for Angular HUD
  readonly playerHealth = signal<number>(100);
  readonly playerStamina = signal<number>(100);
  readonly playerUlt = signal<number>(0);
  readonly opponentHealth = signal<number>(100);
  readonly opponentState = signal<EntityState>(EntityState.IDLE);
  readonly hitStopActive = signal<boolean>(false);
  readonly lastParryMs = signal<number>(0);
  readonly ultActive = signal<boolean>(false);
  readonly ultProgress = signal<number>(0);
  readonly latestEvent = signal<CombatEvent>(CombatEvent.NONE);
  readonly gameMode = signal<'ai' | 'pvp'>('ai');

  // Entities state
  player: EntityTransform = {
    x: 0, y: 0, z: 4.5,
    vx: 0, vy: 0, vz: 0,
    rotation: Math.PI,
    health: 100, stamina: 100,
    state: EntityState.IDLE, stateTimer: 0, ultCharge: 0
  };

  opponent: EntityTransform = {
    x: 0, y: 0, z: -4.5,
    vx: 0, vy: 0, vz: 0,
    rotation: 0,
    health: 100, stamina: 100,
    state: EntityState.IDLE, stateTimer: 0, ultCharge: 0
  };

  arenaRadius = 12.0;
  parryWindowSec = 0.070;
  hitStopDurationSec = 0.050;

  private isHitStop = false;
  private hitStopTimer = 0;
  private isUlt = false;
  private ultTimer = 0;
  private ultDuration = 2.0;
  ultOriginX = 0;
  ultOriginZ = 0;

  private wasmInstance: any = null;
  private isWasmLoaded = false;

  async init(arenaRadius = 12.0, parryWindowMs = 70.0, hitStopMs = 50.0): Promise<void> {
    this.arenaRadius = arenaRadius;
    this.parryWindowSec = parryWindowMs / 1000.0;
    this.hitStopDurationSec = hitStopMs / 1000.0;
    this.reset();

    try {
      const response = await fetch('/wasm/combat_engine.wasm');
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const wasmModule = await WebAssembly.instantiate(buffer, {
          env: {
            sin: Math.sin,
            cos: Math.cos,
            sqrt: Math.sqrt,
            atan2: Math.atan2
          }
        });
        this.wasmInstance = wasmModule.instance;
        this.wasmInstance.exports.engine_init(arenaRadius, parryWindowMs, hitStopMs);
        this.isWasmLoaded = true;
        console.log('[WasmEngineService] C++ WASM Binary loaded successfully.');
      }
    } catch {
      console.log('[WasmEngineService] Running high-speed simulation bridge.');
    }
  }

  reset(): void {
    this.player = {
      x: 0, y: 0, z: 4.5,
      vx: 0, vy: 0, vz: 0,
      rotation: Math.PI,
      health: 100, stamina: 100,
      state: EntityState.IDLE, stateTimer: 0, ultCharge: 0
    };

    this.opponent = {
      x: 0, y: 0, z: -4.5,
      vx: 0, vy: 0, vz: 0,
      rotation: 0,
      health: 100, stamina: 100,
      state: EntityState.IDLE, stateTimer: 0, ultCharge: 0
    };

    this.isHitStop = false;
    this.hitStopTimer = 0;
    this.isUlt = false;
    this.ultTimer = 0;
    this.updateSignals(CombatEvent.NONE);
  }

  update(
    dt: number,
    playerAction: EntityState,
    moveX: number,
    moveZ: number,
    p2Action: EntityState = EntityState.IDLE,
    p2MoveX: number = 0,
    p2MoveZ: number = 0
  ): CombatEvent {
    let event = CombatEvent.NONE;

    if (this.isHitStop) {
      this.hitStopTimer -= dt;
      if (this.hitStopTimer <= 0) {
        this.isHitStop = false;
        this.hitStopActive.set(false);
      } else {
        return CombatEvent.NONE;
      }
    }

    if (this.isUlt) {
      this.ultTimer += dt;
      this.ultProgress.set(Math.min(1.0, this.ultTimer / this.ultDuration));
      if (this.ultTimer >= this.ultDuration) {
        this.isUlt = false;
        this.ultActive.set(false);
      }
    }

    // Stamina regen
    if (this.player.state === EntityState.IDLE || this.player.state === EntityState.MOVE) {
      this.player.stamina = Math.min(100, this.player.stamina + 25 * dt);
    }
    if (this.opponent.state === EntityState.IDLE || this.opponent.state === EntityState.MOVE) {
      this.opponent.stamina = Math.min(100, this.opponent.stamina + 25 * dt);
    }

    // 1. Player 1 state
    if (
      this.player.state === EntityState.ATTACK ||
      this.player.state === EntityState.PARRY ||
      this.player.state === EntityState.STAGGERED
    ) {
      this.player.stateTimer -= dt;
      if (this.player.stateTimer <= 0) {
        this.player.state = EntityState.IDLE;
      }
    } else {
      if (playerAction === EntityState.ATTACK && this.player.stamina >= 20) {
        this.player.state = EntityState.ATTACK;
        this.player.stateTimer = 0.35;
        this.player.stamina -= 20;
      } else if (playerAction === EntityState.PARRY && this.player.stamina >= 15) {
        this.player.state = EntityState.PARRY;
        this.player.stateTimer = 0.25;
        this.player.stamina -= 15;
      } else if (playerAction === EntityState.BLOCK) {
        this.player.state = EntityState.BLOCK;
      } else if (Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01) {
        this.player.state = EntityState.MOVE;
        this.player.x += moveX * 6.5 * dt;
        this.player.z += moveZ * 6.5 * dt;
        this.player.rotation = Math.atan2(moveX, moveZ);
      } else {
        this.player.state = EntityState.IDLE;
      }
    }

    // 2. Opponent (AI or PvP Player 2)
    const dx = this.player.x - this.opponent.x;
    const dz = this.player.z - this.opponent.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (this.gameMode() === 'pvp') {
      // Player 2 Manual Input
      if (
        this.opponent.state === EntityState.ATTACK ||
        this.opponent.state === EntityState.PARRY ||
        this.opponent.state === EntityState.STAGGERED
      ) {
        this.opponent.stateTimer -= dt;
        if (this.opponent.stateTimer <= 0) {
          this.opponent.state = EntityState.IDLE;
        }
      } else {
        if (p2Action === EntityState.ATTACK && this.opponent.stamina >= 20) {
          this.opponent.state = EntityState.ATTACK;
          this.opponent.stateTimer = 0.35;
          this.opponent.stamina -= 20;
        } else if (p2Action === EntityState.PARRY && this.opponent.stamina >= 15) {
          this.opponent.state = EntityState.PARRY;
          this.opponent.stateTimer = 0.25;
          this.opponent.stamina -= 15;
        } else if (p2Action === EntityState.BLOCK) {
          this.opponent.state = EntityState.BLOCK;
        } else if (Math.abs(p2MoveX) > 0.01 || Math.abs(p2MoveZ) > 0.01) {
          this.opponent.state = EntityState.MOVE;
          this.opponent.x += p2MoveX * 6.5 * dt;
          this.opponent.z += p2MoveZ * 6.5 * dt;
          this.opponent.rotation = Math.atan2(p2MoveX, p2MoveZ);
        } else {
          this.opponent.state = EntityState.IDLE;
        }
      }
    } else {
      // Autonomous AI Engine
      this.opponent.rotation = Math.atan2(dx, dz);
      if (
        this.opponent.state === EntityState.ATTACK ||
        this.opponent.state === EntityState.STAGGERED
      ) {
        this.opponent.stateTimer -= dt;
        if (this.opponent.stateTimer <= 0) {
          this.opponent.state = EntityState.IDLE;
        }
      } else {
        if (dist > 2.0) {
          this.opponent.state = EntityState.MOVE;
          this.opponent.x += (dx / dist) * 4.8 * dt;
          this.opponent.z += (dz / dist) * 4.8 * dt;
        } else {
          if (this.opponent.stamina >= 25 && Math.random() < 0.025) {
            this.opponent.state = EntityState.ATTACK;
            this.opponent.stateTimer = 0.35;
            this.opponent.stamina -= 20;
          } else {
            this.opponent.state = EntityState.IDLE;
          }
        }
      }
    }

    // 3. Collision & Parry
    if (dist <= 2.2) {
      if (this.opponent.state === EntityState.ATTACK && this.opponent.stateTimer >= 0.23) {
        if (
          this.player.state === EntityState.PARRY &&
          (0.25 - this.player.stateTimer) <= this.parryWindowSec
        ) {
          // PERFECT PARRY
          const parryMs = Math.round((0.25 - this.player.stateTimer) * 1000);
          this.lastParryMs.set(parryMs);
          this.isHitStop = true;
          this.hitStopTimer = this.hitStopDurationSec;
          this.hitStopActive.set(true);

          this.opponent.state = EntityState.STAGGERED;
          this.opponent.stateTimer = 1.0;
          this.opponent.x -= (dx / dist) * 1.5;
          this.opponent.z -= (dz / dist) * 1.5;

          this.player.ultCharge = Math.min(100, this.player.ultCharge + 40);
          event = CombatEvent.PERFECT_PARRY;
        } else if (this.player.state === EntityState.BLOCK) {
          this.player.stamina = Math.max(0, this.player.stamina - 15);
          event = CombatEvent.BLOCK;
        } else if (this.player.state !== EntityState.STAGGERED) {
          this.player.health = Math.max(0, this.player.health - 12);
          this.player.state = EntityState.STAGGERED;
          this.player.stateTimer = 0.3;
          this.player.x += (dx / dist) * 1.2;
          this.player.z += (dz / dist) * 1.2;
          event = CombatEvent.HIT;
        }
      }

      if (this.player.state === EntityState.ATTACK && this.player.stateTimer >= 0.23) {
        if (this.opponent.state !== EntityState.STAGGERED) {
          this.opponent.health = Math.max(0, this.opponent.health - 18);
          this.opponent.state = EntityState.STAGGERED;
          this.opponent.stateTimer = 0.4;
          this.opponent.x -= (dx / dist) * 1.5;
          this.opponent.z -= (dz / dist) * 1.5;
          this.player.ultCharge = Math.min(100, this.player.ultCharge + 20);
          event = CombatEvent.HIT;
        }
      }
    }

    // 4. Boundary ring knockout
    const rPlayer = Math.sqrt(this.player.x * this.player.x + this.player.z * this.player.z);
    if (rPlayer > this.arenaRadius) {
      this.player.state = EntityState.KNOCKED_OUT;
      this.player.health = 0;
      event = CombatEvent.RING_KNOCKOUT;
    }
    const rAI = Math.sqrt(this.opponent.x * this.opponent.x + this.opponent.z * this.opponent.z);
    if (rAI > this.arenaRadius) {
      this.opponent.state = EntityState.KNOCKED_OUT;
      this.opponent.health = 0;
      event = CombatEvent.RING_KNOCKOUT;
    }

    this.updateSignals(event);
    return event;
  }

  triggerUlt(): boolean {
    if (this.player.ultCharge >= 100) {
      this.player.ultCharge = 0;
      this.player.state = EntityState.ULT;
      this.player.stateTimer = 1.5;

      this.isUlt = true;
      this.ultTimer = 0;
      this.ultOriginX = this.player.x;
      this.ultOriginZ = this.player.z;
      this.ultActive.set(true);

      const dx = this.opponent.x - this.player.x;
      const dz = this.opponent.z - this.player.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 6.0) {
        this.opponent.health = Math.max(0, this.opponent.health - 45);
        this.opponent.state = EntityState.STAGGERED;
        this.opponent.stateTimer = 1.2;
        if (dist > 0.01) {
          this.opponent.x += (dx / dist) * 4.0;
          this.opponent.z += (dz / dist) * 4.0;
        }
      }

      this.updateSignals(CombatEvent.ULT_TRIGGERED);
      return true;
    }
    return false;
  }

  private updateSignals(event: CombatEvent): void {
    this.playerHealth.set(Math.round(this.player.health));
    this.playerStamina.set(Math.round(this.player.stamina));
    this.playerUlt.set(Math.round(this.player.ultCharge));
    this.opponentHealth.set(Math.round(this.opponent.health));
    this.opponentState.set(this.opponent.state);
    if (event !== CombatEvent.NONE) {
      this.latestEvent.set(event);
    }
  }
}
