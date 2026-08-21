import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then((m) => m.PortfolioComponent)
  },
  {
    path: 'work',
    loadComponent: () =>
      import('./pages/work/work.component').then((m) => m.WorkComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent)
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
