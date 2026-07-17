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

        <!-- Alcaldía Prominente -->
        <a href="https://www.sucre-santander.gov.co/" target="_blank" rel="noopener noreferrer" class="alcaldia-wrapper">
          <img src="patrocinadores/logo_alcaldia.png" alt="Escudo Alcaldía de Sucre" class="alcaldia-logo">
          <h3 class="alcaldia-text">ALCALDÍA DE SUCRE SANTANDER</h3>
        </a>

        <!-- Categories -->
        <div class="sponsor-categories">
          @for (cat of categories; track cat.tipo) {
            <div class="sponsor-category">
              <div class="cat-label">
                <span class="material-symbols-outlined">{{ cat.icon }}</span>
                <span>{{ cat.label }}</span>
              </div>
              <div class="sponsor-grid" [class]="'grid-' + cat.tipo">
                @for (s of getSponsorsByType(cat.tipo); track s.id) {
                  <div class="sponsor-card" [class]="'cat-' + cat.tipo" [class.has-logo]="!!s.logo_url" 
                       [style.cursor]="s.sitio_web ? 'pointer' : ''"
                       (click)="openLink(s.sitio_web)">
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
                
                <!-- Tarjeta placeholder para invitar a patrocinadores -->
                <div class="sponsor-card" style="border-style: dashed; cursor: pointer; border-color: rgba(255,255,255,0.3);" onclick="window.open('https://wa.me/573102198939?text=Hola,%20quiero%20contactarme%20para%20realizar%20un%20aporte%20a%20la%20Triatl%C3%B3n%20Sucre%20Santander.', '_blank')">
                  <div class="sponsor-placeholder" style="opacity: 0.8;">
                    <span class="material-symbols-outlined" style="font-size: 3rem; color: var(--c-muted);">add_photo_alternate</span>
                  </div>
                  <div class="sponsor-name" style="color: var(--c-white); font-size: 0.95rem; margin-top: 0.5rem;">Tu logo aquí</div>
                  <div style="font-size: 0.75rem; color: var(--c-muted); text-align: center; margin-top: 4px;">Espacio para patrocinadores</div>
                </div>
              </div>
            </div>
          }
        </div>

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
            <a href="https://wa.me/573102198939?text=Hola,%20quiero%20contactarme%20para%20realizar%20un%20aporte%20a%20la%20Triatl%C3%B3n%20Sucre%20Santander." target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">chat</span> Contactar
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

    /* ── Alcaldía Principal Premium ──────────── */
    .alcaldia-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2rem auto 2.5rem auto; /* Reducido para que esté más pegado a las tarjetas */
      max-width: 550px;
      padding: 3.5rem 1.5rem;
      gap: 1.5rem;
      background: linear-gradient(180deg, rgba(20,25,35,0.7) 0%, rgba(5,8,12,0.95) 100%);
      border: 1px solid rgba(255,255,255,0.03);
      border-top: 1px solid rgba(255,255,255,0.1);
      border-radius: 28px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 2px 20px rgba(255,255,255,0.03);
      position: relative;
      overflow: hidden;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .alcaldia-wrapper:hover {
      transform: translateY(-5px);
      box-shadow: 0 40px 70px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255,255,255,0.05);
    }
    
    .alcaldia-wrapper::before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%);
      pointer-events: none;
      z-index: 0;
    }

    .alcaldia-logo {
      height: 260px;
      z-index: 1;
      object-fit: contain;
      filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6));
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .alcaldia-wrapper:hover .alcaldia-logo {
      transform: scale(1.05) translateY(-5px);
    }
    
    .alcaldia-text {
      z-index: 1;
      font-size: 1.8rem;
      font-weight: 900;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-align: center;
      margin: 0;
      background: linear-gradient(180deg, #ffffff 0%, #9ba3b5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8));
    }

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
    
    /* Grid específico para personas y empresas (imágenes horizontales más anchas) */
    .sponsor-grid.grid-persona,
    .sponsor-grid.grid-empresa {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .sponsor-grid.grid-persona .sponsor-card,
    .sponsor-grid.grid-empresa .sponsor-card {
      aspect-ratio: 1 / 1;
      justify-content: center;
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

    .sponsor-card:not(.cat-persona):not(.cat-empresa):hover .sponsor-logo {
      filter: brightness(0) invert(1);
    }

    /* ── Estilos específicos para Tarjetas Completas (Personas y Empresas) ── */
    .sponsor-card.cat-persona.has-logo,
    .sponsor-card.cat-empresa.has-logo {
      padding: 0;
      border: none;
      background: transparent;
      overflow: hidden;
      border-radius: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
    }

    .sponsor-card.cat-empresa.has-logo {
      background: #ffffff;
    }

    .sponsor-card.cat-persona.has-logo .sponsor-logo,
    .sponsor-card.cat-empresa.has-logo .sponsor-logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
      max-height: none;
      filter: none; 
      display: block;
      transition: transform var(--tr-med), box-shadow var(--tr-med);
    }

    .sponsor-card.cat-persona.has-logo:hover,
    .sponsor-card.cat-empresa.has-logo:hover {
      transform: none; /* Desactivamos el scale del padre para no romper border-radius */
    }

    .sponsor-card.cat-persona.has-logo:hover .sponsor-logo,
    .sponsor-card.cat-empresa.has-logo:hover .sponsor-logo {
      transform: scale(1.05);
    }

    .sponsor-card.cat-persona.has-logo .sponsor-name,
    .sponsor-card.cat-empresa.has-logo .sponsor-name {
      display: none; /* Ocultamos el texto porque ya viene en la imagen */
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
  sponsors = signal<Sponsor[]>([
    { id: 101, nombre: 'Heymar García Ariza', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_heymar.png' },
    { id: 102, nombre: 'Carlos Darío Marín', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_carlos.png' },
    { id: 103, nombre: 'Cristian Mateus Marín', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_cristian.png' },
    { id: 104, nombre: 'Hely Marin González', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_hely.png' },
    { id: 105, nombre: 'Néstor', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_nestor.png' },
    { id: 106, nombre: 'Lelio', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_lelio.png' },
    { id: 107, nombre: 'Fanny', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_fanny.png' },
    { id: 108, nombre: 'Andres', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_andres.png' },
    { id: 109, nombre: 'Samantha', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_samantha.png' },
    { id: 114, nombre: 'Juan Peña', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_juanpena.png' },
    { id: 115, nombre: 'Edwin', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_edwin.png' },
    { id: 119, nombre: 'Oscar', tipo: 'persona', logo_url: 'patrocinadores/tarjeta_oscar.png' },
    { id: 110, nombre: 'Heladería Oohz', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_oohz.png', sitio_web: 'https://www.instagram.com/heladeriaoohz7?igsh=MXUzOHc0YXo0M3VhYQ==' },
    { id: 111, nombre: 'Dra Katherin Escamilla', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_katy.png', sitio_web: 'https://www.instagram.com/consultoriodrakatherin?igsh=NzdkbmNwYW14NXRx' },
    { id: 112, nombre: 'Sosa', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_sosa.png', sitio_web: 'https://wa.me/573123540901' },
    { id: 113, nombre: 'Dany', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_dany.png', sitio_web: 'https://wa.me/573023432762' },
    { id: 116, nombre: 'CIIS', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_ciis.png', sitio_web: 'https://wa.me/573022848504' },
    { id: 117, nombre: 'Disac', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_disac.png', sitio_web: 'https://www.instagram.com/disac_comercializadora?igsh=YWk3aDg3ZjN2dDY1' },
    { id: 118, nombre: 'Alma', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_alma.png', sitio_web: 'https://wa.me/573144813369' },
    { id: 120, nombre: 'Armando', tipo: 'empresa', logo_url: 'patrocinadores/tarjeta_armando.png', sitio_web: 'https://wa.me/573102198939' }
  ]);
  loading  = signal(true);

  categories = [
    { tipo: 'empresa', label: 'Empresas y Comercios', icon: 'storefront' },
    { tipo: 'persona', label: 'Aportes Individuales', icon: 'groups' },
  ];

  constructor(private regSvc: RegistrationService) {}

  particles: string[] = [];
  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => { const x = Math.random() * 100; const dur = 8 + Math.random() * 12; const del = Math.random() * 8; const size = 2 + Math.random() * 4; return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`; });

    this.regSvc.getSponsors().subscribe({
      next: data => { 
        // Mezclamos los quemados con los de la base de datos
        this.sponsors.set([...this.sponsors(), ...data]); 
        this.loading.set(false); 
      },
      error: ()   => this.loading.set(false),
    });
  }

  getSponsorsByType(tipo: string): Sponsor[] {
    return this.sponsors().filter(s => s.tipo === tipo && s.nombre && s.nombre.trim() !== '' && s.logo_url);
  }

  openLink(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
