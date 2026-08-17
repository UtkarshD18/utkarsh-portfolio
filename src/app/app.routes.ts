import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then((m) => m.PortfolioComponent)
  },
  {
    path: 'duel',
    loadComponent: () =>
      import('./pages/duel/duel.component').then((m) => m.DuelComponent)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then((m) => m.AdminComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
