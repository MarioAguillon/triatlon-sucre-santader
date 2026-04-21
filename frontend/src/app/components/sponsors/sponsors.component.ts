// ============================================================
// components/sponsors/sponsors.component.ts
// ============================================================
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { RegistrationService }       from '../../services/registration.service';
import { Sponsor }                   from '../../models/participant.model';

@Component({
  selector:   'app-sponsors',
  standalone: true,
  imports:    [CommonModule],
  template: `
    <section id="patrocinadores" class="section sponsors-section">
      <div class="section-bg">
        <img src="bg_hero.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="section-header" style="text-align:center">
          <p class="section-label">Apoyan el evento</p>
          <h2 class="section-title">Nuestros Patrocinadores</h2>
          <p class="section-subtitle" style="margin-inline:auto">
            Gracias a todas las instituciones, empresas y personas que hacen posible este gran evento deportivo.
          </p>
        </div>

        <!-- Categories -->
        <div class="sponsor-categories">
          @for (cat of categories; track cat.tipo) {
            @if (getSponsorsByType(cat.tipo).length > 0) {
              <div class="sponsor-category">
                <div class="cat-label">
                  <span class="material-symbols-outlined">{{ cat.icon }}</span>
                  <span>{{ cat.label }}</span>
                </div>
                <div class="sponsor-grid">
                  @for (s of getSponsorsByType(cat.tipo); track s.id) {
                    <div class="sponsor-card" [class]="'cat-' + cat.tipo">
                      @if (s.logo_url) {
                        <img [src]="s.logo_url" [alt]="s.nombre" class="sponsor-logo" />
                      } @else {
                        <div class="sponsor-placeholder">
                          <span class="material-symbols-outlined">{{ cat.icon }}</span>
                        </div>
                      }
                      <div class="sponsor-name">{{ s.nombre }}</div>
                    </div>
                  }
                </div>
              </div>
            }
          }
        </div>

        <!-- Empty state -->
        @if (sponsors().length === 0 && !loading()) {
          <div class="sponsors-empty">
            <p>Pronto anunciaremos nuestros patrocinadores <span class="material-symbols-outlined" style="vertical-align: middle;">emoji_events</span></p>
            <p class="sponsors-contact">¿Deseas patrocinar el evento? Contáctanos.</p>
          </div>
        }

        <!-- Loading -->
        @if (loading()) {
          <div class="sponsors-loading">
            <div class="loading-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        }

        <!-- CTA Patrocinar -->
        <div class="sponsor-cta-box glass">
          <div class="cta-content">
            <h3>¿Quieres patrocinar el Triatlón?</h3>
            <p>Apoya el deporte en Sucre, Santander y llega a toda la comunidad.</p>
          </div>
          <div class="cta-buttons">
            <a href="mailto:triatlon.sucre.2026&#64;gmail.com" class="btn btn-outline">
              <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">mail</span> Contactar
            </a>
            <a href="#pagos" class="btn btn-primary">
              <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">volunteer_activism</span> Hacer un Aporte
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .sponsors-section {
      
      border-top: 1px solid var(--c-border);
    }

    .section-header { margin-bottom: 3.5rem; }

    /* ── Categories ─────────────────── */
    .sponsor-categories {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .cat-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--c-muted);
      margin-bottom: 1.2rem;
    }

    /* ── Sponsor grid ───────────────── */
    .sponsor-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;
    }

    .sponsor-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.7rem;
      padding: 1.5rem 1rem;
      background: var(--c-card);
      border: 1px solid var(--c-border);
      border-radius: var(--r-md);
      transition: all var(--tr-med);
      cursor: default;
    }

    .sponsor-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255,255,255,0.15);
      box-shadow: var(--sh-card);
    }

    .sponsor-card.cat-alcaldia:hover { border-color: rgba(26,107,255,0.4); }
    .sponsor-card.cat-empresa:hover  { border-color: rgba(255,107,0,0.4); }
    .sponsor-card.cat-persona:hover  { border-color: rgba(0,200,83,0.4); }

    .sponsor-logo {
      width: 80px; height: 60px;
      object-fit: contain;
      filter: brightness(0) invert(0.8);
      transition: filter var(--tr-fast);
    }

    .sponsor-card:hover .sponsor-logo {
      filter: brightness(0) invert(1);
    }

    .sponsor-placeholder {
      width: 70px; height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      opacity: 0.4;
    }

    .sponsor-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--c-muted);
      text-align: center;
      line-height: 1.3;
    }

    /* ── Empty / Loading ─────────────── */
    .sponsors-empty {
      text-align: center;
      padding: 3rem;
      color: var(--c-muted);
    }

    .sponsors-contact {
      margin-top: 0.5rem;
      color: var(--c-blue-light);
      font-size: 0.9rem;
    }

    .sponsors-loading {
      display: flex;
      justify-content: center;
      padding: 3rem;
    }

    .loading-dots { display: flex; gap: 8px; }

    .loading-dots span {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: var(--c-blue);
      animation: dotPulse 1.4s ease-in-out infinite;
    }

    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes dotPulse {
      0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
      40%            { transform: scale(1.2); opacity: 1; }
    }

    /* ── CTA box ────────────────────── */
    .sponsor-cta-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 2rem 2.5rem;
      margin-top: 2rem;
    }

    .cta-content h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--c-white);
      margin-bottom: 0.3rem;
    }

    .cta-content p {
      color: var(--c-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 600px) {
      .sponsor-cta-box { flex-direction: column; text-align: center; }
      .cta-buttons { flex-direction: column; width: 100%; }
    }

    .cta-buttons {
      display: flex;
      gap: 0.8rem;
      flex-shrink: 0;
    }
  `]
})
export class SponsorsComponent implements OnInit {
  sponsors = signal<Sponsor[]>([]);
  loading  = signal(true);

  categories = [
    { tipo: 'alcaldia', label: 'Alcaldías y Entidades Públicas', icon: 'account_balance' },
    { tipo: 'empresa',  label: 'Empresas Patrocinadoras',        icon: 'domain' },
    { tipo: 'persona',  label: 'Patrocinadores Particulares',    icon: 'handshake' },
  ];

  constructor(private regSvc: RegistrationService) {}

  particles: string[] = [];
  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => { const x = Math.random() * 100; const dur = 8 + Math.random() * 12; const del = Math.random() * 8; const size = 2 + Math.random() * 4; return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`; });

    this.regSvc.getSponsors().subscribe({
      next: data => { this.sponsors.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  getSponsorsByType(tipo: string): Sponsor[] {
    return this.sponsors().filter(s => s.tipo === tipo);
  }
}
