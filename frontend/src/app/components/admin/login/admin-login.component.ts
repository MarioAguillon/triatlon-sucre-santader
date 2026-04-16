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
      background: #07090f;
      padding: 1.5rem;
    }

    .login-bg {
      position: absolute;
      inset: 0;
    }

    .bg-gradient {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 30% 50%, rgba(26,107,255,0.12) 0%, transparent 60%),
                  radial-gradient(ellipse at 70% 20%, rgba(255,107,0,0.08) 0%, transparent 50%);
    }

    .login-card {
      width: 100%;
      max-width: 420px;
      padding: 2.5rem;
      position: relative;
      z-index: 1;
    }

    /* Logo */
    .login-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--c-border);
    }

    .logo-icon { font-size: 2.5rem; }

    .login-logo h1 {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-white);
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .login-logo p {
      font-size: 0.75rem;
      color: var(--c-muted);
      margin-top: 2px;
    }

    /* Form */
    .login-form { display: flex; flex-direction: column; gap: 1.2rem; }

    .login-error {
      background: rgba(255,50,50,0.1);
      border: 1px solid rgba(255,50,50,0.3);
      border-radius: var(--r-sm);
      padding: 0.8rem 1rem;
      color: #ff7070;
      font-size: 0.88rem;
    }

    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }

    label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    input {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      padding: 0.85rem 1rem;
      color: var(--c-white);
      font-family: var(--font-body);
      font-size: 1rem;
      outline: none;
      width: 100%;
      transition: all var(--tr-fast);
    }

    input:focus {
      border-color: var(--c-blue);
      box-shadow: 0 0 0 3px rgba(26,107,255,0.15);
    }

    input::placeholder { color: var(--c-muted); opacity: 0.5; }

    .pass-wrap { position: relative; }

    .pass-wrap input { padding-right: 3rem; }

    .toggle-pass {
      position: absolute;
      right: 0.8rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      padding: 0;
    }

    .login-btn {
      width: 100%;
      justify-content: center;
      margin-top: 0.5rem;
      padding: 1rem;
      font-size: 1rem;
    }

    .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

    .spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .back-link {
      display: block;
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      color: var(--c-muted);
      transition: color var(--tr-fast);
    }

    .back-link:hover { color: var(--c-white); }
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
