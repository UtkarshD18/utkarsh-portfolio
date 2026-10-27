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
                  <span class="tz-title">TIME ZONE</span>
                </div>
                <div class="tz-time">India Standard Time · UTC+5:30</div>
                <div class="tz-status">Use the form below for opportunities and project inquiries.</div>
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
                  <h3>Submission Accepted</h3>
                  <p>Thank you, {{ formData.name }}. The email service accepted your message. Your reply address is {{ formData.email }}.</p>
                  <button class="reset-btn liquid-glass" (click)="resetForm()">Send Another Message</button>
                </div>
              } @else {
                <form #contactForm="ngForm" (ngSubmit)="contactForm.valid && submitMessage()" class="contact-form">
                  <h3 class="form-title">Send a Message</h3>
                  <p class="delivery-note">Messages are processed by FormSubmit and addressed to utkarshdwivedi.182&#64;gmail.com.</p>
                  <div class="honeypot" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="website" [(ngModel)]="website" tabindex="-1" autocomplete="off" /></div>
                  @if (submissionError()) {
                    <div class="form-error" role="alert"><p>{{ submissionError() }}</p><a [href]="emailFallback()">Open your email app instead ↗</a></div>
                  }

                  <div class="form-group">
                    <label for="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      [(ngModel)]="formData.name"
                      name="name"
                      maxlength="100"
                      autocomplete="name"
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
                      maxlength="254"
                      autocomplete="email"
                      email
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
                      minlength="10"
                      maxlength="6000"
                      rows="5"
                      placeholder="Share your opportunity, role requirements, or question..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    class="submit-btn"
                    [disabled]="isSubmitting() || contactForm.invalid"
                  >
                    <span>{{ isSubmitting() ? 'Sending Message…' : 'Send Message →' }}</span>
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
    .delivery-note { color: var(--text-secondary); font-size: .8rem; overflow-wrap: anywhere; }
    .honeypot { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
    .form-error { padding: 1rem; border: 1px solid var(--accent-forest); border-radius: 8px; color: var(--text-primary); }
    .form-error a { color: inherit; display: inline-block; margin-top: .5rem; text-decoration: underline; }

    .page-viewport {
      min-height: 100vh;
      background: transparent;
      color: var(--text-primary);
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
      color: var(--text-primary);
      letter-spacing: 0.12em;
      margin-bottom: 0.6rem;
      display: inline-block;
      white-space: nowrap;
    }
    .page-title {
      font-size: 3.2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--text-primary);
      margin-bottom: 1.2rem;
      line-height: 1.15;
    }
    .page-desc {
      font-size: 1.05rem;
      color: var(--text-secondary);
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
      background: var(--accent-forest);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-forest);
    }
    .tz-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-primary);
      letter-spacing: 0.1em;
    }
    .tz-time {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .tz-status {
      font-size: 0.82rem;
      color: var(--text-secondary);
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
      color: var(--text-secondary);
      letter-spacing: 0.12em;
    }
    .channel-val {
      color: var(--text-primary);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s ease;
      word-break: break-all;
    }
    .channel-val:hover {
      color: var(--text-primary);
    }

    /* Right Form Container */
    .form-container {
      padding: 3rem;
      border-radius: 18px;
    }
    .form-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text-primary);
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
      color: var(--text-secondary);
      letter-spacing: 0.1em;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      background: rgba(24, 62, 51, 0.03);
      border: 1px solid rgba(24, 62, 51, 0.1);
      border-radius: 8px;
      padding: 0.85rem 1rem;
      color: var(--text-primary);
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
      border-color: var(--accent-forest);
      background: rgba(24, 62, 51, 0.06);
      box-shadow: 0 0 15px rgba(24, 62, 51, 0.044);
    }
    .form-group select option {
      background: var(--bg-base);
      color: var(--text-primary);
    }
    .submit-btn {
      background: var(--accent-forest);
      color: var(--palette-ivory);
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
      background: var(--accent-forest);
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
      background: rgba(24, 62, 51, 0.15);
      color: var(--text-primary);
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(24, 62, 51, 0.3);
    }
    .success-message h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .success-message p {
      color: var(--text-secondary);
      max-width: 420px;
      line-height: 1.65;
    }
    .reset-btn {
      margin-top: 1rem;
      padding: 0.6rem 1.4rem;
      border-radius: 999px;
      color: var(--text-primary);
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

  readonly submissionError = signal('');
  website = '';

  async submitMessage(): Promise<void> {
    if (this.isSubmitting() || this.website) return;
    const name = this.formData.name.trim();
    const email = this.formData.email.trim();
    const message = this.formData.message.trim();
    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 10 || message.length > 6000) {
      this.submissionError.set('Please enter your name, a valid email, and a message of 10–6,000 characters.');
      return;
    }
    this.isSubmitting.set(true);
    this.submissionError.set('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/utkarshdwivedi.182@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: AbortSignal.timeout(20_000),
        body: JSON.stringify({ name, email, message, inquiryType: this.formData.projectType,
          _subject: `[Portfolio Inquiry] ${this.formData.projectType} from ${name}`,
          _template: 'table', _honey: this.website, _url: window.location.href })
      });
      const result = await response.json();
      const serviceMessage = String(result.message ?? '');
      if (/activat|confirm.*email/i.test(serviceMessage)) {
        this.submissionError.set('Check your inbox for the FormSubmit activation link to enable email delivery. After activating, try sending your message again.');
        return;
      }
      if (!response.ok || !(result.success === true || result.success === 'true')) {
        throw new Error('The email service could not accept this message. Please try again or email me directly.');
      }
      this.isSubmitted.set(true);
    } catch (error) {
      this.submissionError.set(error instanceof Error && error.message.startsWith('The email service')
        ? error.message : 'Your message could not be confirmed. Please retry or use the direct email link.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  emailFallback(): string {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${this.formData.projectType} — ${this.formData.name}`);
    const body = encodeURIComponent(`Sender: ${this.formData.name}\nReply to: ${this.formData.email}\n\n${this.formData.message}`);
    return `mailto:utkarshdwivedi.182@gmail.com?subject=${subject}&body=${body}`;
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      projectType: 'fulltime',
      message: ''
    };
    this.isSubmitted.set(false);
    this.submissionError.set('');
    this.website = '';
  }
}
