import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactComponent } from './contact.component';

describe('Contact delivery', () => {
  let component: ContactComponent;
  beforeEach(() => {
    component = new ContactComponent();
    component.formData = { name: 'Test visitor', email: 'visitor@example.com', projectType: 'project', message: 'A test project inquiry.' };
  });
  afterEach(() => vi.unstubAllGlobals());

  it('never shows success when the provider rejects a submission', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ success: false }) }));
    await component.submitMessage();
    expect(component.isSubmitted()).toBe(false);
    expect(component.submissionError()).toBeTruthy();
    expect(component.formData.message).toBe('A test project inquiry.');
    expect(component.isSubmitting()).toBe(false);
  });

  it('keeps activation pending instead of claiming delivery', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: 'true', message: 'Please activate your form.' }) }));
    await component.submitMessage();
    expect(component.isSubmitted()).toBe(false);
    expect(component.submissionError()).toContain('activation');
  });

  it('accepts a provider-confirmed submission and targets the requested inbox', async () => {
    const request = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: 'true', message: 'Form submitted successfully' }) });
    vi.stubGlobal('fetch', request);
    await component.submitMessage();
    expect(component.isSubmitted()).toBe(true);
    expect(request.mock.calls[0][0]).toBe('https://formsubmit.co/ajax/utkarshdwivedi.182@gmail.com');
  });

  it('does not submit invalid email or honeypot entries', async () => {
    const request = vi.fn(); vi.stubGlobal('fetch', request);
    component.formData.email = 'invalid';
    await component.submitMessage();
    component.formData.email = 'visitor@example.com'; component.website = 'spam';
    await component.submitMessage();
    expect(request).not.toHaveBeenCalled();
  });
});
