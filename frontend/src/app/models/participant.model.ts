// ============================================================
// models/participant.model.ts
// ============================================================

// ── Disciplinas independientes ──────────────────────────────
export type Disciplina = 'running' | 'ciclismo' | 'natacion';

// ── Categorías por disciplina ───────────────────────────────
export type Categoria = 'elite' | 'recreativa' | 'ninos' | 'natacion';

// Mapa de categorías válidas por disciplina
// (preparado para agregar nuevas categorías fácilmente)
export const CATEGORIAS_POR_DISCIPLINA: Record<Disciplina, { value: Categoria; label: string }[]> = {
  running: [
    { value: 'elite',      label: '🥇 Elite' },
    { value: 'recreativa', label: '🏅 Recreativa' },
    { value: 'ninos',      label: '👦 Niños' },
  ],
  ciclismo: [
    { value: 'elite',      label: '🥇 Elite' },
    { value: 'recreativa', label: '🏅 Recreativa' },
    { value: 'ninos',      label: '👦 Niños' },
  ],
  natacion: [
    { value: 'natacion',   label: '🏊 Natación' },
  ],
};

export interface Participant {
  id?:               number;
  nombre:            string;
  edad:              number;
  ciudad:            string;
  telefono:          string;
  correo:            string;
  disciplina:        Disciplina;
  categoria:         Categoria;
  participo_primera_edicion: 'SI' | 'NO';
  precio_aplicado?:  number;
  fecha_inscripcion?: string;
}

export interface RegistrationResponse {
  message:     string;
  id:          number;
  precio:      number;
  disciplina:  Disciplina;
  categoria:   Categoria;
}

export interface ParticipantsListResponse {
  data:  Participant[];
  total: number;
  page:  number;
  limit: number;
}

export interface Sponsor {
  id?:       number;
  nombre:    string;
  tipo:      'alcaldia' | 'empresa' | 'persona';
  logo_url?: string;
  sitio_web?: string;
}

export interface Admin {
  id:      number;
  usuario: string;
  nombre?: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}
