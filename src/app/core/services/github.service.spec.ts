import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GithubService } from './github.service';

describe('GitHub data', () => {
  afterEach(() => { TestBed.resetTestingModule(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
  it('loads values from GitHub rather than using a fixed repository count', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ public_repos: 27 }) })
      .mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1, name: 'new-repo' }] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] }));
    const service = TestBed.inject(GithubService);
    await service.refresh();
    expect(service.profile()?.public_repos).toBe(27);
    expect(service.repositories()[0].name).toBe('new-repo');
    expect(service.updatedAt()).not.toBeNull();
  });
  it('shows rate-limit failures without fabricating activity', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    const service = TestBed.inject(GithubService);
    await service.refresh();
    expect(service.profile()).toBeNull();
    expect(service.updatedAt()).toBeNull();
    expect(service.error()).toContain('rate limit');
    expect(service.loading()).toBe(false);
  });
  it('retains the timestamp and data from the last successful fetch if refresh fails', async () => {
    const request = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ public_repos: 27 }) });
    vi.stubGlobal('fetch', request);
    const service = TestBed.inject(GithubService);
    await service.refresh(); const timestamp = service.updatedAt();
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 61_000);
    request.mockRejectedValue(new Error('Network unavailable'));
    await service.refresh();
    expect(service.profile()?.public_repos).toBe(27);
    expect(service.updatedAt()).toBe(timestamp);
    expect(service.error()).toBeTruthy();
  });
});
