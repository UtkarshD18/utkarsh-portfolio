import { Injectable, OnDestroy, afterNextRender, signal } from '@angular/core';

interface GitHubProfile { public_repos: number; followers: number; html_url: string; }
interface GitHubRepository { id: number; name: string; html_url: string; description: string | null; language: string | null; pushed_at: string; fork: boolean; }
interface GitHubEvent { id: string; type: string; repo: { name: string }; created_at: string; }

@Injectable({ providedIn: 'root' })
export class GithubService implements OnDestroy {
  readonly profile = signal<GitHubProfile | null>(null);
  readonly repositories = signal<GitHubRepository[]>([]);
  readonly events = signal<GitHubEvent[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly updatedAt = signal<Date | null>(null);
  private timer?: ReturnType<typeof setInterval>;
  private lastAttempt = 0;

  constructor() {
    afterNextRender(() => {
      void this.refresh();
      this.timer = setInterval(() => {
        if (document.visibilityState === 'visible') void this.refresh();
      }, 10 * 60 * 1000);
    });
  }

  async refresh(): Promise<void> {
    if (this.loading() || Date.now() - this.lastAttempt < 60_000) return;
    this.lastAttempt = Date.now();
    this.loading.set(true);
    this.error.set('');
    try {
      const get = async <T>(path: string): Promise<T> => {
        const response = await fetch(`https://api.github.com/users/UtkarshD18${path}`, {
          headers: { Accept: 'application/vnd.github+json' },
          cache: 'no-cache', signal: AbortSignal.timeout(15_000)
        });
        if (!response.ok) throw new Error(response.status === 403 || response.status === 429
          ? 'GitHub’s public API rate limit was reached. Please try again later.'
          : 'GitHub data could not be loaded. Please try again later.');
        return response.json() as Promise<T>;
      };
      const [profile, repositories, events] = await Promise.all([
        get<GitHubProfile>(''),
        get<GitHubRepository[]>('/repos?sort=pushed&direction=desc&per_page=6'),
        get<GitHubEvent[]>('/events/public?per_page=5')
      ]);
      this.profile.set(profile);
      this.repositories.set(repositories);
      this.events.set(events);
      this.updatedAt.set(new Date());
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'GitHub is temporarily unavailable.');
    } finally {
      this.loading.set(false);
    }
  }

  eventLabel(type: string): string {
    return ({ PushEvent: 'Pushed code', CreateEvent: 'Created a branch, tag, or repository',
      PullRequestEvent: 'Updated a pull request', IssuesEvent: 'Updated an issue',
      WatchEvent: 'Starred a repository', ForkEvent: 'Forked a repository',
      ReleaseEvent: 'Published a release', DeleteEvent: 'Deleted a branch or tag',
      IssueCommentEvent: 'Commented on an issue' } as Record<string, string>)[type] ?? 'Public activity';
  }

  ngOnDestroy(): void { if (this.timer) clearInterval(this.timer); }
}
