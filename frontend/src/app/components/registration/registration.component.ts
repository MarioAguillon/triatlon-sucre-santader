// ============================================================
// components/registration/registration.component.ts
// ============================================================
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule }                from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { RegistrationService }         from '../../services/registration.service';
import {
  Participant,
  Disciplina,
  Categoria,
  CATEGORIAS_POR_DISCIPLINA,
} from '../../models/participant.model';

type FormState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector:   'app-registration',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
    <section id="inscripcion" class="section registration-section">
      <div class="section-bg">
        <img src="bg_disciplines.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="reg-grid">
          <!-- Left: Info panel -->
          <div class="reg-info">
            <p class="section-label">Inscripción</p>
            <h2 class="section-title">¡Regístrate<br>ahora!</h2>
            <p class="reg-desc">
              Elige tu disciplina favorita, selecciona tu categoría y asegura tu cupo
              en el evento deportivo más importante de Sucre, Santander.
            </p>

            <div class="countdown-box glass">
              <div class="price-featured">
                <span class="pf-label">Precio Preferencial</span>
                <span class="pf-price">$15.000</span>
                <span class="pf-date">Hasta el 30 de abril de 2026</span>
              </div>
              <div class="price-normal">
                <span class="pn-label">Después: <strong>$30.000</strong></span>
              </div>
            </div>

            <div class="reg-features">
              @for (f of benefits; track f) {
                <div class="reg-feature">
                  <span class="rf-check">✓</span>
                  <span>{{ f }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Right: Form -->
          <div class="reg-form-wrap">
            <!-- Success state -->
            @if (formState() === 'success') {
              <div class="form-success glass">
                <div class="success-icon">🎉</div>
                <h3>¡Inscripción exitosa!</h3>
                <p>{{ successMessage() }}</p>
                <div class="success-price">
                  Precio aplicado: <strong>{{ successPrice() | currency:'COP':'symbol':'1.0-0' }}</strong>
                </div>
                <button class="btn btn-outline" (click)="resetForm()">
                  Inscribir otra persona
                </button>
              </div>
            }

            <!-- Form -->
            @if (formState() !== 'success') {
              <form class="reg-form glass" (ngSubmit)="submit()" #regForm="ngForm">
                <h3 class="form-title">Formulario de Inscripción</h3>

                <!-- Error global -->
                @if (formState() === 'error') {
                  <div class="form-error-msg">
                    ⚠️ {{ errorMessage() }}
                  </div>
                }

                <div class="form-grid">
                  <!-- Nombre -->
                  <div class="form-group full">
                    <label for="reg-nombre">Nombre completo *</label>
                    <input
                      id="reg-nombre"
                      name="nombre"
                      type="text"
                      [(ngModel)]="form.nombre"
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <!-- Edad -->
                  <div class="form-group">
                    <label for="reg-edad">Edad *</label>
                    <input
                      id="reg-edad"
                      name="edad"
                      type="number"
                      [(ngModel)]="form.edad"
                      required
                      min="5" max="100"
                      placeholder="Tu edad"
                    />
                  </div>

                  <!-- Ciudad -->
                  <div class="form-group">
                    <label for="reg-ciudad">Ciudad *</label>
                    <input
                      id="reg-ciudad"
                      name="ciudad"
                      type="text"
                      [(ngModel)]="form.ciudad"
                      required
                      placeholder="Tu ciudad"
                    />
                  </div>

                  <!-- Teléfono -->
                  <div class="form-group">
                    <label for="reg-telefono">Teléfono *</label>
                    <input
                      id="reg-telefono"
                      name="telefono"
                      type="tel"
                      [(ngModel)]="form.telefono"
                      required
                      placeholder="Tu número de contacto"
                    />
                  </div>

                  <!-- Correo -->
                  <div class="form-group">
                    <label for="reg-correo">Correo electrónico *</label>
                    <input
                      id="reg-correo"
                      name="correo"
                      type="email"
                      [(ngModel)]="form.correo"
                      required
                      placeholder="tu@correo.com"
                    />
                  </div>

                  <!-- Disciplina -->
                  <div class="form-group full">
                    <label for="reg-disciplina">Disciplina *</label>
                    <select
                      id="reg-disciplina"
                      name="disciplina"
                      [(ngModel)]="form.disciplina"
                      required
                      (ngModelChange)="onDisciplinaChange($event)"
                    >
                      <option value="" disabled>Selecciona una disciplina</option>
                      @for (d of disciplinas; track d.value) {
                        <option [value]="d.value">{{ d.label }}</option>
                      }
                    </select>
                  </div>

                  <!-- Categoría (dinámica) -->
                  @if (categoriasDisponibles().length > 0) {
                    <div class="form-group full">
                      <label for="reg-categoria">Categoría *</label>
                      <select
                        id="reg-categoria"
                        name="categoria"
                        [(ngModel)]="form.categoria"
                        required
                      >
                        <option value="" disabled>Selecciona una categoría</option>
                        @for (c of categoriasDisponibles(); track c.value) {
                          <option [value]="c.value">{{ c.label }}</option>
                        }
                      </select>
                      <span class="field-hint">
                        {{ categoriasDisponibles().length }} categoría(s) disponible(s) para esta disciplina
                      </span>
                    </div>
                  }
                </div>

                <button
                  type="submit"
                  class="btn btn-primary submit-btn"
                  [disabled]="formState() === 'loading' || regForm.invalid"
                >
                  @if (formState() === 'loading') {
                    <span class="spinner"></span> Registrando...
                  } @else {
                    🏁 Inscribirme
                  }
                </button>

                <p class="form-note">
                  * Al inscribirte aceptas los términos y condiciones del evento.
                </p>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .registration-section {
      
      position: relative;
    }

    .registration-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6bff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .reg-grid {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 4rem;
      align-items: start;
      position: relative;
    }

    /* ── Info panel ─────────────────── */
    .reg-desc {
      color: var(--c-muted);
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .countdown-box {
      padding: 1.8rem;
      margin-bottom: 2rem;
    }

    .price-featured {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.2rem;
      background: linear-gradient(135deg, rgba(255,107,0,0.12), rgba(255,140,56,0.08));
      border: 1px solid rgba(255,107,0,0.25);
      border-radius: var(--r-md);
      margin-bottom: 1rem;
    }

    .pf-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--c-orange);
    }

    .pf-price {
      font-family: 'Bebas Neue', cursive;
      font-size: 3rem;
      color: var(--c-orange);
      line-height: 1;
      margin: 0.3rem 0;
    }

    .pf-date {
      font-size: 0.78rem;
      color: var(--c-muted);
    }

    .price-normal {
      text-align: center;
      font-size: 0.85rem;
      color: var(--c-muted);
    }

    .price-normal strong { color: var(--c-white); }

    .reg-features {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }

    .reg-feature {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 0.9rem;
      color: var(--c-muted);
    }

    .rf-check {
      width: 22px; height: 22px;
      border-radius: 50%;
      background: rgba(0,200,83,0.15);
      border: 1px solid rgba(0,200,83,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      color: var(--c-green);
      flex-shrink: 0;
    }

    /* ── Form ───────────────────────── */
    .reg-form {
      padding: 2.5rem;
    }

    .form-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-white);
      letter-spacing: 0.04em;
      margin-bottom: 1.8rem;
    }

    .form-error-msg {
      background: rgba(255,50,50,0.1);
      border: 1px solid rgba(255,50,50,0.3);
      border-radius: var(--r-sm);
      padding: 0.8rem 1rem;
      color: #ff6b6b;
      font-size: 0.9rem;
      margin-bottom: 1.2rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }

    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .form-group.full { grid-column: 1 / -1; }

    label {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    input, select {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      padding: 0.75rem 1rem;
      color: var(--c-white);
      font-family: var(--font-body);
      font-size: 1rem;
      transition: all var(--tr-fast);
      outline: none;
      width: 100%;
    }

    input:focus, select:focus {
      border-color: var(--c-blue);
      background: rgba(26,107,255,0.05);
      box-shadow: 0 0 0 3px rgba(26,107,255,0.12);
    }

    input::placeholder { color: var(--c-muted); opacity: 0.6; }

    select option { background: #131720; }

    .field-hint {
      font-size: 0.72rem;
      color: var(--c-muted);
      opacity: 0.7;
      font-style: italic;
    }

    .submit-btn {
      width: 100%;
      justify-content: center;
      font-size: 1.05rem;
      padding: 1rem;
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    .spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .form-note {
      text-align: center;
      font-size: 0.75rem;
      color: var(--c-muted);
      margin-top: 1rem;
    }

    /* ── Success state ──────────────── */
    .form-success {
      padding: 3rem;
      text-align: center;
    }

    .success-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: pulse 1s ease;
    }

    .form-success h3 {
      font-family: 'Bebas Neue', cursive;
      font-size: 2.5rem;
      color: var(--c-green);
      margin-bottom: 1rem;
    }

    .form-success p {
      color: var(--c-muted);
      margin-bottom: 1rem;
      line-height: 1.7;
    }

    .success-price {
      display: inline-block;
      background: rgba(0,200,83,0.1);
      border: 1px solid rgba(0,200,83,0.25);
      border-radius: var(--r-sm);
      padding: 0.6rem 1.2rem;
      color: var(--c-green);
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    .success-price strong { font-size: 1.1rem; }

    @media (max-width: 900px) {
      .reg-grid      { grid-template-columns: 1fr; }
      .form-grid     { grid-template-columns: 1fr; }
    }
  `]
})
export class RegistrationComponent implements OnInit {
  particles: string[] = [];
  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });
  }

  form: Participant = {
    nombre: '', edad: 0, ciudad: '', telefono: '',
    correo: '', disciplina: '' as Disciplina, categoria: '' as Categoria
  };

  formState      = signal<FormState>('idle');
  errorMessage   = signal('');
  successMessage = signal('');
  successPrice   = signal(0);

  // Disciplina seleccionada → categorías dinámicas
  selectedDisciplina = signal<Disciplina | ''>('');

  categoriasDisponibles = computed(() => {
    const disc = this.selectedDisciplina();
    if (!disc) return [];
    return CATEGORIAS_POR_DISCIPLINA[disc] || [];
  });

  disciplinas = [
    { value: 'running',  label: '🏃 Running' },
    { value: 'ciclismo', label: '🚴 Ciclismo' },
    { value: 'natacion', label: '🏊 Natación' },
  ];

  benefits = [
    'Kit de bienvenida del evento',
    'Número de competidor oficial',
    'Hidratación en recorrido',
    'Certificado de participación',
    'Ambiente deportivo y familiar',
  ];

  constructor(private regSvc: RegistrationService) {}

  onDisciplinaChange(disc: Disciplina) {
    this.selectedDisciplina.set(disc);
    // Reset categoría al cambiar disciplina
    this.form.categoria = '' as Categoria;

    // Si solo hay una categoría, auto-seleccionarla
    const cats = CATEGORIAS_POR_DISCIPLINA[disc];
    if (cats && cats.length === 1) {
      this.form.categoria = cats[0].value;
    }
  }

  submit() {
    if (this.formState() === 'loading') return;
    this.formState.set('loading');
    this.errorMessage.set('');

    this.regSvc.register(this.form).subscribe({
      next: res => {
        this.formState.set('success');
        this.successMessage.set(res.message);
        this.successPrice.set(res.precio);
      },
      error: err => {
        this.formState.set('error');
        this.errorMessage.set(
          err.error?.error || 'Error al registrar. Por favor intenta de nuevo.'
        );
      }
    });
  }

  resetForm() {
    this.form = {
      nombre: '', edad: 0, ciudad: '', telefono: '',
      correo: '', disciplina: '' as Disciplina, categoria: '' as Categoria
    };
    this.selectedDisciplina.set('');
    this.formState.set('idle');
  }
}
