// ============================================================
// components/footer/footer.component.ts
// ============================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector:   'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="section-bg">
        <img src="bg_about.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0d1117"/>
        </svg>
      </div>

      <div class="footer-body">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand -->
            <div class="footer-brand">
              <div class="brand-logo">
                <span class="material-symbols-outlined" style="font-size: 2.5rem; color: #00c853; padding-right: 10px;">emoji_events</span>
                <div>
                  <strong>TRIATLÓN</strong>
                  <small>Sucre Sin Límites 2.0</small>
                </div>
              </div>
              <p class="brand-desc">
                El evento deportivo más importante de Sucre, Santander.
                Natación, Ciclismo y Running en un solo espectáculo.
              </p>
              <div class="social-links">
                <a href="https://www.facebook.com/share/1DUM8vw3kG/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/triatlonsucresinlimites?igsh=YWR0OGN6Y2N6MDhn" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>

            <!-- Links -->
            <div class="footer-col">
              <h4>El Evento</h4>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#evento">Sobre el Evento</a></li>
                <li><a href="#disciplinas">Disciplinas</a></li>
                <li><a href="#invitacion">Invitación</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Participar</h4>
              <ul>
                <li><a href="#inscripcion">Inscripción</a></li>
                <li><a href="#patrocinadores">Patrocinadores</a></li>
                <li><a href="mailto:triatlonsucresantander@gmail.com?subject=Contacto%20desde%20la%20p%C3%A1gina%20web%20de%20la%20Triatl%C3%B3n%20Sucre%20Santander">Contacto</a></li>
              </ul>
            </div>

            <!-- Event info -->
            <div class="footer-col">
              <h4>Información</h4>
              <div class="footer-info">
                @for (info of eventInfo; track info.label) {
                  <div class="footer-info-row">
                    <span class="material-symbols-outlined">{{ info.icon }}</span>
                    <div>
                      <small>{{ info.label }}</small>
                      <span>{{ info.value }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-divider"></div>
            <div class="footer-bottom-content">
              <p>© 2026 Triatlón Sucre Sin Límites 2.0. Sucre, Santander, Colombia 🇨🇴</p>
              <p class="footer-made">Hecho con ❤️ para el deporte santandereano</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      background: #040508;
    }

    .footer-wave {
      line-height: 0;
      margin-bottom: -1px;
    }

    .footer-wave svg { width: 100%; height: 60px; display: block; }

    .footer-body {
      padding: 4rem 0 2rem;
      border-top: 1px solid var(--c-border);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    /* Brand */
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }

    .brand-logo div { display: flex; flex-direction: column; line-height: 1.1; }

    .brand-logo strong {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.4rem;
      background: linear-gradient(90deg, #00c853, #fff, #1a6bff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.06em;
    }

    .brand-logo small {
      font-size: 0.65rem;
      color: var(--c-muted);
      letter-spacing: 0.1em;
    }

    .brand-desc {
      color: var(--c-muted);
      font-size: 0.9rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .social-links { display: flex; gap: 0.7rem; }

    .social-btn {
      width: 40px; height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--c-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--c-muted);
      transition: all var(--tr-fast);
    }

    .social-btn:hover {
      background: var(--c-blue);
      border-color: var(--c-blue);
      color: #fff;
      transform: translateY(-2px);
    }

    /* Columns */
    .footer-col h4 {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--c-muted);
      margin-bottom: 1.2rem;
    }

    .footer-col ul { display: flex; flex-direction: column; gap: 0.7rem; }

    .footer-col a {
      color: rgba(255,255,255,0.5);
      font-size: 0.9rem;
      transition: color var(--tr-fast);
    }

    .footer-col a:hover { color: var(--c-white); }

    /* Info */
    .footer-info { display: flex; flex-direction: column; gap: 1rem; }

    .footer-info-row {
      display: flex;
      align-items: flex-start;
      gap: 0.7rem;
      font-size: 1.2rem;
    }

    .footer-info-row div {
      display: flex;
      flex-direction: column;
    }

    .footer-info-row small {
      font-size: 0.68rem;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .footer-info-row span:last-child {
      font-size: 0.88rem;
      color: var(--c-white);
    }

    /* Bottom */
    .footer-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--c-border), transparent);
      margin-bottom: 1.5rem;
    }

    .footer-bottom-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .footer-bottom-content p {
      font-size: 0.82rem;
      color: var(--c-muted);
    }

    .footer-made { color: rgba(255,107,0,0.6) !important; }

    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / -1; }
    }

    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr; }
      .footer-bottom-content { flex-direction: column; text-align: center; }
    }
  `]
})
export class FooterComponent implements OnInit {
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
    { icon: 'calendar_month', label: 'Fecha',    value: '18 de julio de 2026' },
    { icon: 'location_on', label: 'Lugar',    value: 'Sucre, Santander, Colombia' },
    { icon: 'mail', label: 'Contacto', value: 'triatlonsucresantander@gmail.com' },
  ];
}
