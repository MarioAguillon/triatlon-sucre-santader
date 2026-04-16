// ============================================================
// services/auth.service.ts
// ============================================================
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient }                  from '@angular/common/http';
import { Router }                      from '@angular/router';
import { Observable, tap }             from 'rxjs';
import { environment }                 from '../../environments/environment';
import { Admin, LoginResponse }        from '../models/participant.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);
  private api    = environment.apiUrl;

  // Estado reactivo del admin logueado
  currentAdmin = signal<Admin | null>(this.loadAdmin());

  private loadAdmin(): Admin | null {
    try {
      const s = localStorage.getItem('triatlon_admin');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  }

  login(usuario: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/auth/login`, { usuario, password })
      .pipe(
        tap(res => {
          localStorage.setItem('triatlon_token', res.token);
          localStorage.setItem('triatlon_admin', JSON.stringify(res.admin));
          this.currentAdmin.set(res.admin);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('triatlon_token');
    localStorage.removeItem('triatlon_admin');
    this.currentAdmin.set(null);
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('triatlon_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch { return false; }
  }
}
