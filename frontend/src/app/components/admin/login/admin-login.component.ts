// ============================================================
// components/admin/login/admin-login.component.ts
// ============================================================
import { Component, signal } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { Router }             from '@angular/router';
import { AuthService }        from '../../../services/auth.service';

@Component({
  selector:   'app-admin-login',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <!-- Background -->
      <div class="login-bg">
        <div class="bg-gradient"></div>
        <div class="bg-grid"></div>
      </div>

      <div class="login-card glass">
        <!-- Logo -->
        <div class="login-logo">
          <div class="logo-icon">🏆</div>
          <div>
            <h1>Panel Admin</h1>
            <p>Triatlón Sucre Sin Límites 2.0</p>
          </div>
        </div>

        <!-- Form -->
        <form (ngSubmit)="login()" #loginForm="ngForm" class="login-form">
          @if (error()) {
            <div class="login-error">
              ⚠️ {{ error() }}
            </div>
          }

          <div class="form-group">
            <label for="admin-user">Usuario</label>
            <input
              id="admin-user"
              name="usuario"
              type="text"
              [(ngModel)]="usuario"
              required
              placeholder="admin"
              autocomplete="username"
            />
          </div>

          <div class="form-group">
            <label for="admin-pass">Contraseña</label>
            <div class="pass-wrap">
              <input
                id="admin-pass"
                name="password"
                [type]="showPass() ? 'text' : 'password'"
                [(ngModel)]="password"
                required
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <button type="button" class="toggle-pass" (click)="showPass.update(v=>!v)">
                {{ showPass() ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary login-btn"
            [disabled]="loading() || loginForm.invalid"
          >
            @if (loading()) {
              <span class="spinner"></span> Ingresando...
            } @else {
              🔐 Ingresar al Panel
            }
          </button>
        </form>

        <a href="/" class="back-link">← Volver a la página del evento</a>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: #040609; /* Deeper dark background */
      padding: 1.5rem;
    }

    .login-bg {
      position: absolute;
      inset: 0;
    }

    .bg-gradient {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 20% 40%, rgba(26,107,255,0.08) 0%, transparent 60%),
                  radial-gradient(circle at 80% 80%, rgba(0,200,83,0.05) 0%, transparent 50%);
      filter: blur(60px);
    }

    .login-card {
      width: 100%;
      max-width: 420px;
      padding: 2.5rem;
      position: relative;
      z-index: 1;
      background: rgba(13, 17, 23, 0.65);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
      animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Logo */
    .login-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .logo-icon { 
      font-size: 2.5rem; 
      filter: drop-shadow(0 0 12px rgba(255,215,0,0.3));
    }

    .login-logo h1 {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-white);
      letter-spacing: 0.05em;
      line-height: 1;
      text-shadow: 0 2px 10px rgba(255,255,255,0.1);
    }

    .login-logo p {
      font-size: 0.75rem;
      color: var(--c-muted);
      margin-top: 4px;
      letter-spacing: 0.03em;
    }

    /* Form */
    .login-form { display: flex; flex-direction: column; gap: 1.4rem; }

    .login-error {
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 12px;
      padding: 0.8rem 1rem;
      color: #f87171;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }

    label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    input {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 0.9rem 1rem;
      color: var(--c-white);
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      width: 100%;
      transition: all 0.25s ease;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    }

    input:hover {
      background: rgba(255,255,255,0.05);
      border-color: rgba(255,255,255,0.15);
    }

    input:focus {
      background: rgba(255,255,255,0.06);
      border-color: var(--c-blue);
      box-shadow: 0 0 0 4px rgba(26,107,255,0.15), inset 0 2px 4px rgba(0,0,0,0.1);
    }

    input::placeholder { color: var(--c-muted); opacity: 0.4; }

    .pass-wrap { position: relative; }

    .pass-wrap input { padding-right: 3rem; }

    .toggle-pass {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      padding: 4px;
      border-radius: 6px;
      transition: background 0.2s;
    }
    
    .toggle-pass:hover {
      background: rgba(255,255,255,0.08);
    }

    .login-btn {
      width: 100%;
      justify-content: center;
      margin-top: 0.5rem;
      padding: 1rem;
      font-size: 1rem;
      border-radius: 14px;
      background: linear-gradient(135deg, #1a6bff, #0047cc);
      box-shadow: 0 8px 24px rgba(26,107,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
      border: 1px solid rgba(26,107,255,0.5);
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(26,107,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
    }

    .login-btn:disabled { 
      opacity: 0.6; 
      cursor: not-allowed; 
      transform: none; 
      box-shadow: none;
    }

    .spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.2);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .back-link {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      color: var(--c-muted);
      transition: color 0.2s;
      text-decoration: none;
    }

    .back-link:hover { color: var(--c-white); text-decoration: underline; }
  `]
})
export class AdminLoginComponent {
  usuario  = '';
  password = '';
  loading  = signal(false);
  error    = signal('');
  showPass = signal(false);

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/admin/dashboard']);
  }

  login() {
    if (this.loading()) return;
    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.usuario, this.password).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: err => {
        this.loading.set(false);
        this.error.set(err.error?.error || 'Error al iniciar sesión');
      }
    });
  }
}
