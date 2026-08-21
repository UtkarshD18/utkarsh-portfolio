import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationComponent, FooterComponent],
  template: `
    <div class="page-viewport">
      <app-navigation></app-navigation>

      <main class="contact-stage">
        <div class="content-container">
          <div class="contact-grid">
            <!-- Left Info Column -->
            <div class="contact-info">
              <span class="page-kicker">[ 01 · DIRECT INQUIRY ]</span>
              <h1 class="page-title">Let's Build Something Exceptional.</h1>
              <p class="page-desc">
                Have a low-latency systems challenge, high-throughput web application, or architectural problem to solve? Send a message and I'll respond within 24 hours.
              </p>

              <!-- Live Timezone Card -->
              <div class="timezone-card liquid-glass">
                <div class="tz-header">
                  <span class="tz-dot"></span>
                  <span class="tz-title">LIVE LOCATION &amp; TIMEZONE</span>
                </div>
                <div class="tz-time">New Delhi, India · IST (UTC+5:30)</div>
                <div class="tz-status">Standard response window: 09:00 — 22:00 IST</div>
              </div>

              <!-- Direct Contact Channels -->
              <div class="channels-list">
                <div class="channel-item">
                  <span class="channel-label">EMAIL</span>
                  <a href="mailto:contact@utkarsh.dev" class="channel-val">contact&#64;utkarsh.dev ↗</a>
                </div>
                <div class="channel-item">
                  <span class="channel-label">GITHUB</span>
                  <a href="https://github.com/UtkarshD18" target="_blank" class="channel-val">github.com/UtkarshD18 ↗</a>
                </div>
                <div class="channel-item">
                  <span class="channel-label">LINKEDIN</span>
                  <a href="https://linkedin.com" target="_blank" class="channel-val">linkedin.com/in/utkarsh ↗</a>
                </div>
              </div>
            </div>

            <!-- Right Form Column -->
            <div class="form-container liquid-glass">
              @if (isSubmitted()) {
                <div class="success-message">
                  <div class="success-icon">✓</div>
                  <h3>Message Dispatched</h3>
                  <p>Thank you for reaching out, {{ formData.name }}. I'll get back to you shortly at {{ formData.email }}.</p>
                  <button class="reset-btn liquid-glass" (click)="resetForm()">Send Another Message</button>
                </div>
              } @else {
                <form (ngSubmit)="submitMessage()" class="contact-form">
                  <h3 class="form-title">Send a Message</h3>

                  <div class="form-group">
                    <label for="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      [(ngModel)]="formData.name"
                      name="name"
                      placeholder="e.g. Alex Morgan"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      [(ngModel)]="formData.email"
                      name="email"
                      placeholder="e.g. alex@company.com"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label for="projectType">Inquiry Type</label>
                    <select id="projectType" [(ngModel)]="formData.projectType" name="projectType">
                      <option value="engineering">Software &amp; Systems Engineering</option>
                      <option value="wasm">WebAssembly &amp; WebGL 3D Project</option>
                      <option value="consulting">Architecture Consulting</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="message">Project Details</label>
                    <textarea
                      id="message"
                      [(ngModel)]="formData.message"
                      name="message"
                      rows="5"
                      placeholder="Describe your technical requirements, timeline, or challenge..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" class="submit-btn" [disabled]="!formData.name || !formData.email || !formData.message">
                    <span>Dispatch Message →</span>
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .page-viewport {
      min-height: 100vh;
      background: #070709;
      color: #f5f5f7;
    }
    .contact-stage {
      padding: 6rem 0 8rem;
    }
    .content-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1.1fr 1.2fr;
      gap: 4rem;
      align-items: flex-start;
    }
    .page-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #3b82f6;
      letter-spacing: 0.15em;
      margin-bottom: 0.6rem;
      display: block;
    }
    .page-title {
      font-size: 3.2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      margin-bottom: 1.2rem;
      line-height: 1.15;
    }
    .page-desc {
      font-size: 1.05rem;
      color: #8e8e9f;
      line-height: 1.75;
      margin-bottom: 2.5rem;
    }

    /* Timezone Card */
    .timezone-card {
      padding: 1.8rem;
      border-radius: 12px;
      margin-bottom: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .tz-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .tz-dot {
      width: 6px;
      height: 6px;
      background: #00e676;
      border-radius: 50%;
      box-shadow: 0 0 8px #00e676;
    }
    .tz-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
      letter-spacing: 0.15em;
    }
    .tz-time {
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffffff;
    }
    .tz-status {
      font-size: 0.8rem;
      color: #8e8e9f;
    }

    /* Channels */
    .channels-list {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .channel-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .channel-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: #8e8e9f;
      letter-spacing: 0.12em;
    }
    .channel-val {
      color: #ffffff;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    .channel-val:hover {
      color: #3b82f6;
    }

    /* Form Container */
    .form-container {
      padding: 3rem;
      border-radius: 18px;
    }
    .form-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2rem;
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-group label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: #8e8e9f;
      letter-spacing: 0.05em;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 0.85rem 1rem;
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      outline: none;
    }
    .form-group select {
      cursor: pointer;
    }
    .form-group select option {
      background: #0d0d12;
      color: #ffffff;
    }
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
    }
    .submit-btn {
      background: #ffffff;
      border: none;
      color: #000000;
      padding: 0.95rem 1.8rem;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      margin-top: 0.8rem;
      transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(255, 255, 255, 0.25);
    }
    .submit-btn:hover:not(:disabled) {
      background: #e5e5d8;
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(255, 255, 255, 0.4);
    }
    .submit-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Success State */
    .success-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
      padding: 3rem 1rem;
    }
    .success-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(0, 230, 118, 0.15);
      border: 1px solid #00e676;
      color: #00e676;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
    }
    .success-message h3 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #ffffff;
    }
    .success-message p {
      color: #8e8e9f;
      max-width: 420px;
      line-height: 1.65;
    }
    .reset-btn {
      margin-top: 1rem;
      padding: 0.6rem 1.4rem;
      border-radius: 999px;
      color: #ffffff;
      font-size: 0.8rem;
      cursor: pointer;
    }

    @media (max-width: 900px) {
      .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
      .page-title { font-size: 2.6rem; }
      .form-container { padding: 2rem; }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    projectType: 'engineering',
    message: ''
  };

  readonly isSubmitted = signal<boolean>(false);

  submitMessage(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;
    this.isSubmitted.set(true);
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      projectType: 'engineering',
      message: ''
    };
    this.isSubmitted.set(false);
  }
}
