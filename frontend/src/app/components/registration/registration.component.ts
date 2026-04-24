// ============================================================
// components/registration/registration.component.ts
// ============================================================
import { Component, OnInit, AfterViewInit, ElementRef, NgZone, signal, computed } from '@angular/core';
import { CommonModule }                from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { environment }                 from '../../../environments/environment';
import { RegistrationService }         from '../../services/registration.service';
import {
  Participant,
  Disciplina,
  Categoria,
  CATEGORIAS_GLOBALES,
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
                <p class="success-next-step">
                  Por favor, revisa tu bandeja de entrada (o carpeta de spam). Ahora puedes continuar con el pago para completar tu registro.
                </p>
                <a href="#pagos" class="btn btn-primary btn-pagos-cta">
                  <span class="material-symbols-outlined" style="margin-right:6px;vertical-align:middle">payments</span>
                  Continuar a pagos
                </a>
                <button class="btn btn-outline" (click)="resetForm()" style="margin-top:0.8rem">
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
                    <label for="reg-ciudad">Ciudad o Vereda *</label>
                    <input
                      id="reg-ciudad"
                      name="ciudad"
                      type="text"
                      [(ngModel)]="form.ciudad"
                      required
                      placeholder="Ej: Sucre, La Sabana, Vélez..."
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

                  <!-- ¿Participó en la primera edición? -->
                  <div class="form-group">
                    <label for="reg-primera">¿Participó en la primera edición? *</label>
                    <select
                      id="reg-primera"
                      name="participo_primera_edicion"
                      [(ngModel)]="form.participo_primera_edicion"
                      required
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="SI">Sí, participé</option>
                      <option value="NO">No, es mi primera vez</option>
                    </select>
                  </div>

                  <!-- Disciplina (Múltiple) -->
                  <div class="form-group full">
                    <label>Disciplina (Puedes elegir varias) *</label>
                    <div class="checkbox-group">
                      @for (d of disciplinas; track d.value) {
                        <label class="checkbox-label">
                          <input
                            type="checkbox"
                            [value]="d.value"
                            (change)="onDisciplinaToggle(d.value, $event)"
                            [checked]="selectedDisciplinasSet.has(d.value)"
                          />
                          <span class="checkbox-text">{{ d.label }}</span>
                        </label>
                      }
                    </div>
                  </div>

                  <!-- Categoría (Global) -->
                  <div class="form-group full">
                    <label for="reg-categoria">Categoría (Nivel de competencia) *</label>
                    <select
                      id="reg-categoria"
                      name="categoria"
                      [(ngModel)]="form.categoria"
                      required
                    >
                      <option value="" disabled>Selecciona una categoría</option>
                      @for (c of categoriasGlobales; track c.value) {
                        <option [value]="c.value">{{ c.label }}</option>
                      }
                    </select>
                    <span class="field-hint">
                      Selecciona tu nivel. Aplicará para todas las disciplinas que elijas.
                    </span>
                  </div>
                </div>

                <!-- Google reCAPTCHA v2 Real -->
                <div class="captcha-wrapper">
                  <div id="recaptcha-container"></div>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary submit-btn"
                  [disabled]="formState() === 'loading' || regForm.invalid || !isRobotVerified()"
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

    .checkbox-group {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.95rem;
      color: var(--c-white);
      text-transform: none;
      letter-spacing: normal;
      font-weight: 500;
    }

    .checkbox-label input {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--c-blue);
    }

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

    .category-info-box {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem 1.2rem;
      background: rgba(26,107,255,0.08);
      border: 1px dashed var(--c-blue);
      border-radius: var(--r-sm);
      color: var(--c-muted);
      font-size: 0.9rem;
    }

    .category-info-box strong { color: var(--c-blue); }

    /* ── reCAPTCHA Container ──────────── */
    .captcha-wrapper {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: center;
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

    .success-next-step {
      color: var(--c-muted);
      font-size: 0.92rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      max-width: 380px;
      margin-inline: auto;
    }

    .btn-pagos-cta {
      width: 100%;
      justify-content: center;
      font-size: 1.05rem;
      padding: 1rem;
      box-shadow: 0 8px 32px rgba(26,107,255,0.4);
    }

    @media (max-width: 900px) {
      .reg-grid      { grid-template-columns: 1fr; }
      .form-grid     { grid-template-columns: 1fr; }
    }
  `]
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  particles: string[] = [];
  private recaptchaWidgetId: number | null = null;
  private captchaToken = '';

  constructor(
    private regSvc: RegistrationService,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });
  }

  ngAfterViewInit() {
    this.renderRecaptcha();
  }

  /** Renderiza el widget reCAPTCHA v2 de Google */
  private renderRecaptcha() {
    const w = window as any;
    if (w.grecaptcha && w.grecaptcha.render) {
      this.doRender();
    } else {
      // Si el script aún no cargó, registrar callback global
      w.onRecaptchaLoad = () => this.doRender();
    }
  }

  private doRender() {
    const container = document.getElementById('recaptcha-container');
    if (!container || this.recaptchaWidgetId !== null) return;

    const w = window as any;
    this.recaptchaWidgetId = w.grecaptcha.render('recaptcha-container', {
      sitekey: environment.recaptchaSiteKey,
      callback: (token: string) => {
        this.ngZone.run(() => {
          this.captchaToken = token;
          this.isRobotVerified.set(true);
        });
      },
      'expired-callback': () => {
        this.ngZone.run(() => {
          this.captchaToken = '';
          this.isRobotVerified.set(false);
        });
      },
      theme: 'dark',
    });
  }

  form: Participant = {
    nombre: '', edad: 0, ciudad: '', telefono: '',
    correo: '', disciplina: '', categoria: '' as Categoria,
    participo_primera_edicion: '' as any
  };

  isRobotVerified = signal(false);

  formState      = signal<FormState>('idle');
  errorMessage   = signal('');
  successMessage = signal('');
  successPrice   = signal(0);

  selectedDisciplinasSet = new Set<string>();

  categoriasGlobales = CATEGORIAS_GLOBALES;

  disciplinas = [
    { value: 'running',  label: 'Running' },
    { value: 'ciclismo', label: 'Ciclismo' },
    { value: 'natacion', label: 'Natación' },
  ];

  benefits = [
    'Número',
    'Hidratación',
    'Carro Escoba',
    'Servicio de Ambulancia',
    'Póliza de asistencia',
  ];

  onDisciplinaToggle(value: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedDisciplinasSet.add(value);
    } else {
      this.selectedDisciplinasSet.delete(value);
    }
  }

  submit() {
    if (this.formState() === 'loading') return;
    
    if (this.selectedDisciplinasSet.size === 0) {
      this.formState.set('error');
      this.errorMessage.set('Debes seleccionar al menos una disciplina.');
      return;
    }

    this.form.disciplina = Array.from(this.selectedDisciplinasSet).join(', ');

    this.formState.set('loading');
    this.errorMessage.set('');

    this.regSvc.register(this.form, this.captchaToken).subscribe({
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
        // Reset reCAPTCHA para que el usuario pueda intentar de nuevo
        this.resetCaptcha();
      }
    });
  }

  private resetCaptcha() {
    const w = window as any;
    if (w.grecaptcha && this.recaptchaWidgetId !== null) {
      w.grecaptcha.reset(this.recaptchaWidgetId);
    }
    this.captchaToken = '';
    this.isRobotVerified.set(false);
  }

  resetForm() {
    this.form = {
      nombre: '', edad: 0, ciudad: '', telefono: '',
      correo: '', disciplina: '', categoria: '' as Categoria,
      participo_primera_edicion: '' as any
    };
    this.selectedDisciplinasSet.clear();
    this.formState.set('idle');
    this.resetCaptcha();
  }
}
