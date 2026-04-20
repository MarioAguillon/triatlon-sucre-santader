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
                <div class="map-icon material-symbols-outlined">{{ ruta.icon }}</div>
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
                      <span class="rd-icon material-symbols-outlined">{{ detail.icon }}</span>
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
      name: 'Running',
      icon: 'sprint',
      color: '#00c853',
      distance: 'Hasta 6.5km',
      desc: 'Un recorrido que inicia por una belleza natural donde se encuentra la quebrada Agua Blanca y el río Ture. Se inicia un ascenso por las vías secundarias de La Laja a la cabecera municipal, pasando por el antiguo molino de Don Jesús Vargas, por el frente del Cerro de la Virgen, por la antigua Casa de la Muda, por el frente de la plaza de mercado hasta llegar a la Parroquia San Isidro Labrador.',
      details: [
        { icon: 'emoji_events', label: 'Élite', value: '6.5 kilómetros' },
        { icon: 'directions_run', label: 'Recreativa', value: '5.5 kilómetros' },
        { icon: 'face', label: 'Infantil 5 a 9 años', value: '500 metros' },
        { icon: 'person', label: 'Infantil 10 a 15 años', value: '1 kilómetro' },
      ]
    },
    {
      name: 'Ciclismo',
      icon: 'directions_bike',
      color: '#0047cc',
      distance: 'Hasta 25km',
      desc: 'Recorre una ruta maravillosa y exigente por las vías secundarias y terciarias del municipio de Sucre, en donde el entrenamiento, disciplina y amor por rodar se pone a prueba con una salida desde la Parroquia San Isidro, con dirección al casino. Se desvía por la ruta de Sucre por la quebrada. Se continúa derecho por Casateja hasta llegar a la vía que viene de Guavatá para llegar a la vereda de Helechales. Se llega a la escuela de esta vereda con destino a la cabecera municipal, subiendo por la plaza de mercado, palacio municipal y finalizando nuevamente en la Parroquia San Isidro Labrador.',
      details: [
        { icon: 'emoji_events', label: 'Élite', value: '25 kilómetros' },
        { icon: 'pedal_bike', label: 'Recreativa', value: '18 kilómetros' },
        { icon: 'face', label: 'Infantil 5 a 9 años', value: '500 metros' },
        { icon: 'person', label: 'Infantil 10 a 15 años', value: '1 kilómetro' },
      ]
    },
    {
      name: 'Natación',
      icon: 'pool',
      color: '#1a6bff',
      distance: 'Hasta 1600m',
      desc: 'Disfrutar de la natación en el centro recreacional de Sucre es una bendición, con su atención VIP por el famosísimo "Mosco". Hace que la experiencia de nadar sea más agradable, ya que se cuenta con el calor humano del sucreño que anima la competencia como si estuviéramos en los olímpicos.',
      details: [
        { icon: 'man', label: 'Hombres', value: '1600 metros' },
        { icon: 'woman', label: 'Mujeres', value: '1500 metros' },
        { icon: 'face', label: 'Infantil 5 a 9 años', value: '20 metros' },
        { icon: 'person', label: 'Infantil 10 a 15 años', value: '40 metros' },
      ]
    },
  ];
}
