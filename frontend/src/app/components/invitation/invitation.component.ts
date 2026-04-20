// ============================================================
// components/invitation/invitation.component.ts
// ============================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector:   'app-invitation',
  standalone: true,
  template: `
    <section id="invitacion" class="section invitation-section">
      <div class="section-bg">
        <img src="bg_invitation.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <!-- Decorative background -->
      <div class="inv-bg-deco">
        <div class="deco-circle c1"></div>
        <div class="deco-circle c2"></div>
      </div>

      <div class="container">
        <!-- Header -->
        <div class="inv-header">
          <p class="section-label">¡Únete a nosotros!</p>
          <h2 class="section-title">Una invitación<br>para <span class="accent-text">todos</span></h2>
        </div>

        <div class="inv-grid">
          <!-- Invitation text -->
          <div class="inv-message glass">
            <p class="inv-text">
              Invitamos a nuestros amigos de los corregimientos de <strong>La Pradera, La Sabana y La Granja</strong>, 
              así como de centros poblados como <strong>Arales, El Porvenir</strong> y de todas las veredas de nuestro municipio.
            </p>
            <p class="inv-text">
              Extendemos esta invitación a deportistas de municipios cercanos como <strong>Bolívar, Barbosa, Vélez, Guavatá, 
              Jesús María, La Belleza, Florián, Puente Nacional</strong> y demás poblaciones de la región.
            </p>
            <p class="inv-text">
              También damos una cálida bienvenida a la colonia sucreña residente en <strong>Bucaramanga, Bogotá</strong> y en 
              diferentes ciudades de Colombia, para que regresen a vivir una jornada inolvidable en su tierra.
            </p>
            <div class="elegant-cta">
              No importa si eres principiante o experimentado:<br>
              <strong>lo más importante es participar, disfrutar el recorrido y compartir la pasión por el deporte.</strong>
            </div>
            <p class="inv-signature">
              Únete a nosotros y vive una experiencia deportiva que recordarás siempre.
            </p>
          </div>

          <!-- Info cards -->
          <div class="inv-cards">
            <!-- Precio -->
            <div class="info-card price-card">
              <h3 class="info-card-title"><span class="material-symbols-outlined" style="vertical-align:-4px; margin-right:4px;">payments</span> Costos de Inscripción</h3>
              <div class="price-options">
                <div class="price-option featured">
                  <div class="price-badge"><span class="material-symbols-outlined" style="vertical-align:-4px; font-size:inherit; margin-right:2px;">star</span> PREFERENCIAL</div>
                  <div class="price-amount">$15.000</div>
                  <div class="price-condition">Hasta el 30 de abril de 2026</div>
                </div>
                <div class="price-divider">o</div>
                <div class="price-option">
                  <div class="price-amount normal">$30.000</div>
                  <div class="price-condition">Después del 30 de abril</div>
                </div>
              </div>
              <div class="early-bird-alert">
                <span class="material-symbols-outlined" style="vertical-align:-4px; margin-right:4px;">alarm</span> ¡No dejes pasar el precio preferencial!
              </div>
            </div>

            <!-- Detalles -->
            <div class="info-card details-card">
              @for (d of eventInfo; track d.label) {
                <div class="info-row">
                  <span class="info-icon material-symbols-outlined">{{ d.icon }}</span>
                  <div>
                    <small>{{ d.label }}</small>
                    <strong>{{ d.value }}</strong>
                  </div>
                </div>
              }

              <a href="#inscripcion" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:1.5rem;">
                <span class="material-symbols-outlined" style="margin-right:8px;">sports_score</span> Inscribirse Ahora
              </a>
            </div>

            <!-- Municipios -->
            <div class="info-card towns-card">
              <h3 class="info-card-title"><span class="material-symbols-outlined" style="vertical-align:-4px; margin-right:4px;">pin_drop</span> Invitamos desde</h3>
              <div class="towns-grid">
                @for (t of towns; track t) {
                  <span class="town-tag">{{ t }}</span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .invitation-section {
      
      position: relative;
      overflow: hidden;
    }

    .inv-bg-deco { position: absolute; inset: 0; pointer-events: none; }

    .deco-circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.06;
    }

    .c1 {
      width: 500px; height: 500px;
      background: var(--c-orange);
      top: -100px; right: -150px;
    }

    .c2 {
      width: 400px; height: 400px;
      background: var(--c-blue);
      bottom: -100px; left: -100px;
    }

    .inv-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .accent-text {
      background: linear-gradient(135deg, var(--c-orange), var(--c-green));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* ── Grid layout ────────────────── */
    .inv-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 2.5rem;
      align-items: start;
    }

    /* ── Invitation message ─────────── */
    .inv-message {
      padding: 2.5rem;
      position: relative;
    }

    .inv-text {
      color: var(--c-muted);
      line-height: 1.9;
      margin-bottom: 1.2rem;
      font-size: 1.05rem;
    }

    .inv-text strong {
      color: var(--c-white);
      font-weight: 600;
    }

    .elegant-cta {
      margin-top: 2rem;
      padding: 1.4rem 1.8rem;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--r-md);
      color: var(--c-white);
      font-size: 1.1rem;
      line-height: 1.6;
      text-align: center;
      border-left: 4px solid var(--c-orange);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .elegant-cta strong {
      display: block;
      margin-top: 0.5rem;
      color: var(--c-orange);
      font-weight: 700;
      font-size: 1.15rem;
    }

    .inv-signature {
      margin-top: 2rem;
      font-family: inherit;
      font-style: italic;
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      text-align: center;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .inv-text {
        font-size: 1rem;
        line-height: 1.7;
      }
      .elegant-cta {
        padding: 1.2rem;
        font-size: 1rem;
      }
      .elegant-cta strong {
        font-size: 1.05rem;
      }
      .inv-signature {
        font-size: 1.15rem;
      }
    }

    /* ── Info cards stack ───────────── */
    .inv-cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card {
      background: var(--c-card);
      border: 1px solid var(--c-border);
      border-radius: var(--r-lg);
      padding: 1.8rem;
    }

    .info-card-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--c-white);
      margin-bottom: 1.2rem;
    }

    /* Precio card */
    .price-card { border-color: rgba(255,107,0,0.25); }

    .price-options {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .price-option {
      flex: 1;
      text-align: center;
    }

    .price-option.featured {
      background: linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,140,56,0.15));
      border: 1px solid rgba(255,107,0,0.3);
      border-radius: var(--r-md);
      padding: 1rem;
    }

    .price-badge {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: var(--c-orange);
      margin-bottom: 0.5rem;
    }

    .price-amount {
      font-family: 'Bebas Neue', cursive;
      font-size: 2.5rem;
      color: var(--c-orange);
      line-height: 1;
    }

    .price-amount.normal {
      font-size: 2rem;
      color: var(--c-muted);
    }

    .price-condition {
      font-size: 0.75rem;
      color: var(--c-muted);
      margin-top: 0.3rem;
    }

    .price-divider {
      color: var(--c-muted);
      font-weight: 600;
    }

    .early-bird-alert {
      background: rgba(255,107,0,0.08);
      border: 1px dashed rgba(255,107,0,0.3);
      border-radius: var(--r-sm);
      padding: 0.6rem 1rem;
      font-size: 0.82rem;
      color: var(--c-orange-light);
      text-align: center;
    }

    /* Details card */
    .info-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid var(--c-border);
    }

    .info-row:last-of-type { border-bottom: none; }

    .info-icon { font-size: 1.5rem; }

    .info-row small {
      display: block;
      font-size: 0.7rem;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .info-row strong {
      font-size: 1rem;
      color: var(--c-white);
    }

    /* Towns card */
    .towns-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .town-tag {
      padding: 4px 12px;
      background: rgba(26,107,255,0.1);
      border: 1px solid rgba(26,107,255,0.2);
      border-radius: 50px;
      font-size: 0.8rem;
      color: var(--c-blue-light);
      font-weight: 500;
      transition: all var(--tr-fast);
    }

    .town-tag:hover {
      background: rgba(26,107,255,0.2);
      transform: translateY(-1px);
    }

    @media (max-width: 900px) {
      .inv-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 480px) {
      .price-options { flex-direction: column; }
    }
  `]
})
export class InvitationComponent implements OnInit {
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

  eventInfo = [
    { icon: 'location_on', label: 'Lugar del evento', value: 'Sucre, Santander, Colombia' },
    { icon: 'calendar_month', label: 'Fecha',            value: '18 de julio de 2026' },
    { icon: 'schedule', label: 'Hora de inicio',   value: '7:00 AM' },
    { icon: 'phone', label: 'Información',       value: 'vía formulario de inscripción' },
  ];

  towns = [
    'La Pradera', 'La Sabana', 'La Granja', 'Arales',
    'Bolívar', 'Barbosa', 'Jesús María', 'Bucaramanga',
    'Bogotá', 'Sucre', 'Santander', 'Colombia 🇨🇴',
  ];
}
