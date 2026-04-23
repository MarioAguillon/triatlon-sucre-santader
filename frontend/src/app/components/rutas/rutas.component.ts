import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RouteContent {
  category: string;
  distance: string;
  desc: string;
  mapImg: string;
  stats: { label: string; value: string; icon: string }[];
}

interface RouteItem {
  id: string;
  name: string;
  color: string;
  isFlippable: boolean;
  isFlipped: boolean;
  front: RouteContent;
  back?: RouteContent;
}

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule],
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
          @for (ruta of rutas(); track ruta.id) {
            <div class="ruta-container" [class.is-flippable]="ruta.isFlippable">
              <!-- Flip Card -->
              <div class="ruta-card" [class.flipped]="ruta.isFlipped" [style.--accent]="ruta.color">
                
                <!-- FRONT SIDE -->
                <div class="card-face card-front">
                  <div class="map-wrapper" (click)="openZoom(ruta.front.mapImg)">
                    <img [src]="ruta.front.mapImg" [alt]="ruta.front.category" class="map-img">
                    <div class="map-overlay">
                      <span class="category-name">{{ ruta.front.category }}</span>
                      <span class="zoom-hint">
                        <span class="material-symbols-outlined">zoom_in</span> Tocar para ampliar
                      </span>
                    </div>
                  </div>
                  
                  <div class="card-body">
                    <div class="body-top">
                      <div class="dist-badge" [style.background]="ruta.color">{{ ruta.front.distance }}</div>
                      <h3 class="card-title">{{ ruta.name }}</h3>
                    </div>
                    <p class="card-desc">{{ ruta.front.desc }}</p>
                    <div class="card-stats">
                      @for (s of ruta.front.stats; track s.label) {
                        <div class="stat-item">
                          <span class="material-symbols-outlined">{{ s.icon }}</span>
                          <div>
                            <small>{{ s.label }}</small>
                            <strong>{{ s.value }}</strong>
                          </div>
                        </div>
                      }
                    </div>
                  </div>

                  @if (ruta.isFlippable) {
                    <button class="flip-btn next" (click)="toggleFlip(ruta)" title="Ver Recreativa">
                      <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                  }
                </div>

                <!-- BACK SIDE -->
                @if (ruta.isFlippable && ruta.back) {
                  <div class="card-face card-back">
                    <div class="map-wrapper" (click)="openZoom(ruta.back.mapImg)">
                      <img [src]="ruta.back.mapImg" [alt]="ruta.back.category" class="map-img">
                      <div class="map-overlay">
                        <span class="category-name">{{ ruta.back.category }}</span>
                        <span class="zoom-hint">
                          <span class="material-symbols-outlined">zoom_in</span> Tocar para ampliar
                        </span>
                      </div>
                    </div>
                    
                    <div class="card-body">
                      <div class="body-top">
                        <div class="dist-badge" [style.background]="ruta.color">{{ ruta.back.distance }}</div>
                        <h3 class="card-title">{{ ruta.name }}</h3>
                      </div>
                      <p class="card-desc">{{ ruta.back.desc }}</p>
                      <div class="card-stats">
                        @for (s of ruta.back.stats; track s.label) {
                          <div class="stat-item">
                            <span class="material-symbols-outlined">{{ s.icon }}</span>
                            <div>
                              <small>{{ s.label }}</small>
                              <strong>{{ s.value }}</strong>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <button class="flip-btn prev" (click)="toggleFlip(ruta)" title="Volver a Élite">
                      <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Map Zoom Modal -->
      @if (selectedMap()) {
        <div class="modal-zoom" (click)="closeZoom()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="modal-close" (click)="closeZoom()">
              <span class="material-symbols-outlined">close</span>
            </button>
            <img [src]="selectedMap()" alt="Mapa ampliado" class="zoom-img">
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .rutas-section { position: relative; overflow: hidden; }
    .section-header { text-align: center; margin-bottom: 4rem; }

    .rutas-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
      perspective: 1500px;
    }

    /* ── Flip Card Base ──────────────── */
    .ruta-container {
      height: 680px; /* Aumentado para dar más espacio a la descripción */
      position: relative;
    }

    .ruta-card {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .ruta-card.flipped {
      transform: rotateY(180deg);
    }

    .card-face {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background: var(--c-card);
      border: 1px solid var(--c-border);
      border-radius: var(--r-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .card-back {
      transform: rotateY(180deg);
    }

    /* ── Map Image ──────────────────── */
    .map-wrapper {
      height: 240px;
      flex-shrink: 0; /* Evita que el mapa se colapse si hay mucho texto */
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid var(--c-border);
    }

    .map-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .card-face:hover .map-img {
      transform: scale(1.05);
    }

    .map-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 1.5rem;
      gap: 0.5rem;
    }

    .category-name {
      color: #fff;
      font-family: 'Bebas Neue', cursive;
      font-size: 1.5rem;
      letter-spacing: 0.05em;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    .zoom-hint {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: rgba(255,255,255,0.7);
      font-size: 0.75rem;
      font-weight: 500;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
    }

    .card-face:hover .zoom-hint {
      opacity: 1;
      transform: translateY(0);
    }

    .zoom-hint span { font-size: 1.1rem; }

    /* ── Card Body ──────────────────── */
    .card-body {
      padding: 1.8rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .body-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .dist-badge {
      padding: 0.2rem 0.8rem;
      border-radius: 50px;
      font-family: 'Bebas Neue', cursive;
      font-size: 0.9rem;
      color: #fff;
    }

    .card-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.6rem;
      color: var(--c-white);
      margin: 0;
    }

    .card-desc {
      color: var(--c-muted);
      font-size: 0.85rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
      overflow-y: auto;
      padding-right: 8px;
    }

    /* Custom Scrollbar for desc */
    .card-desc::-webkit-scrollbar {
      width: 4px;
    }
    .card-desc::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.02);
      border-radius: 10px;
    }
    .card-desc::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.15);
      border-radius: 10px;
    }
    .card-desc::-webkit-scrollbar-thumb:hover {
      background: var(--accent);
    }

    .card-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--c-border);
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .stat-item span { font-size: 1.1rem; color: var(--accent); }
    .stat-item small { display: block; font-size: 0.65rem; color: var(--c-muted); text-transform: uppercase; }
    .stat-item strong { font-size: 0.8rem; color: var(--c-white); }

    /* ── Flip Button ────────────────── */
    .flip-btn {
      position: absolute;
      top: 120px; /* Reposicionado a la mitad de la imagen para no tapar el título */
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
      transform: translateY(-50%);
    }

    .flip-btn:hover {
      background: var(--accent);
      border-color: var(--accent);
      box-shadow: 0 0 15px var(--accent);
    }

    .flip-btn.next { right: 10px; }
    .flip-btn.prev { left: 10px; }

    /* ── Modal Zoom ─────────────────── */
    .modal-zoom {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.92);
      backdrop-filter: blur(15px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.4s ease;
      cursor: zoom-out;
    }

    .modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
      animation: zoomIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .zoom-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: var(--r-md);
      box-shadow: 0 20px 80px rgba(0,0,0,0.8);
    }

    .modal-close {
      position: absolute;
      top: -40px;
      right: -40px;
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .modal-close:hover { transform: scale(1.2) rotate(90deg); }
    .modal-close span { font-size: 2.5rem; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

    @media (max-width: 1100px) {
      .rutas-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .rutas-grid { grid-template-columns: 1fr; max-width: 400px; margin-inline: auto; }
      .ruta-container { height: 650px; }
    }
  `]
})
export class RutasComponent implements OnInit {
  particles: string[] = [];

  rutas = signal<RouteItem[]>([
    {
      id: 'running',
      name: 'Running',
      color: '#00c853',
      isFlippable: true,
      isFlipped: false,
      front: {
        category: 'Élite',
        distance: '6.5 km',
        mapImg: 'running_elite.jpg',
        desc: 'Salida desde el nacimiento de la quebrada Agua Blanca, ascendiendo por toda la vereda La Laja hasta el sector del Molino. Continúa por el cerro La Virgen, la piscina y la parte baja del casco urbano. Luego gira a la izquierda en la vivienda de la señora Miriam Ariza, desciende hacia el Camino Real y finaliza con el ascenso hacia la iglesia principal.',
        stats: [
          { label: 'Altitud', value: '1.200m', icon: 'landscape' },
          { label: 'Terreno', value: 'Mixto', icon: 'terrain' }
        ]
      },
      back: {
        category: 'Recreativa',
        distance: '5.5 km',
        mapImg: 'running_recreativa.jpg',
        desc: 'Salida desde la vereda La Laja, iniciando el ascenso hasta el sector del Molino. Continúa por la piscina, la feria de ganado y la parte baja de la plaza principal. Luego gira frente al palacio municipal y finaliza nuevamente en la iglesia principal.',
        stats: [
          { label: 'Altitud', value: '1.150m', icon: 'landscape' },
          { label: 'Esfuerzo', value: 'Medio', icon: 'speed' }
        ]
      }
    },
    {
      id: 'ciclismo',
      name: 'Ciclismo',
      color: '#0047cc',
      isFlippable: true,
      isFlipped: false,
      front: {
        category: 'Élite',
        distance: '25 km',
        mapImg: 'ciclismo_elite.jpg',
        desc: 'Salida desde la iglesia principal en dirección a La 68. Ascenso hasta el punto de hidratación en la loma del Mosco, continuando por Peña de Órganos, Casino y descenso hacia el Cajón. Giro a la izquierda hacia Casa Teja, paso por Lechales y segundo punto de hidratación en Plan de Marines. Luego asciende hasta el pueblo, gira a la izquierda por la vivienda de la señora Miriam, continúa por el Camino Real y finaliza con el ascenso hacia la iglesia principal.',
        stats: [
          { label: 'Elevación', value: '+450m', icon: 'trending_up' },
          { label: 'Dificultad', value: 'Alta', icon: 'bolt' }
        ]
      },
      back: {
        category: 'Recreativa',
        distance: '18 km', // Valor oficial actualizado
        mapImg: 'ciclismo_recreativa.jpg',
        desc: 'Salida desde la iglesia principal en dirección al cementerio. Giro a la derecha por la vivienda de Ximena Ariza, descenso hacia la quebrada y ascenso por la cascada Los Micos. En Santa Rosa, giro a la izquierda hasta conectar con la vía de Lechales. Luego continúa el ascenso por Plan de Marines, punto de hidratación, y regreso por la entrada al pueblo hasta finalizar nuevamente frente a la iglesia.',
        stats: [
          { label: 'Elevación', value: '+310m', icon: 'trending_up' },
          { label: 'Dificultad', value: 'Media', icon: 'pedal_bike' }
        ]
      }
    },
    {
      id: 'natacion',
      name: 'Natación',
      color: '#1a6bff',
      isFlippable: false,
      isFlipped: false,
      front: {
        category: 'Categoría Única',
        distance: '160 m',
        mapImg: 'paisaje3.jpg',
        desc: 'Natación en el centro recreacional de Sucre. Una experiencia única con atención VIP y el calor humano del pueblo sucreño animando.',
        stats: [
          { label: 'Hombres', value: '160m', icon: 'man' },
          { label: 'Mujeres', value: '150m', icon: 'woman' }
        ]
      }
    }
  ]);

  selectedMap = signal<string | null>(null);

  ngOnInit() {
    this.particles = Array.from({ length: 15 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });
  }

  toggleFlip(ruta: RouteItem) {
    if (!ruta.isFlippable) return;
    
    const currentRutas = this.rutas();
    const updatedRutas = currentRutas.map(r => {
      if (r.id === ruta.id) {
        return { ...r, isFlipped: !r.isFlipped };
      }
      return r;
    });
    
    this.rutas.set(updatedRutas);
  }

  openZoom(img: string) {
    this.selectedMap.set(img);
    document.body.style.overflow = 'hidden';
  }

  closeZoom() {
    this.selectedMap.set(null);
    document.body.style.overflow = '';
  }
}
