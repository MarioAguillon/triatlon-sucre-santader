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
                <span>🏆</span>
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
                <a href="#" class="social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" class="social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                </a>
                <a href="#" class="social-btn" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
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
                <li><a href="mailto:triatlon.sucre.2026@gmail.com">Contacto</a></li>
              </ul>
            </div>

            <!-- Event info -->
            <div class="footer-col">
              <h4>Información</h4>
              <div class="footer-info">
                @for (info of eventInfo; track info.label) {
                  <div class="footer-info-row">
                    <span>{{ info.icon }}</span>
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
      background: linear-gradient(90deg, #fff, #ff6b00);
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
    { icon: '📅', label: 'Fecha',    value: '18 de julio de 2026' },
    { icon: '📍', label: 'Lugar',    value: 'Sucre, Santander, Colombia' },
    { icon: '📧', label: 'Contacto', value: 'triatlon.sucre.2026@gmail.com' },
  ];
}
