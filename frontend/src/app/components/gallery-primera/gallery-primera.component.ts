// ============================================================
// components/gallery-primera/gallery-primera.component.ts
// Galería Primera Edición — Carrusel profesional
// Las imágenes de esta galería se cargan desde /public/primera/
// ============================================================
import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-gallery-primera',
  standalone: true,
  template: `
    <section id="galeria-primera" class="section gallery-section">
      <div class="section-bg">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="section-header">
          <p class="section-label">Recuerdos Inolvidables</p>
          <h2 class="section-title">Galería Primera Edición</h2>
          <p class="section-subtitle">
            Revive los mejores momentos de la primera edición del Triatlón Sucre Sin Límites.
          </p>
        </div>

        <!-- Carousel -->
        <div class="carousel-wrapper"
             (mouseenter)="pauseAutoplay()"
             (mouseleave)="resumeAutoplay()">
          <div class="carousel-track" [style.transform]="'translateX(-' + currentIndex() * 100 + '%)'">
            @for (img of images; track $index) {
              <div class="carousel-slide">
                <img [src]="img.url" 
                     [alt]="'Primera Edición - ' + img.credito" 
                     loading="lazy" 
                     [style.object-fit]="img.fit || 'cover'"
                     [style.object-position]="img.position || 'center center'" />
                @if (img.credito) {
                  <div class="carousel-caption">
                    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 4px;">photo_camera</span>
                    Foto por: <strong>{{ img.credito }}</strong>
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
            @for (img of images; track $index) {
              <button class="carousel-dot"
                      [class.active]="$index === currentIndex()"
                      (click)="goTo($index)"
                      [attr.aria-label]="'Ir a foto ' + ($index + 1)">
              </button>
            }
          </div>
        </div>

        <!-- Counter -->
        <div class="carousel-counter">
          <span class="counter-current">{{ currentIndex() + 1 }}</span>
          <span class="counter-sep">/</span>
          <span class="counter-total">{{ images.length }}</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery-section {
      position: relative;
      overflow: hidden;
      background: var(--c-bg);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .section-header .section-subtitle {
      margin-inline: auto;
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
      transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
      will-change: transform;
    }

    .carousel-slide {
      min-width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      position: relative;
    }

    .carousel-slide img {
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
      width: 48px;
      height: 48px;
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

    .carousel-arrow svg { width: 20px; height: 20px; }

    .arrow-left  { left: 1rem; }
    .arrow-right { right: 1rem; }

    /* ── Dots ──────────────────────── */
    .carousel-dots {
      position: absolute;
      bottom: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      z-index: 3;
    }

    .carousel-dot {
      width: 10px;
      height: 10px;
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
      box-shadow: 0 0 10px rgba(255,107,0,0.5);
    }

    /* ── Counter ───────────────────── */
    .carousel-counter {
      text-align: center;
      margin-top: 1.5rem;
      font-family: 'Bebas Neue', cursive;
      font-size: 1.2rem;
      color: var(--c-muted);
      letter-spacing: 0.1em;
    }

    .counter-current {
      color: var(--c-orange);
      font-size: 1.5rem;
    }

    .counter-sep { margin-inline: 0.3rem; }

    /* ── Responsive ────────────────── */
    @media (max-width: 768px) {
      .carousel-arrow { width: 38px; height: 38px; }
      .carousel-arrow svg { width: 16px; height: 16px; }
      .arrow-left  { left: 0.5rem; }
      .arrow-right { right: 0.5rem; }
      .carousel-dots { gap: 0.3rem; }
      .carousel-dot  { width: 8px; height: 8px; }
    }
  `]
})
export class GalleryPrimeraComponent implements OnInit, OnDestroy {
  // Las imágenes de esta galería se cargan desde public/primera/
  images: { url: string, credito: string, position?: string, fit?: string }[] = [];
  currentIndex = signal(0);
  particles: string[] = [];
  private autoplayTimer: any;
  private autoplayDelay = 4000;

  ngOnInit() {
    // Lista de fotos existentes de la edición pasada.
    // Aquí es donde agregarás nuevas líneas cuando te envíen fotos.
    this.images = [
      { url: 'primera/primera1.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera2.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera3.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera4.jpg', credito: 'Archivo Oficial', position: 'center 15%', fit: 'contain' },
      { url: 'primera/primera5.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera6.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera7.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera8.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera9.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera10.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera11.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera12.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera13.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera14.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera15.jpg', credito: 'Archivo Oficial', position: 'center 20%', fit: 'contain' },
      { url: 'primera/primera16.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/primera17.jpg', credito: 'Archivo Oficial', fit: 'contain' },
      { url: 'primera/primera18.jpg', credito: 'Archivo Oficial' },
      { url: 'primera/foto_fernanda_Camargo.webp', credito: 'Fernanda Camargo', fit: 'contain' },
      // ¡AÑADE NUEVAS FOTOS DEBAJO DE ESTA LÍNEA!
      // Ejemplo: { url: 'primera/foto_alejandra_camargo.webp', credito: 'Alejandra Camargo' },
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
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
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
