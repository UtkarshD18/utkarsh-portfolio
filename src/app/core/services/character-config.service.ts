import { Injectable, signal } from '@angular/core';

export interface MemeDialogue {
  id: string;
  title: string;
  url: string;
  triggerOn: 'PARRY' | 'ULT' | 'WIN';
}

export interface MemeCharacter {
  id: string;
  name: string;
  tagline: string;
  avatarUrl: string;
  color: string;
  hitboxRadius: number;
  attackPower: number;
  speed: number;
  dialogues: MemeDialogue[];
  isCustom?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterConfigService {
  private readonly STORAGE_KEY = 'utkarsh_portfolio_meme_characters';

  // Preset Meme Legends & Iconic Figures
  private defaultCharacters: MemeCharacter[] = [
    {
      id: 'ravi_kishan',
      name: 'Ravi Kishan',
      tagline: 'Zindagi jhand ba, tabo ghamand ba!',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
      color: '#ff9933',
      hitboxRadius: 0.9,
      attackPower: 26,
      speed: 6.8,
      dialogues: [
        { id: 'rk_1', title: 'Zindagi Jhandba', url: '', triggerOn: 'PARRY' },
        { id: 'rk_2', title: 'Bhojpuri Roar', url: '', triggerOn: 'ULT' }
      ]
    },
    {
      id: 'modi_ji',
      name: 'Narendra Modi',
      tagline: 'Mitron! 140 crore deshvasiyo ka sankalp.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      color: '#ff7700',
      hitboxRadius: 1.0,
      attackPower: 28,
      speed: 6.5,
      dialogues: [
        { id: 'nm_1', title: 'Mitron!', url: '', triggerOn: 'PARRY' },
        { id: 'nm_2', title: 'Viksit Bharat Slam', url: '', triggerOn: 'ULT' }
      ]
    },
    {
      id: 'donald_trump',
      name: 'Donald Trump',
      tagline: 'Make the Arena Great Again. Tremendous!',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      color: '#d63031',
      hitboxRadius: 1.05,
      attackPower: 27,
      speed: 6.4,
      dialogues: [
        { id: 'dt_1', title: 'You Are Fired!', url: '', triggerOn: 'PARRY' },
        { id: 'dt_2', title: 'Tremendous Victory', url: '', triggerOn: 'ULT' }
      ]
    },
    {
      id: 'gigachad',
      name: 'GigaChad',
      tagline: 'Can you hear the silence?',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      color: '#4facfe',
      hitboxRadius: 1.0,
      attackPower: 25,
      speed: 6.5,
      dialogues: [
        { id: 'gc_1', title: 'Phonk Stare', url: '', triggerOn: 'PARRY' },
        { id: 'gc_2', title: 'Average Enjoyer', url: '', triggerOn: 'ULT' }
      ]
    },
    {
      id: 'musashi_monk',
      name: 'Quiet Observer',
      tagline: 'The observer is separate from the observed.',
      avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300&auto=format&fit=crop&q=80',
      color: '#ffffff',
      hitboxRadius: 0.9,
      attackPower: 22,
      speed: 6.8,
      dialogues: [
        { id: 'mm_1', title: 'Steel Sheath Snap', url: '', triggerOn: 'PARRY' },
        { id: 'mm_2', title: 'Void Strike', url: '', triggerOn: 'ULT' }
      ]
    }
  ];

  readonly characters = signal<MemeCharacter[]>(this.loadCharacters());
  readonly selectedPlayer = signal<MemeCharacter>(this.characters()[0]);
  readonly selectedOpponent = signal<MemeCharacter>(this.characters()[1]);

  constructor() {
    this.characters.set(this.loadCharacters());
  }

  private loadCharacters(): MemeCharacter[] {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return this.defaultCharacters;
  }

  saveCharacter(character: MemeCharacter): void {
    const list = [...this.characters()];
    const index = list.findIndex(c => c.id === character.id);
    if (index >= 0) {
      list[index] = character;
    } else {
      list.push({ ...character, isCustom: true });
    }
    this.characters.set(list);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }

  deleteCharacter(id: string): void {
    const list = this.characters().filter(c => c.id !== id);
    this.characters.set(list);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }

  selectPlayer(character: MemeCharacter): void {
    this.selectedPlayer.set(character);
  }

  selectOpponent(character: MemeCharacter): void {
    this.selectedOpponent.set(character);
  }
}
