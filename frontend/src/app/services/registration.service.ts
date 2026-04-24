// ============================================================
// services/registration.service.ts
// ============================================================
import { Injectable, inject } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs';
import { environment }        from '../../environments/environment';
import {
  Participant,
  RegistrationResponse,
  ParticipantsListResponse,
  Sponsor,
} from '../models/participant.model';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private http = inject(HttpClient);
  private api  = environment.apiUrl;

  // ── Público ──────────────────────────────────────────────
  register(data: Participant, captchaToken: string): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.api}/participants`, {
      ...data,
      captchaToken,
    });
  }

  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.api}/participants/count`);
  }

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(`${this.api}/sponsors`);
  }

  getPublicParticipants(): Observable<{ data: any[] }> {
    return this.http.get<{ data: any[] }>(`${this.api}/participants/public`);
  }

  // ── Admin (requiere JWT, manejado por interceptor) ───────
  getParticipants(page = 1, limit = 20, search = ''): Observable<ParticipantsListResponse> {
    return this.http.get<ParticipantsListResponse>(
      `${this.api}/participants?page=${page}&limit=${limit}&search=${search}`
    );
  }

  getParticipant(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.api}/participants/${id}`);
  }

  updateParticipant(id: number, data: Participant): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.api}/participants/${id}`, data);
  }

  deleteParticipant(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/participants/${id}`);
  }
}
