// ============================================================
// components/rutas/rutas.component.ts
// Rutas Oficiales — Natación, Ciclismo, Running
// ============================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rutas',
  standalone: true,
  template: `
    <section id="rutas" class="section rutas-section">
      <div class="section-bg">
        <img src="bg_disciplines.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="section-header">
          <p class="section-label">Conoce el recorrido</p>
          <h2 class="section-title">Rutas Oficiales</h2>
          <p class="section-subtitle">
            Explora las rutas oficiales de cada disciplina a través de los paisajes de Sucre, Santander.
          </p>
        </div>

        <div class="rutas-grid">
          @for (ruta of rutas; track ruta.name) {
            <div class="ruta-card" [style.--accent]="ruta.color">
              <!-- Placeholder para el mapa — Insertar aquí el mapa real de la ruta -->
              <div class="ruta-map-placeholder">
                <div class="map-icon">{{ ruta.icon }}</div>
                <span class="map-text">Mapa de {{ ruta.name }}</span>
                <span class="map-coming">Próximamente</span>
              </div>

              <div class="ruta-body">
                <div class="ruta-badge" [style.background]="ruta.color">{{ ruta.distance }}</div>
                <h3 class="ruta-title">{{ ruta.name }}</h3>
                <p class="ruta-desc">{{ ruta.desc }}</p>

                <div class="ruta-details">
                  @for (detail of ruta.details; track detail.label) {
                    <div class="ruta-detail">
                      <span class="rd-icon">{{ detail.icon }}</span>
                      <div>
                        <small>{{ detail.label }}</small>
                        <strong>{{ detail.value }}</strong>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .rutas-section {
      position: relative;
      overflow: hidden;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header .section-subtitle {
      margin-inline: auto;
    }

    .rutas-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    /* ── Card ──────────────────────── */
    .ruta-card {
      background: var(--c-card);
      border: 1px solid var(--c-border);
      border-radius: var(--r-lg);
      overflow: hidden;
      transition: all var(--tr-med);
    }

    .ruta-card:hover {
      transform: translateY(-6px);
      border-color: var(--accent);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    /* ── Map placeholder ──────────── */
    /* Insertar aquí el mapa real (iframe o imagen) cuando esté disponible */
    .ruta-map-placeholder {
      height: 200px;
      background: linear-gradient(135deg, rgba(26,107,255,0.05), rgba(0,200,83,0.05));
      border-bottom: 1px solid var(--c-border);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      position: relative;
      overflow: hidden;
    }

    .ruta-map-placeholder::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.02) 20px,
          rgba(255,255,255,0.02) 21px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.02) 20px,
          rgba(255,255,255,0.02) 21px
        );
    }

    .map-icon {
      font-size: 2.5rem;
      opacity: 0.6;
    }

    .map-text {
      font-size: 0.85rem;
      color: var(--c-muted);
      font-weight: 600;
    }

    .map-coming {
      font-size: 0.7rem;
      color: var(--c-muted);
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* ── Body ─────────────────────── */
    .ruta-body {
      padding: 1.8rem;
      position: relative;
    }

    .ruta-badge {
      display: inline-block;
      padding: 0.3rem 1rem;
      border-radius: 50px;
      font-family: 'Bebas Neue', cursive;
      font-size: 1rem;
      color: #fff;
      letter-spacing: 0.05em;
      margin-bottom: 0.8rem;
    }

    .ruta-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-white);
      letter-spacing: 0.04em;
      margin-bottom: 0.6rem;
    }

    .ruta-desc {
      color: var(--c-muted);
      font-size: 0.9rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .ruta-details {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      padding-top: 1rem;
      border-top: 1px solid var(--c-border);
    }

    .ruta-detail {
      display: flex;
      align-items: center;
      gap: 0.7rem;
    }

    .rd-icon { font-size: 1.2rem; }

    .ruta-detail small {
      display: block;
      font-size: 0.68rem;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .ruta-detail strong {
      font-size: 0.9rem;
      color: var(--c-white);
    }

    /* ── Responsive ────────────────── */
    @media (max-width: 900px) {
      .rutas-grid {
        grid-template-columns: 1fr;
        max-width: 500px;
        margin-inline: auto;
      }
    }
  `]
})
export class RutasComponent implements OnInit {
  particles: string[] = [];

  ngOnInit() {
    this.particles = Array.from({ length: 15 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });
  }

  rutas = [
    {
      name: 'Natación',
      icon: '🏊',
      color: '#1a6bff',
      distance: '750m',
      desc: 'Recorrido acuático en las aguas naturales de Sucre. Una experiencia única rodeada de naturaleza santandereana.',
      details: [
        { icon: '📏', label: 'Distancia', value: '750 metros' },
        { icon: '🌊', label: 'Tipo', value: 'Aguas abiertas' },
        { icon: '📍', label: 'Ubicación', value: 'Sucre, Santander' },
      ]
    },
    {
      name: 'Ciclismo',
      icon: '🚴',
      color: '#ff6b00',
      distance: '20km',
      desc: 'Ruta ciclística a través de los caminos más impresionantes de la montaña santandereana. Subidas y bajadas de alta intensidad.',
      details: [
        { icon: '📏', label: 'Distancia', value: '20 kilómetros' },
        { icon: '⛰️', label: 'Terreno', value: 'Montaña y carretera' },
        { icon: '📍', label: 'Ubicación', value: 'Sucre, Santander' },
      ]
    },
    {
      name: 'Running',
      icon: '🏃',
      color: '#00c853',
      distance: '5km',
      desc: 'Carrera por las calles y senderos más emblemáticos de Sucre. Velocidad, resistencia y pasión en cada paso.',
      details: [
        { icon: '📏', label: 'Distancia', value: '5 kilómetros' },
        { icon: '🛤️', label: 'Terreno', value: 'Urbano y rural' },
        { icon: '📍', label: 'Ubicación', value: 'Sucre, Santander' },
      ]
    },
  ];
}
