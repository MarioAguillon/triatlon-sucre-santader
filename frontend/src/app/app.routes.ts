// ============================================================
// app.routes.ts — Rutas de la aplicación
// ============================================================
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // ── Ruta pública: Landing page ───────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent),
  },

  // ── Rutas admin (privadas) ───────────────────────────────
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/admin/login/admin-login.component').then(m => m.AdminLoginComponent),
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

  // ── 404 ──────────────────────────────────────────────────
  { path: '**', redirectTo: '' }
];
