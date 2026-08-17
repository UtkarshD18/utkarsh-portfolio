import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WordProp {
  id: string;
  kanji: string;
  romaji: string;
  english: string;
  description: string;
  xPercent: number;
  yPercent: number;
  isPinned: boolean;
  isHovered: boolean;
}

@Component({
  selector: 'app-word-props',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="word-props-layer">
      @for (prop of wordList(); track prop.id) {
        <div
          class="word-prop-badge"
          [class.pinned]="prop.isPinned"
          [class.hovered]="prop.isHovered"
          [style.left.%]="prop.xPercent"
          [style.top.%]="prop.yPercent"
          (mouseenter)="onTouchWord(prop)"
          (click)="togglePin(prop)"
        >
          <div class="prop-kanji">{{ prop.kanji }}</div>
          <div class="prop-content">
            <div class="prop-title">
              <span class="prop-romaji">{{ prop.romaji }}</span>
              <span class="prop-tag">[{{ prop.english }}]</span>
            </div>
            @if (prop.isHovered || prop.isPinned) {
              <div class="prop-desc">{{ prop.description }}</div>
              <div class="prop-status">
                <span>{{ prop.isPinned ? '● PINNED (CLICK TO RELEASE)' : '○ TOUCH DETECTED' }}</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 5;
    }
    .word-props-layer {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .word-prop-badge {
      position: absolute;
      pointer-events: auto;
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 8px;
      padding: 0.6rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      cursor: pointer;
      color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
      max-width: 280px;
    }
    .word-prop-badge:hover, .word-prop-badge.pinned {
      background: #000000;
      border-color: #ffffff;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.35), 0 10px 30px rgba(0, 0, 0, 0.9);
      transform: scale(1.06) translateY(-4px);
      z-index: 20;
    }
    .prop-kanji {
      font-family: 'Shippori Mincho', serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: #ffffff;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      padding-right: 0.6rem;
      line-height: 1;
    }
    .prop-content {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .prop-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .prop-romaji {
      font-family: 'Cinzel', serif;
      font-weight: 900;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      color: #ffffff;
    }
    .prop-tag {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 0.05em;
    }
    .prop-desc {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.4;
      margin-top: 0.3rem;
      animation: fadeIn 0.2s ease-out;
    }
    .prop-status {
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      color: #ffffff;
      margin-top: 0.2rem;
      font-weight: 700;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class WordPropsComponent {
  readonly wordList = signal<WordProp[]>([
    {
      id: 'w1',
      kanji: '無心',
      romaji: 'MUSHIN',
      english: 'Void Mind',
      description: 'Zero garbage-collection pauses. Actions flow without cognitive friction.',
      xPercent: 72,
      yPercent: 18,
      isPinned: false,
      isHovered: false
    },
    {
      id: 'w2',
      kanji: '鍛錬',
      romaji: 'TANREN',
      english: 'Forge',
      description: 'C++ memory buffers tempered like folded tamahagane steel.',
      xPercent: 8,
      yPercent: 44,
      isPinned: false,
      isHovered: false
    },
    {
      id: 'w3',
      kanji: '残心',
      romaji: 'ZANSHIN',
      english: 'Awareness',
      description: '120ms table tennis reaction speed. Observing after the strike completes.',
      xPercent: 75,
      yPercent: 62,
      isPinned: false,
      isHovered: false
    },
    {
      id: 'w4',
      kanji: '一刀',
      romaji: 'ITTO',
      english: 'Single Cut',
      description: 'Swipe mouse across screen to sever falling leaves in real-time.',
      xPercent: 48,
      yPercent: 82,
      isPinned: false,
      isHovered: false
    }
  ]);

  onTouchWord(prop: WordProp): void {
    this.wordList.update(list =>
      list.map(w => (w.id === prop.id ? { ...w, isHovered: true } : w))
    );
  }

  togglePin(prop: WordProp): void {
    this.wordList.update(list =>
      list.map(w => (w.id === prop.id ? { ...w, isPinned: !w.isPinned } : w))
    );
  }
}
