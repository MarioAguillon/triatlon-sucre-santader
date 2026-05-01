// ============================================================
// models/participant.model.ts
// ============================================================

// ── Disciplinas independientes ──────────────────────────────
export type Disciplina = 'running' | 'ciclismo' | 'natacion';

// ── Categorías Globales ───────────────────────────────
export type Categoria = 'elite' | 'recreativa' | 'ninos';

export const CATEGORIAS_GLOBALES = [
  { value: 'elite',      label: 'Élite (Competitivo)' },
  { value: 'recreativa', label: 'Recreativa (Aficionado)' },
  { value: 'ninos',      label: 'Infantil / Niños' },
];

export interface Participant {
  id?:               number;
  nombre:            string;
  edad:              number;
  ciudad:            string;
  telefono:          string;
  correo:            string;
  disciplina:        string; // string for multiple e.g., 'running, ciclismo'
  categoria:         Categoria;
  participo_primera_edicion: 'SI' | 'NO';
  precio_aplicado?:  number;
  estado_pago?:      'pendiente' | 'pagado';
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
