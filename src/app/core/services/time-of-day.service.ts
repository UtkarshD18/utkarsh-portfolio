import { Injectable, OnDestroy, signal } from '@angular/core';

export type TimePhase = 'DAWN' | 'DAY' | 'DUSK' | 'NIGHT';

export interface PhaseInfo {
  phase: TimePhase;
  kanji: string;
  label: string;
  timeRange: string;
  skyGradient: string;
  sunMoonType: 'dawn_sun' | 'day_sun' | 'dusk_sun' | 'night_moon';
  sunMoonY: number; // percentage from top
  fogOpacity: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeOfDayService implements OnDestroy {
  private timerId: any = null;

  readonly manualPhase = signal<TimePhase | null>(null);
  readonly currentIstString = signal<string>('');
  readonly currentIstHour = signal<number>(0);
  readonly currentIstMinute = signal<number>(0);

  readonly phaseConfig: Record<TimePhase, PhaseInfo> = {
    DAWN: {
      phase: 'DAWN',
      kanji: '黎明',
      label: 'AKEBONO DAWN',
      timeRange: '04:30 - 06:45 IST',
      skyGradient: 'linear-gradient(180deg, #0d0d0f 0%, #1a1a20 40%, #2e2a28 75%, #4a3e36 100%)',
      sunMoonType: 'dawn_sun',
      sunMoonY: 58,
      fogOpacity: 0.85
    },
    DAY: {
      phase: 'DAY',
      kanji: '白日',
      label: 'ZENITH DAY',
      timeRange: '06:45 - 17:00 IST',
      skyGradient: 'linear-gradient(180deg, #111114 0%, #1f1f26 50%, #2c2c36 100%)',
      sunMoonType: 'day_sun',
      sunMoonY: 20,
      fogOpacity: 0.4
    },
    DUSK: {
      phase: 'DUSK',
      kanji: '黄昏',
      label: 'TWILIGHT DUSK',
      timeRange: '17:00 - 19:30 IST',
      skyGradient: 'linear-gradient(180deg, #0a0808 0%, #1a1212 40%, #301b1a 80%, #180e0e 100%)',
      sunMoonType: 'dusk_sun',
      sunMoonY: 65,
      fogOpacity: 0.65
    },
    NIGHT: {
      phase: 'NIGHT',
      kanji: '深夜',
      label: 'SHINYA MIDNIGHT',
      timeRange: '19:30 - 04:30 IST',
      skyGradient: 'linear-gradient(180deg, #000000 0%, #08080a 50%, #101014 100%)',
      sunMoonType: 'night_moon',
      sunMoonY: 22,
      fogOpacity: 0.5
    }
  };

  constructor() {
    this.updateIstTime();
    this.timerId = setInterval(() => this.updateIstTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  private updateIstTime(): void {
    const now = new Date();
    // UTC time in ms
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    // IST is UTC + 5:30 (5.5 * 3600 * 1000 = 19800000 ms)
    const istDate = new Date(utcMs + 19800000);

    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const seconds = istDate.getSeconds();

    this.currentIstHour.set(hours);
    this.currentIstMinute.set(minutes);

    const pad = (n: number) => n.toString().padStart(2, '0');
    this.currentIstString.set(`${pad(hours)}:${pad(minutes)}:${pad(seconds)} IST`);
  }

  getCalculatedPhase(): TimePhase {
    if (this.manualPhase()) return this.manualPhase()!;

    const h = this.currentIstHour();
    const m = this.currentIstMinute();
    const totalMinutes = h * 60 + m;

    // 04:30 (270 min) - 06:45 (405 min) -> DAWN
    if (totalMinutes >= 270 && totalMinutes < 405) {
      return 'DAWN';
    }
    // 06:45 (405 min) - 17:00 (1020 min) -> DAY
    if (totalMinutes >= 405 && totalMinutes < 1020) {
      return 'DAY';
    }
    // 17:00 (1020 min) - 19:30 (1170 min) -> DUSK
    if (totalMinutes >= 1020 && totalMinutes < 1170) {
      return 'DUSK';
    }
    // Otherwise NIGHT
    return 'NIGHT';
  }

  getActivePhaseInfo(): PhaseInfo {
    const phase = this.getCalculatedPhase();
    return this.phaseConfig[phase];
  }

  setPhase(phase: TimePhase | null): void {
    this.manualPhase.set(phase);
  }

  cyclePhase(): void {
    const current = this.getCalculatedPhase();
    const order: TimePhase[] = ['DAWN', 'DAY', 'DUSK', 'NIGHT'];
    const nextIdx = (order.indexOf(current) + 1) % order.length;
    this.setPhase(order[nextIdx]);
  }
}
