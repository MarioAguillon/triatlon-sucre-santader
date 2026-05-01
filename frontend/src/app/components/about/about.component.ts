// ============================================================
// components/about/about.component.ts
// ============================================================
import { Component, OnInit } from '@angular/core';
import { isEarlyBirdActive } from '../../utils/pricing';

@Component({
  selector:   'app-about',
  standalone: true,
  template: `
    <section id="evento" class="section about-section">
      <div class="section-bg">
        <img src="bg_about.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="about-grid">
          <!-- Left: Text -->
          <div class="about-text">
            <p class="section-label">Sobre el evento</p>
            <h2 class="section-title">Una experiencia<br>sin precedentes</h2>
            <p class="about-desc">
              El <strong>Triatlón Sucre Sin Límites 2.0</strong> es la segunda edición del evento deportivo
              más esperado de Sucre, Santander. Una prueba que combina resistencia, velocidad y determinación
              en un espectáculo que une a toda la comunidad.
            </p>
            <p class="about-desc">
              En el evento podrás participar en una, dos o tres disciplinas deportivas: running, ciclismo y natación, poniendo a prueba tus límites en un entorno natural único en el sur de Santander.
            </p>

            <div class="about-highlights">
              @for (h of highlights; track h.label) {
                <div class="highlight-item">
                  <span class="highlight-icon material-symbols-outlined">{{ h.icon }}</span>
                  <div>
                    <strong>{{ h.label }}</strong>
                    <small>{{ h.value }}</small>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Right: Event card -->
          <div class="about-card-wrap">
            <div class="event-card glass">
              <div class="event-card-header">
                <span class="event-edition">2ª Edición</span>
                <h3>Triatlón Sucre<br>Sin Límites</h3>
              </div>

              <div class="event-details">
                @for (d of details; track d.label) {
                  <div class="detail-row">
                    <span class="detail-icon material-symbols-outlined">{{ d.icon }}</span>
                    <div>
                      <small>{{ d.label }}</small>
                      <strong>{{ d.value }}</strong>
                    </div>
                  </div>
                }
              </div>

              <a href="#inscripcion" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:1.5rem;">
                <span class="material-symbols-outlined" style="margin-right:8px;">sports_score</span> Inscribirse Ahora
              </a>
            </div>

            <!-- Floating badge -->
            @if (isEarlyBirdActive()) {
              <div class="floating-badge">
                <span class="badge-price">$15.000</span>
                <span class="badge-label">Hasta el 30 de abril</span>
              </div>
            } @else {
              <div class="floating-badge" style="background: linear-gradient(135deg, #1a6bff, #004ecc); box-shadow: 0 8px 32px rgba(26,107,255,0.4);">
                <span class="badge-price">$30.000</span>
                <span class="badge-label">Inscripción General</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section { position: relative; overflow: hidden;
      
      border-top: 1px solid var(--c-border);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-desc {
      color: var(--c-muted);
      margin-bottom: 1.2rem;
      line-height: 1.8;
      font-size: 1.05rem;
    }

    .about-desc strong, .about-desc em {
      color: var(--c-orange);
      font-style: normal;
    }

    .about-highlights {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255,255,255,0.03);
      border: 1px solid var(--c-border);
      border-radius: var(--r-md);
      transition: all var(--tr-fast);
    }

    .highlight-item:hover {
      border-color: rgba(26,107,255,0.3);
      background: rgba(26,107,255,0.05);
    }

    .highlight-icon { font-size: 2rem; }

    .highlight-item strong {
      display: block;
      font-size: 0.9rem;
      color: var(--c-white);
      margin-bottom: 2px;
    }

    .highlight-item small {
      font-size: 0.8rem;
      color: var(--c-muted);
    }

    /* ── Event card ─────────────────── */
    .about-card-wrap {
      position: relative;
    }

    .event-card {
      padding: 2.5rem;
    }

    .event-card-header {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--c-border);
    }

    .event-edition {
      display: inline-block;
      background: var(--g-orange);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 50px;
      margin-bottom: 1rem;
    }

    .event-card-header h3 {
      font-family: 'Bebas Neue', cursive;
      font-size: 2.2rem;
      color: var(--c-white);
      line-height: 1.1;
    }

    .event-details {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .detail-icon { font-size: 1.5rem; }

    .detail-row small {
      display: block;
      font-size: 0.75rem;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 2px;
    }

    .detail-row strong {
      font-size: 1rem;
      color: var(--c-white);
    }

    /* ── Floating badge ─────────────── */
    .floating-badge {
      position: absolute;
      top: -20px;
      right: -20px;
      background: linear-gradient(135deg, #00c853, #009c40);
      padding: 1rem 1.5rem;
      border-radius: var(--r-md);
      text-align: center;
      box-shadow: 0 8px 32px rgba(0,200,83,0.4);
      animation: float 3s ease-in-out infinite;
    }

    .badge-price {
      display: block;
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: #fff;
      line-height: 1;
    }

    .badge-label {
      display: block;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.8);
      font-weight: 600;
    }

    @media (max-width: 900px) {
      .about-grid { grid-template-columns: 1fr; }
      .floating-badge { top: -15px; right: 10px; }
    }
  `]
})
export class AboutComponent implements OnInit {
  particles: string[] = [];
  isEarlyBirdActive = isEarlyBirdActive;

  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });
  }

  highlights = [
    { icon: 'emoji_events', label: 'Segunda Edición',       value: 'Más exigente, competitiva y participativa' },
    { icon: 'landscape', label: 'Naturaleza santandereana', value: 'Paisajes únicos de Sucre, Santander' },
    { icon: 'group', label: 'Abierto a todos',        value: 'Individual y por categorías' },
  ];

  get details() {
    return [
      { icon: 'calendar_month', label: 'Fecha del evento', value: '18 de julio de 2026' },
      { icon: 'location_on', label: 'Ubicación',        value: 'Sucre, Santander, Colombia' },
      { icon: 'sprint', label: 'Modalidades',      value: 'Running · Ciclismo · Natación' },
      { icon: 'payments', label: 'Inscripción',      value: isEarlyBirdActive() ? '$15.000 antes del 30 de abril' : '$30.000 General' },
    ];
  }
}
