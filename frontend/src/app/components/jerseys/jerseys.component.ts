// ============================================================
// components/jerseys/jerseys.component.ts
// ============================================================
import { Component } from '@angular/core';

@Component({
  selector:   'app-jerseys',
  standalone: true,
  template: `
    <section id="jerseys" class="section jerseys-section">
      <div class="container">
        <div class="section-header">
          <p class="section-label">Próximamente</p>
          <h2 class="section-title">👕 Jerseys Oficiales</h2>
          <p class="section-subtitle">
            Prepárate para lucir el jersey exclusivo del evento más grande de Sucre, Santander.
          </p>
        </div>

        <div class="jerseys-grid">
          <!-- Main card -->
          <div class="jersey-main glass">
            <div class="jersey-badge">PRÓXIMAMENTE</div>
            <div class="jersey-icon-large">👕</div>
            <h3 class="jersey-title">Edición Especial</h3>
            <p class="jersey-edition">Triatlón Sucre Sin Límites 2.0</p>
            <p class="jersey-desc">
              Muy pronto estará disponible la venta de jerseys oficiales del evento.
              Un diseño único que representa el espíritu deportivo de Sucre.
            </p>
            <div class="jersey-cta-badge">
              ⏳ Disponible próximamente
            </div>
          </div>

          <!-- Features grid -->
          <div class="jersey-features">
            @for (f of features; track f.title) {
              <div class="jersey-feature-card">
                <div class="jf-icon">{{ f.icon }}</div>
                <h4 class="jf-title">{{ f.title }}</h4>
                <p class="jf-desc">{{ f.desc }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Bottom banner -->
        <div class="jersey-banner glass">
          <div class="banner-content">
            <span class="banner-emoji">🔔</span>
            <div>
              <strong>¡Mantente atento!</strong>
              <p>Anunciaremos la apertura de ventas de jerseys oficiales muy pronto por nuestras redes sociales.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .jerseys-section {
      background: linear-gradient(180deg, var(--c-bg) 0%, var(--c-surface) 50%, var(--c-bg) 100%);
      position: relative;
      overflow: hidden;
    }

    .jerseys-section::before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 700px; height: 700px;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%);
      pointer-events: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header .section-subtitle {
      margin-inline: auto;
    }

    /* ── Grid ─────────────────────────── */
    .jerseys-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      margin-bottom: 3rem;
      align-items: start;
    }

    /* ── Main card ────────────────────── */
    .jersey-main {
      padding: 3rem 2.5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .jersey-main::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--c-orange), var(--c-blue), var(--c-green));
    }

    .jersey-badge {
      display: inline-block;
      padding: 0.3rem 1rem;
      background: linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,140,56,0.1));
      border: 1px solid rgba(255,107,0,0.3);
      border-radius: 50px;
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      color: var(--c-orange);
      margin-bottom: 1.5rem;
    }

    .jersey-icon-large {
      font-size: 5rem;
      margin-bottom: 1.2rem;
      filter: drop-shadow(0 8px 24px rgba(255,107,0,0.2));
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .jersey-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 2.2rem;
      color: var(--c-white);
      letter-spacing: 0.04em;
      margin-bottom: 0.3rem;
    }

    .jersey-edition {
      font-size: 0.85rem;
      color: var(--c-orange);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 1.2rem;
    }

    .jersey-desc {
      color: var(--c-muted);
      line-height: 1.8;
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      max-width: 380px;
      margin-inline: auto;
    }

    .jersey-cta-badge {
      display: inline-block;
      padding: 0.7rem 1.5rem;
      background: rgba(255,255,255,0.04);
      border: 1px dashed rgba(255,255,255,0.15);
      border-radius: var(--r-md);
      color: var(--c-muted);
      font-size: 0.9rem;
      font-weight: 600;
    }

    /* ── Feature cards ────────────────── */
    .jersey-features {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
    }

    .jersey-feature-card {
      background: var(--c-card);
      border: 1px solid var(--c-border);
      border-radius: var(--r-lg);
      padding: 1.8rem 1.5rem;
      transition: all var(--tr-med);
    }

    .jersey-feature-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255,107,0,0.3);
      box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    }

    .jf-icon {
      font-size: 2rem;
      margin-bottom: 0.8rem;
    }

    .jf-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.2rem;
      color: var(--c-white);
      letter-spacing: 0.03em;
      margin-bottom: 0.5rem;
    }

    .jf-desc {
      color: var(--c-muted);
      font-size: 0.82rem;
      line-height: 1.6;
    }

    /* ── Bottom banner ────────────────── */
    .jersey-banner {
      padding: 1.5rem 2rem;
    }

    .banner-content {
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }

    .banner-emoji {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .banner-content strong {
      color: var(--c-white);
      font-size: 1rem;
      display: block;
      margin-bottom: 0.3rem;
    }

    .banner-content p {
      color: var(--c-muted);
      font-size: 0.85rem;
      line-height: 1.6;
      margin: 0;
    }

    /* ── Responsive ───────────────────── */
    @media (max-width: 900px) {
      .jerseys-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .jersey-features {
        grid-template-columns: 1fr;
      }

      .banner-content {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class JerseysComponent {
  features = [
    {
      icon: '🔢',
      title: 'Número Personalizado',
      desc: 'Cada jersey llevará tu número único de competidor impreso profesionalmente.'
    },
    {
      icon: '🎨',
      title: 'Diseño Oficial',
      desc: 'Arte exclusivo creado para el evento con los colores representativos de Sucre.'
    },
    {
      icon: '⭐',
      title: 'Edición Especial',
      desc: 'Colección limitada Triatlón Sucre Sin Límites 2.0. Un recuerdo único.'
    },
    {
      icon: '🏋️',
      title: 'Material Deportivo',
      desc: 'Tela técnica de alto rendimiento ideal para competir cómodamente.'
    },
  ];
}
