// ============================================================
// components/premiacion/premiacion.component.ts
// Bloque de Premiación Integrada
// ============================================================
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-premiacion',
  standalone: true,
  template: `
    <div class="premiacion-block" id="premiacion">
      <div class="premiacion-inner">
        <div class="premiacion-glow"></div>
        <div class="premiacion-header-content">
          <div class="premiacion-icon material-symbols-outlined" style="font-size:inherit;">emoji_events</div>
          <div class="premiacion-text">
            <span class="premiacion-label">Premiación Total Garantizada</span>
            <span class="premiacion-amount">$5.000.000 <small>COP</small></span>
            <span class="premiacion-sub">Distribuidos equitativamente entre las ramas Masculina y Femenina</span>
          </div>
        </div>

        <!-- TABS NAV -->
        <div class="prize-tabs-nav">
          <button class="tab-btn" [class.active]="activeTab === 'ciclismo'" (click)="activeTab = 'ciclismo'">
            <span class="material-symbols-outlined">directions_bike</span> Ciclismo
          </button>
          <button class="tab-btn" [class.active]="activeTab === 'atletismo'" (click)="activeTab = 'atletismo'">
            <span class="material-symbols-outlined">sprint</span> Atletismo
          </button>
          <button class="tab-btn" [class.active]="activeTab === 'natacion'" (click)="activeTab = 'natacion'">
            <span class="material-symbols-outlined">pool</span> Natación
          </button>
        </div>

        <!-- TAB CONTENT -->
        <div class="prize-tab-content glass">
          
          <!-- CICLISMO -->
          @if (activeTab === 'ciclismo') {
            <div class="prize-tab-pane slide-up">
              <div class="prize-pane-header">
                <h3>Bolsa Ciclismo: $2.000.000</h3>
                <p>Categorías Elite y Recreativo (Mismo premio para Femenino y Masculino)</p>
              </div>
              <div class="prize-tables-grid">
                <div class="prize-card">
                  <div class="prize-card-title">Categoría Élite</div>
                  <ul class="prize-list">
                    <li><span class="pos pos-1">1º Puesto</span> <span class="val">$ 300.000</span></li>
                    <li><span class="pos pos-2">2º Puesto</span> <span class="val">$ 200.000</span></li>
                    <li><span class="pos pos-3">3º Puesto</span> <span class="val">$ 100.000</span></li>
                  </ul>
                </div>
                <div class="prize-card">
                  <div class="prize-card-title">Categoría Recreativo</div>
                  <ul class="prize-list">
                    <li><span class="pos pos-1">1º Puesto</span> <span class="val">$ 200.000</span></li>
                    <li><span class="pos pos-2">2º Puesto</span> <span class="val">$ 120.000</span></li>
                    <li><span class="pos pos-3">3º Puesto</span> <span class="val">$ 80.000</span></li>
                  </ul>
                </div>
              </div>
              
              <div class="kids-prize-banner">
                <span class="material-symbols-outlined">child_care</span>
                <div class="banner-text">
                  <strong>Categorías Infantiles (5-9 años y 10-15 años):</strong>
                  Premios y Regalos Especiales para 1º, 2º y 3º puesto (Niñas y Niños).
                </div>
              </div>
            </div>
          }

          <!-- ATLETISMO -->
          @if (activeTab === 'atletismo') {
            <div class="prize-tab-pane slide-up">
              <div class="prize-pane-header">
                <h3>Bolsa Atletismo: $2.100.000</h3>
                <p>Categorías Elite y Recreativo (Mismo premio para Femenino y Masculino)</p>
              </div>
              <div class="prize-tables-grid">
                <div class="prize-card">
                  <div class="prize-card-title">Categoría Élite</div>
                  <ul class="prize-list">
                    <li><span class="pos pos-1">1º Puesto</span> <span class="val">$ 350.000</span></li>
                    <li><span class="pos pos-2">2º Puesto</span> <span class="val">$ 200.000</span></li>
                    <li><span class="pos pos-3">3º Puesto</span> <span class="val">$ 100.000</span></li>
                  </ul>
                </div>
                <div class="prize-card">
                  <div class="prize-card-title">Categoría Recreativo</div>
                  <ul class="prize-list">
                    <li><span class="pos pos-1">1º Puesto</span> <span class="val">$ 200.000</span></li>
                    <li><span class="pos pos-2">2º Puesto</span> <span class="val">$ 120.000</span></li>
                    <li><span class="pos pos-3">3º Puesto</span> <span class="val">$ 80.000</span></li>
                  </ul>
                </div>
              </div>
              
              <div class="kids-prize-banner">
                <span class="material-symbols-outlined">child_care</span>
                <div class="banner-text">
                  <strong>Categorías Infantiles (5-9 años y 10-15 años):</strong>
                  Premios y Regalos Especiales para 1º, 2º y 3º puesto (Niñas y Niños).
                </div>
              </div>
            </div>
          }

          <!-- NATACION -->
          @if (activeTab === 'natacion') {
            <div class="prize-tab-pane slide-up">
              <div class="prize-pane-header">
                <h3>Bolsa Natación: $900.000</h3>
                <p>Categoría General Única (Mismo premio para Mujeres y Hombres)</p>
              </div>
              <div class="prize-tables-grid" style="grid-template-columns: 1fr; max-width: 500px; margin: 0 auto;">
                <div class="prize-card">
                  <div class="prize-card-title">General</div>
                  <ul class="prize-list">
                    <li><span class="pos pos-1">1º Puesto</span> <span class="val">$ 200.000</span></li>
                    <li><span class="pos pos-2">2º Puesto</span> <span class="val">$ 150.000</span></li>
                    <li><span class="pos pos-3">3º Puesto</span> <span class="val">$ 100.000</span></li>
                  </ul>
                </div>
              </div>

              <div class="kids-prize-banner mt-3">
                <span class="material-symbols-outlined">child_care</span>
                <div class="banner-text">
                  <strong>Categorías Infantiles:</strong>
                  Premios y Regalos Especiales para 1º, 2º y 3º puesto (Niñas y Niños).
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </div>
  `,
  styles: [`
    .premiacion-block {
      position: relative;
      padding: 0;
      overflow: hidden;
      background: var(--c-bg);
    }

    .premiacion-inner {
      position: relative;
      margin: 0 auto;
      max-width: 1000px;
      padding: 4rem 1.5rem;
      border-top: 1px solid rgba(255,107,0,0.2);
      border-bottom: 1px solid rgba(255,107,0,0.2);
    }

    .premiacion-glow {
      position: absolute;
      top: 20%;
      left: 50%;
      width: 800px;
      height: 300px;
      transform: translate(-50%, -50%);
      background: radial-gradient(ellipse, rgba(0,200,83,0.1) 0%, transparent 60%);
      pointer-events: none;
    }

    /* ── Header ─────────────────────── */
    .premiacion-header-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
      margin-bottom: 3rem;
    }

    .premiacion-icon {
      font-size: 3.5rem;
      color: var(--c-orange);
      filter: drop-shadow(0 4px 20px rgba(255,107,0,0.3));
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }

    .premiacion-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .premiacion-label {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.2rem;
      color: var(--c-orange);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 0.3rem;
    }

    .premiacion-amount {
      font-family: 'Bebas Neue', cursive;
      font-size: clamp(3rem, 7vw, 5rem);
      color: #ffffff;
      line-height: 1;
      letter-spacing: 0.02em;
      text-shadow: 0 0 40px rgba(0,200,83,0.25);
    }

    .premiacion-amount small {
      font-size: 0.4em;
      color: var(--c-muted);
      vertical-align: middle;
      margin-left: 0.3rem;
    }

    .premiacion-sub {
      font-size: 0.95rem;
      color: var(--c-muted);
      margin-top: 0.8rem;
      background: rgba(255,255,255,0.05);
      padding: 0.3rem 1rem;
      border-radius: 50px;
    }

    /* ── Tabs Navigation ────────────── */
    .prize-tabs-nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      position: relative;
      z-index: 2;
    }

    .tab-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.1);
      color: var(--c-muted);
      padding: 0.8rem 1.5rem;
      border-radius: var(--r-md);
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--tr-fast);
    }

    .tab-btn:hover {
      background: rgba(255,255,255,0.08);
      color: var(--c-white);
    }

    .tab-btn.active {
      background: linear-gradient(135deg, rgba(26,107,255,0.2), rgba(0,200,83,0.15));
      border-color: rgba(26,107,255,0.4);
      color: var(--c-white);
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }

    /* ── Tab Content ────────────────── */
    .prize-tab-content {
      padding: 2.5rem;
      border-radius: var(--r-xl);
      border: 1px solid rgba(255,255,255,0.1);
    }

    .slide-up {
      animation: slideUpTab 0.3s ease-out;
    }

    @keyframes slideUpTab {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .prize-pane-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .prize-pane-header h3 {
      font-family: 'Bebas Neue', cursive;
      font-size: 2rem;
      color: var(--c-white);
      letter-spacing: 0.05em;
      margin-bottom: 0.2rem;
    }

    .prize-pane-header p {
      color: var(--c-muted);
      font-size: 0.9rem;
    }

    .prize-tables-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .prize-card {
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: var(--r-md);
      padding: 1.5rem;
    }

    .prize-card-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--c-blue-light);
      margin-bottom: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-align: center;
      padding-bottom: 0.8rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .prize-list {
      list-style: none;
      padding: 0; margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .prize-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
    }

    .pos {
      font-weight: 700;
      font-size: 0.95rem;
    }

    .pos-1 { color: #FFD700; } /* Oro */
    .pos-2 { color: #C0C0C0; } /* Plata */
    .pos-3 { color: #CD7F32; } /* Bronce */

    .val {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.4rem;
      color: var(--c-white);
      letter-spacing: 0.03em;
    }

    .kids-prize-banner {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(255,107,0,0.08);
      border: 1px dashed rgba(255,107,0,0.3);
      padding: 1.2rem;
      border-radius: var(--r-md);
      margin-top: 2rem;
    }
    
    .mt-3 { margin-top: 1.5rem; }

    .kids-prize-banner span.material-symbols-outlined {
      font-size: 2.2rem;
      color: var(--c-orange);
    }

    .banner-text {
      color: var(--c-muted);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .banner-text strong {
      display: block;
      color: #fff;
    }

    @media (max-width: 768px) {
      .prize-tabs-nav {
        flex-direction: column;
        gap: 0.5rem;
      }
      .prize-tables-grid {
        grid-template-columns: 1fr;
      }
      .prize-tab-content {
        padding: 1.5rem;
      }
    }
  `]
})
export class PremiacionComponent {
  activeTab: 'ciclismo' | 'atletismo' | 'natacion' = 'ciclismo';
}
