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
              <span class="page-kicker">[ 01 · GET IN TOUCH ]</span>
              <h1 class="page-title">Let's Connect &amp; Build.</h1>
              <p class="page-desc">
                Looking for a passionate software engineer for full-time backend/systems roles, web engineering, or distributed platforms? Reach out directly via email or LinkedIn.
              </p>

              <!-- Live Location Card -->
              <div class="timezone-card liquid-glass">
                <div class="tz-header">
                  <span class="tz-dot"></span>
                  <span class="tz-title">LOCATION &amp; AVAILABILITY</span>
                </div>
                <div class="tz-time">Jaipur / New Delhi, India · IST (UTC+5:30)</div>
                <div class="tz-status">Available for on-site &amp; remote engineering opportunities.</div>
              </div>

              <!-- Direct Contact Channels with Real Links from Resume -->
              <div class="channels-list">
                <div class="channel-item">
                  <span class="channel-label">DIRECT EMAIL</span>
                  <a href="mailto:utkarshdwivedi.182@gmail.com" class="channel-val">utkarshdwivedi.182&#64;gmail.com ↗</a>
                </div>
                <div class="channel-item">
                  <span class="channel-label">LINKEDIN PROFILE</span>
                  <a href="https://www.linkedin.com/in/utkarsh-dwivedi-01489524b/" target="_blank" class="channel-val">linkedin.com/in/utkarsh-dwivedi-01489524b ↗</a>
                </div>
                <div class="channel-item">
                  <span class="channel-label">GITHUB REPOSITORIES</span>
                  <a href="https://github.com/UtkarshD18" target="_blank" class="channel-val">github.com/UtkarshD18 ↗</a>
                </div>
                <div class="channel-item">
                  <span class="channel-label">LEETCODE PROFILE</span>
                  <a href="https://leetcode.com/u/UtkarshD18/" target="_blank" class="channel-val">leetcode.com/u/UtkarshD18 ↗</a>
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
                      <option value="fulltime">Full-Time Software Engineering Role</option>
                      <option value="internship">Engineering Internship</option>
                      <option value="project">Project Collaboration / Consulting</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="message">Message Details</label>
                    <textarea
                      id="message"
                      [(ngModel)]="formData.message"
                      name="message"
                      rows="5"
                      placeholder="Share your opportunity, role requirements, or question..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    class="submit-btn"
                    [disabled]="isSubmitting() || !formData.name || !formData.email || !formData.message"
                  >
                    <span>{{ isSubmitting() ? 'Dispatching Message...' : 'Send Message →' }}</span>
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
      background: transparent;
      color: #f5f5f7;
    }
    .contact-stage {
      padding: 6rem 0 8rem;
    }
    .content-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 2rem;
      width: 100%;
      box-sizing: border-box;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1.1fr 1.2fr;
      gap: 4rem;
      align-items: flex-start;
      width: 100%;
      box-sizing: border-box;
    }
    .contact-info, .form-container {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }
    .page-kicker {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(0.65rem, 2.5vw, 0.75rem);
      color: #3b82f6;
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
      white-space: nowrap;
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
      width: 100%;
      box-sizing: border-box;
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
      color: #3b82f6;
      letter-spacing: 0.1em;
    }
    .tz-time {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
    }
    .tz-status {
      font-size: 0.82rem;
      color: #8e8e9f;
    }

    /* Direct Channels */
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
      font-size: 0.65rem;
      color: #8e8e9f;
      letter-spacing: 0.12em;
    }
    .channel-val {
      color: #f5f5f7;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s ease;
      word-break: break-all;
    }
    .channel-val:hover {
      color: #3b82f6;
    }

    /* Right Form Container */
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
      letter-spacing: 0.1em;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0.85rem 1rem;
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;
      width: 100%;
      box-sizing: border-box;
    }
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: #3b82f6;
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
    }
    .form-group select option {
      background: #09090d;
      color: #ffffff;
    }
    .submit-btn {
      background: #ffffff;
      color: #000000;
      border: none;
      padding: 0.9rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: all 0.2s ease;
      width: 100%;
    }
    .submit-btn:hover:not(:disabled) {
      background: #e5e5d8;
      transform: translateY(-2px);
    }
    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Success Screen */
    .success-message {
      text-align: center;
      padding: 3rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .success-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(0, 230, 118, 0.15);
      color: #00e676;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(0, 230, 118, 0.3);
    }
    .success-message h3 {
      font-size: 1.4rem;
      font-weight: 700;
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

    @media (max-width: 1024px) {
      .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    }

    @media (max-width: 768px) {
      .contact-stage { padding: 3.5rem 0 6rem; width: 100%; overflow-x: hidden; }
      .content-container { padding: 0 1.2rem; }
      .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .page-title { font-size: 2.2rem; line-height: 1.2; }
      .form-container { padding: 1.6rem 1.2rem; }
      .timezone-card { padding: 1.2rem; }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    projectType: 'fulltime',
    message: ''
  };

  readonly isSubmitting = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);

  async submitMessage(): Promise<void> {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;
    this.isSubmitting.set(true);

    try {
      // Asynchronous API delivery to inbox (utkarshdwivedi.182@gmail.com)
      const res = await fetch('https://formspree.io/f/mqaeveoq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.formData.name,
          email: this.formData.email,
          inquiryType: this.formData.projectType,
          message: this.formData.message,
          _subject: `[Portfolio Inquiry] ${this.formData.projectType.toUpperCase()} from ${this.formData.name}`
        })
      });

      if (res.ok) {
        this.isSubmitted.set(true);
      } else {
        this.fallbackMailto();
      }
    } catch {
      this.fallbackMailto();
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private fallbackMailto(): void {
    this.isSubmitted.set(true);
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${this.formData.projectType.toUpperCase()} — ${this.formData.name}`);
    const body = encodeURIComponent(`Hi Utkarsh,\n\nSender: ${this.formData.name}\nEmail: ${this.formData.email}\nInquiry: ${this.formData.projectType}\n\nMessage:\n${this.formData.message}\n`);
    window.location.href = `mailto:utkarshdwivedi.182@gmail.com?subject=${subject}&body=${body}`;
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      projectType: 'fulltime',
      message: ''
    };
    this.isSubmitted.set(false);
  }
}
