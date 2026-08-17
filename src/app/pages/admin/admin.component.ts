import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterConfigService, MemeCharacter, MemeDialogue } from '../../core/services/character-config.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <button class="back-btn" (click)="returnToPortfolio()">← BACK TO PORTFOLIO</button>
        <h1>MEME CHARACTER & AUDIO STUDIO</h1>
        <div class="header-actions">
          <button class="primary-btn" (click)="openNewCharacterModal()">+ NEW CHARACTER</button>
        </div>
      </header>

      <div class="admin-grid">
        <!-- Character List -->
        <section class="character-section">
          <h2>CONFIGURED MEME ICONS</h2>
          <div class="cards-list">
            @for (char of charService.characters(); track char.id) {
              <div class="character-card">
                <div class="avatar-preview" [style.border-color]="char.color">
                  <img [src]="char.avatarUrl" alt="{{ char.name }}" (error)="onImgError($event)" />
                </div>
                <div class="char-details">
                  <div class="char-title-row">
                    <h3>{{ char.name }}</h3>
                    <span class="color-badge" [style.background]="char.color"></span>
                  </div>
                  <p class="tagline">"{{ char.tagline }}"</p>
                  <div class="stat-pills">
                    <span>PWR: {{ char.attackPower }}</span>
                    <span>SPD: {{ char.speed }}</span>
                    <span>HITBOX: {{ char.hitboxRadius }}</span>
                  </div>
                  <div class="dialogue-count">
                    {{ char.dialogues.length }} Finisher Sound(s) configured
                  </div>
                </div>
                <div class="char-actions">
                  <button class="icon-btn edit-btn" (click)="editCharacter(char)">EDIT</button>
                  @if (char.isCustom) {
                    <button class="icon-btn delete-btn" (click)="charService.deleteCharacter(char.id)">DELETE</button>
                  }
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Edit / Create Form Panel -->
        @if (activeChar()) {
          <section class="editor-section">
            <h2>{{ isEditing() ? 'EDIT CHARACTER' : 'CREATE MEME CHARACTER' }}</h2>
            <form (ngSubmit)="saveActiveChar()" class="editor-form">
              <div class="form-group">
                <label>Character Name</label>
                <input type="text" [(ngModel)]="activeChar()!.name" name="name" required />
              </div>
              <div class="form-group">
                <label>Tagline / Motto</label>
                <input type="text" [(ngModel)]="activeChar()!.tagline" name="tagline" required />
              </div>
              <div class="form-group">
                <label>Avatar / Texture Image URL</label>
                <input type="url" [(ngModel)]="activeChar()!.avatarUrl" name="avatarUrl" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Aura / Theme Color</label>
                  <input type="color" [(ngModel)]="activeChar()!.color" name="color" />
                </div>
                <div class="form-group">
                  <label>Hitbox Radius</label>
                  <input type="number" step="0.1" [(ngModel)]="activeChar()!.hitboxRadius" name="hitboxRadius" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Attack Power</label>
                  <input type="number" [(ngModel)]="activeChar()!.attackPower" name="attackPower" />
                </div>
                <div class="form-group">
                  <label>Move Speed</label>
                  <input type="number" step="0.1" [(ngModel)]="activeChar()!.speed" name="speed" />
                </div>
              </div>

              <!-- Dialogues List -->
              <div class="dialogues-box">
                <div class="dialogues-header">
                  <h4>VIRAL FINISHER AUDIO CLIPS</h4>
                  <button type="button" class="mini-btn" (click)="addDialogue()">+ ADD SOUND</button>
                </div>
                @for (d of activeChar()!.dialogues; track d.id; let i = $index) {
                  <div class="dialogue-row">
                    <input type="text" placeholder="Title (e.g. Phonk Stare)" [(ngModel)]="d.title" [name]="'d_title_' + i" />
                    <input type="url" placeholder="Audio MP3 URL" [(ngModel)]="d.url" [name]="'d_url_' + i" />
                    <select [(ngModel)]="d.triggerOn" [name]="'d_trigger_' + i">
                      <option value="PARRY">On Parry</option>
                      <option value="ULT">On Ultimate</option>
                      <option value="WIN">On Victory</option>
                    </select>
                    <button type="button" class="del-row-btn" (click)="removeDialogue(i)">×</button>
                  </div>
                }
              </div>

              <div class="form-actions">
                <button type="submit" class="save-btn">SAVE TO STUDIO</button>
                <button type="button" class="cancel-btn" (click)="activeChar.set(null)">CANCEL</button>
              </div>
            </form>
          </section>
        }
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: 100vh;
      background: #0a0a0e;
      color: #fff;
      padding: 3rem 4rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 3rem;
    }
    .back-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
    }
    .primary-btn {
      background: linear-gradient(90deg, #00f2fe, #4facfe);
      border: none;
      color: #000;
      font-weight: 700;
      padding: 0.6rem 1.4rem;
      border-radius: 6px;
      cursor: pointer;
    }
    .admin-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
    }
    .character-section h2, .editor-section h2 {
      font-size: 1.1rem;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 1.5rem;
    }
    .cards-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .character-card {
      background: rgba(18, 18, 24, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1.2rem;
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .avatar-preview {
      width: 70px;
      height: 70px;
      border-radius: 8px;
      border: 2px solid #4facfe;
      overflow: hidden;
      flex-shrink: 0;
      background: #000;
    }
    .avatar-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .char-details {
      flex: 1;
    }
    .char-title-row {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .color-badge {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .tagline {
      font-size: 0.85rem;
      font-style: italic;
      color: rgba(255, 255, 255, 0.6);
      margin: 0.3rem 0 0.6rem;
    }
    .stat-pills {
      display: flex;
      gap: 0.6rem;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
    }
    .dialogue-count {
      font-size: 0.75rem;
      color: #00f2fe;
      margin-top: 0.4rem;
    }
    .char-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .icon-btn {
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
    }
    .edit-btn {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
    .delete-btn {
      background: rgba(255, 65, 108, 0.2);
      color: #ff416c;
    }
    .editor-form {
      background: rgba(18, 18, 24, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      flex: 1;
    }
    .form-row {
      display: flex;
      gap: 1rem;
    }
    label {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.6);
    }
    input, select {
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      padding: 0.6rem 0.8rem;
      border-radius: 6px;
      font-size: 0.85rem;
    }
    .dialogues-box {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1rem;
    }
    .dialogues-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
    }
    .mini-btn {
      background: rgba(0, 242, 254, 0.15);
      border: 1px solid rgba(0, 242, 254, 0.3);
      color: #00f2fe;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
    }
    .dialogue-row {
      display: grid;
      grid-template-columns: 1.2fr 2fr 1fr 30px;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .del-row-btn {
      background: rgba(255, 65, 108, 0.2);
      border: none;
      color: #ff416c;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 700;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    .save-btn {
      flex: 1;
      background: linear-gradient(90deg, #00f2fe, #4facfe);
      border: none;
      color: #000;
      font-weight: 700;
      padding: 0.8rem;
      border-radius: 6px;
      cursor: pointer;
    }
    .cancel-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 0.8rem 1.4rem;
      border-radius: 6px;
      cursor: pointer;
    }
  `]
})
export class AdminComponent {
  charService = inject(CharacterConfigService);
  private router = inject(Router);

  readonly activeChar = signal<MemeCharacter | null>(null);
  readonly isEditing = signal<boolean>(false);

  returnToPortfolio(): void {
    this.router.navigate(['/']);
  }

  openNewCharacterModal(): void {
    this.isEditing.set(false);
    this.activeChar.set({
      id: 'char_' + Date.now(),
      name: '',
      tagline: '',
      avatarUrl: '',
      color: '#00f2fe',
      hitboxRadius: 1.0,
      attackPower: 20,
      speed: 6.5,
      dialogues: [],
      isCustom: true
    });
  }

  editCharacter(char: MemeCharacter): void {
    this.isEditing.set(true);
    this.activeChar.set(JSON.parse(JSON.stringify(char)));
  }

  addDialogue(): void {
    const char = this.activeChar();
    if (char) {
      char.dialogues.push({
        id: 'd_' + Date.now(),
        title: '',
        url: '',
        triggerOn: 'PARRY'
      });
      this.activeChar.set({ ...char });
    }
  }

  removeDialogue(index: number): void {
    const char = this.activeChar();
    if (char) {
      char.dialogues.splice(index, 1);
      this.activeChar.set({ ...char });
    }
  }

  saveActiveChar(): void {
    const char = this.activeChar();
    if (char) {
      this.charService.saveCharacter(char);
      this.activeChar.set(null);
    }
  }

  onImgError(e: Event): void {
    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%234facfe" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>';
  }
}
