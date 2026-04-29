// ============================================================
// components/gallery-paisajes/gallery-paisajes.component.ts
// Galería Paisajes de Sucre — Carrusel automático
// Las imágenes de esta galería se cargan desde /public/paisajes/
// ============================================================
import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-gallery-paisajes',
  standalone: true,
  template: `
    <section id="galeria-paisajes" class="section paisajes-section">
      <div class="section-bg">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="section-header">
          <p class="section-label">Comparte la Belleza</p>
          <h2 class="section-title">Magia de Sucre</h2>
          <p class="section-subtitle section-invite">
            ¿Tienes una foto de un paisaje o lugar hermoso de Sucre? ¡Queremos que aparezca aquí!
          </p>
          <a href="mailto:triatlonsucresantander@gmail.com?subject=Quiero%20compartir%20un%20paisaje%20para%20la%20Triatl%C3%B3n%20Sucre%20Santander&body=Hola,%20quiero%20compartir%20una%20fotograf%C3%ADa%20o%20paisaje%20para%20la%20Triatl%C3%B3n%20Sucre%20Santander." class="btn btn-outline paisaje-contact-btn">
            📸 Contáctame
          </a>
        </div>

        <!-- Carousel -->
        <div class="carousel-wrapper"
             (mouseenter)="pauseAutoplay()"
             (mouseleave)="resumeAutoplay()">
          <div class="carousel-track" [style.transform]="'translateX(-' + currentIndex() * 100 + '%)'">
            @for (item of mediaItems; track $index) {
              <div class="carousel-slide">
                @if (item.type === 'image') {
                  <img [src]="item.src" 
                       [alt]="'Magia de Sucre - ' + (item.credito || 'Foto')" 
                       loading="lazy" 
                       [style.object-fit]="item.fit || 'cover'"
                       [style.object-position]="item.position || 'center'" />
                }
                @if (item.type === 'video') {
                  <video [src]="item.src"
                         muted
                         loop
                         playsinline
                         autoplay
                         class="carousel-video">
                  </video>
                }
                @if (item.credito) {
                  <div class="carousel-caption">
                    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 4px;">photo_camera</span>
                    Foto por: <strong>{{ item.credito }}</strong>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Arrows -->
          <button class="carousel-arrow arrow-left" (click)="prev()" aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="carousel-arrow arrow-right" (click)="next()" aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <!-- Dots -->
          <div class="carousel-dots">
            @for (item of mediaItems; track $index) {
              <button class="carousel-dot"
                      [class.active]="$index === currentIndex()"
                      [class.video-dot]="item.type === 'video'"
                      (click)="goTo($index)"
                      [attr.aria-label]="'Ir a ' + (item.type === 'video' ? 'video' : 'foto') + ' ' + ($index + 1)">
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .paisajes-section {
      position: relative;
      overflow: hidden;
      background: var(--c-surface);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .section-header .section-subtitle {
      margin-inline: auto;
    }

    .section-invite {
      font-size: 1.15rem !important;
      color: var(--c-text) !important;
      font-weight: 500;
      margin-bottom: 1.2rem !important;
    }

    .paisaje-contact-btn {
      margin-top: 0.5rem;
      display: inline-flex;
      border-color: rgba(255,107,0,0.4) !important;
      color: var(--c-orange) !important;
    }

    .paisaje-contact-btn:hover {
      background: rgba(255,107,0,0.1) !important;
      border-color: var(--c-orange) !important;
      box-shadow: 0 8px 32px rgba(255,107,0,0.3) !important;
    }

    /* ── Carousel ───────────────────── */
    .carousel-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: var(--r-lg);
      border: 1px solid var(--c-border);
      box-shadow: 0 20px 80px rgba(0,0,0,0.5);
    }

    .carousel-track {
      display: flex;
      transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
      will-change: transform;
    }

    .carousel-slide {
      min-width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      background: #000;
      position: relative;
    }

    .carousel-slide img,
    .carousel-video {
      width: 100%;
      height: 100%;
      display: block;
    }

    .carousel-caption {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      padding: 0.5rem 1rem;
      border-radius: var(--r-md);
      color: #fff;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      z-index: 2;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }

    /* ── Arrows ─────────────────────── */
    .carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 52px;
      height: 52px;
      border: none;
      border-radius: 50%;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(10px);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 3;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .carousel-arrow:hover {
      background: rgba(255,107,0,0.7);
      border-color: rgba(255,107,0,0.5);
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 4px 20px rgba(255,107,0,0.4);
    }

    .carousel-arrow svg { width: 22px; height: 22px; }

    .arrow-left  { left: 1.2rem; }
    .arrow-right { right: 1.2rem; }

    /* ── Dots ──────────────────────── */
    .carousel-dots {
      position: absolute;
      bottom: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.6rem;
      z-index: 3;
    }

    .carousel-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.15);
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }

    .carousel-dot.active {
      background: var(--c-orange);
      border-color: var(--c-orange);
      transform: scale(1.3);
      box-shadow: 0 0 12px rgba(255,107,0,0.5);
    }

    .carousel-dot.video-dot {
      border-radius: 3px;
    }

    .carousel-dot.video-dot.active {
      border-radius: 3px;
      background: var(--c-blue);
      border-color: var(--c-blue);
      box-shadow: 0 0 12px rgba(26,107,255,0.5);
    }

    /* ── Responsive ────────────────── */
    @media (max-width: 768px) {
      .carousel-arrow { width: 32px; height: 32px; }
      .carousel-arrow svg { width: 14px; height: 14px; }
      .arrow-left  { left: 0.3rem; }
      .arrow-right { right: 0.3rem; }
      .carousel-caption {
        bottom: 1.5rem;
        right: 0.5rem;
        left: auto;
        font-size: 0.55rem;
        padding: 0.2rem 0.4rem;
      }
      .carousel-caption span { display: none; } /* Ocultar icono cámara en móvil */
    }
  `]
})
export class GalleryPaisajesComponent implements OnInit, OnDestroy {
  // Las imágenes de esta galería se cargan desde /public/paisajes/
  mediaItems: { src: string; type: 'image' | 'video', position?: string, credito?: string, fit?: string }[] = [];
  currentIndex = signal(0);
  particles: string[] = [];
  private autoplayTimer: any;
  private autoplayDelay = 5000;

  ngOnInit() {
    // Cargar fotografías
    this.mediaItems = [
      { src: 'paisajes/paisaje1.jpg', type: 'image', credito: 'Archivo Oficial' },
      { src: 'paisajes/paisaje2.jpg', type: 'image', credito: 'Armando Marin' },
      { src: 'paisajes/paisaje3.jpg', type: 'image', credito: 'Archivo Oficial' },
      { src: 'paisajes/paisaje4.jpg', type: 'image', position: 'center 20%', credito: 'Archivo Oficial', fit: 'contain' },
      { src: 'paisajes/paisaje5.jpg', type: 'image', position: 'center 10%', credito: 'Archivo Oficial', fit: 'contain' },
      { src: 'paisajes/foto_armando1.webp', type: 'image', credito: 'Armando Marin', fit: 'contain' },
      { src: 'paisajes/foto_armando2.webp', type: 'image', credito: 'Armando Marin', fit: 'contain' },
      { src: 'paisajes/foto_armando3.webp', type: 'image', credito: 'Armando Marin', fit: 'contain' },
      { src: 'paisajes/foto_armando4.webp', type: 'image', credito: 'Armando Marin', fit: 'contain' },



      // ¡AÑADE NUEVAS FOTOS DE PAISAJES DEBAJO DE ESTA LÍNEA!
      // Ejemplo: { src: 'paisajes/foto_carlos_gomez.webp', type: 'image', credito: 'Carlos Gómez' },
    ];

    // Partículas
    this.particles = Array.from({ length: 15 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });

    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.mediaItems.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.mediaItems.length) % this.mediaItems.length);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }

  pauseAutoplay() {
    this.stopAutoplay();
  }

  resumeAutoplay() {
    this.startAutoplay();
  }

  private startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.next(), this.autoplayDelay);
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}
