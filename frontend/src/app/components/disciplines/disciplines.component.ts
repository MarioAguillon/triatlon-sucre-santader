// ============================================================
// components/disciplines/disciplines.component.ts
// ============================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector:   'app-disciplines',
  standalone: true,
  template: `
    <section id="disciplinas" class="section disciplines-section">
      <div class="section-bg">
        <img src="bg_disciplines.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="section-header">
          <p class="section-label">3 Competencias Independientes</p>
          <h2 class="section-title">Elige tu disciplina</h2>
          <p class="section-subtitle">
            Cada disciplina es una competencia totalmente independiente. Inscríbete
            en la que prefieras y demuestra tu talento en los paisajes de Sucre, Santander.
          </p>
        </div>

        <div class="disciplines-grid">
          @for (d of disciplines; track d.name) {
            <div class="discipline-card" [style.--accent]="d.color">
              <div class="card-image">
                <img [src]="d.image" [alt]="d.name" loading="lazy" />
                <div class="card-image-overlay"></div>
                <div class="card-number">{{ d.order }}</div>
              </div>

              <div class="card-body">
                <h3 class="card-title">{{ d.name }}</h3>
                <p class="card-desc">{{ d.desc }}</p>

                <!-- Distancias -->
                <div class="card-categories">
                  <span class="cat-label">Distancias:</span>
                  <div class="cat-tags">
                    @for (c of d.categorias; track c) {
                      <span class="cat-tag">{{ c }}</span>
                    }
                  </div>
                </div>

                <div class="card-accent-bar"></div>
              </div>
            </div>
          }
        </div>

        <!-- Independencia message -->
        <div class="disciplines-flow">
          <div class="flow-item">
            <div class="flow-dot blue"></div>
            <span>Natación</span>
          </div>
          <div class="flow-sep">•</div>
          <div class="flow-item">
            <div class="flow-dot orange"></div>
            <span>Ciclismo</span>
          </div>
          <div class="flow-sep">•</div>
          <div class="flow-item">
            <div class="flow-dot green"></div>
            <span>Running</span>
          </div>
          <div class="flow-info">
            <span class="flow-info-icon">ℹ️</span>
            <span>Cada disciplina es independiente — ¡elige la tuya!</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .disciplines-section {
      
      position: relative;
      overflow: hidden;
    }

    .disciplines-section::before {
      content: '';
      position: absolute;
      top: -200px; left: -200px;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(26,107,255,0.08) 0%, transparent 70%);
      pointer-events: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header .section-subtitle {
      margin-inline: auto;
    }

    .disciplines-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }

    /* ── Card ────────────────────────── */
    .discipline-card {
      border-radius: var(--r-lg);
      overflow: hidden;
      background: var(--c-card);
      border: 1px solid var(--c-border);
      transition: all var(--tr-med);
      position: relative;
    }

    .discipline-card:hover {
      transform: translateY(-8px);
      border-color: var(--accent);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    /* Image */
    .card-image {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .card-image img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform var(--tr-slow);
    }

    .discipline-card:hover .card-image img {
      transform: scale(1.08);
    }

    .card-image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(13,17,23,0.9) 100%);
    }

    .card-number {
      position: absolute;
      top: 1rem; right: 1rem;
      width: 40px; height: 40px;
      border-radius: 50%;
      background: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Bebas Neue', cursive;
      font-size: 1.3rem;
      color: #fff;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }

    /* Body */
    .card-body {
      padding: 1.5rem;
      position: relative;
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
      margin-top: -2.5rem;
    }

    .card-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 2rem;
      color: var(--c-white);
      letter-spacing: 0.04em;
      margin-bottom: 0.8rem;
    }

    .card-desc {
      color: var(--c-muted);
      font-size: 0.9rem;
      line-height: 1.7;
      margin-bottom: 1.2rem;
    }

    .card-stats {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.2rem;
    }

    .card-stat { text-align: center; }

    .cs-val {
      display: block;
      font-family: 'Bebas Neue', cursive;
      font-size: 1.4rem;
      color: var(--accent);
    }

    .cs-label {
      font-size: 0.7rem;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* ── Categorías ──────────────────── */
    .card-categories {
      padding-top: 1rem;
      border-top: 1px solid var(--c-border);
      margin-bottom: 1.5rem;
    }

    .cat-label {
      display: block;
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.5rem;
    }

    .cat-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .cat-tag {
      padding: 0.25rem 0.75rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--accent);
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent);
      transition: all var(--tr-fast);
    }

    .discipline-card:hover .cat-tag {
      background: rgba(255,255,255,0.08);
    }

    .card-accent-bar {
      height: 3px;
      border-radius: 2px;
      background: var(--accent);
      position: absolute;
      bottom: 0; left: 0; right: 0;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform var(--tr-med);
    }

    .discipline-card:hover .card-accent-bar {
      transform: scaleX(1);
    }

    /* ── Flow ────────────────────────── */
    .disciplines-flow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 1.5rem 2rem;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--c-border);
      border-radius: var(--r-xl);
      flex-wrap: wrap;
    }

    .flow-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .flow-dot {
      width: 14px; height: 14px;
      border-radius: 50%;
    }

    .flow-dot.blue   { background: #1a6bff; box-shadow: 0 0 12px #1a6bff; }
    .flow-dot.orange { background: #0047cc; box-shadow: 0 0 12px #0047cc; }
    .flow-dot.green  { background: #00c853; box-shadow: 0 0 12px #00c853; }

    .flow-sep { color: var(--c-muted); font-size: 1.2rem; }

    .flow-info {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding-left: 1rem;
      border-left: 1px solid var(--c-border);
      font-size: 0.85rem;
      color: var(--c-muted);
      font-style: italic;
    }

    .flow-info-icon { font-style: normal; }

    @media (max-width: 900px) {
      .disciplines-grid { grid-template-columns: 1fr; max-width: 480px; margin-inline: auto; }
      .disciplines-flow { flex-wrap: wrap; }
      .flow-info { border-left: none; padding-left: 0; width: 100%; justify-content: center; margin-top: 0.5rem; }
    }
  `]
})
export class DisciplinesComponent implements OnInit {
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

  disciplines = [
    {
      order: '01',
      emoji: 'sprint',
      name:  'Running',
      image: 'running.png',
      color: '#00c853',
      desc:  'Recorre una ruta maravillosa iniciando donde se encuentra la quebrada Agua Blanca y el río Ture, ascendiendo por La Laja hasta finalizar en la Parroquia San Isidro.',
      categorias: ['Élite: 6.5 km', 'Recreativa: 5.5 km', 'Infantil (5 a 9 años): 500 metros', 'Infantil (10 a 15 años): 1 km']
    },
    {
      order: '02',
      emoji: 'directions_bike',
      name:  'Ciclismo',
      image: 'ciclismo.png',
      color: '#0047cc',
      desc:  'Desafía las vías secundarias de Sucre, pasando por Casateja y Helechales, hasta la llegada triunfal en la plaza principal.',
      categorias: ['Élite: 25 km', 'Recreativa: 18 km', 'Infantil (5 a 9 años): 500 metros', 'Infantil (10 a 15 años): 1 km']
    },
    {
      order: '03',
      emoji: 'pool',
      name:  'Natación',
      image: 'natacion.png',
      color: '#1a6bff',
      desc:  'Disfruta nadando en la piscina del Centro Recreacional de Sucre, un ambiente inigualable que eleva la experiencia, donde el entusiasmo del público y el calor humano hacen vibrar cada competencia como en los grandes eventos.',
      categorias: ['Hombres: 160 metros', 'Mujeres: 150 metros', 'Infantil (5 a 9 años): 20 metros', 'Infantil (10 a 15 años): 40 metros']
    },
  ];
}
