// ============================================================
// components/premiacion/premiacion.component.ts
// Bloque de Premiación Integrada
// ============================================================
import { Component } from '@angular/core';

@Component({
  selector: 'app-premiacion',
  standalone: true,
  template: `
    <div class="premiacion-block">
      <div class="premiacion-inner">
        <div class="premiacion-glow"></div>
        <div class="premiacion-content">
          <div class="premiacion-icon">🏆</div>
          <div class="premiacion-text">
            <span class="premiacion-label">Premiación Total</span>
            <span class="premiacion-amount">$5.000.000 <small>COP</small></span>
            <span class="premiacion-sub">Distribuidos entre todas las categorías del evento</span>
          </div>
          <div class="premiacion-decorators">
            <span class="deco-medal">🥇</span>
            <span class="deco-medal">🥈</span>
            <span class="deco-medal">🥉</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .premiacion-block {
      position: relative;
      padding: 0;
      overflow: hidden;
    }

    .premiacion-inner {
      position: relative;
      margin: 0 auto;
      max-width: 1200px;
      padding: 3rem 2rem;
      background: linear-gradient(
        135deg,
        rgba(255,107,0,0.08) 0%,
        rgba(26,107,255,0.05) 50%,
        rgba(0,200,83,0.08) 100%
      );
      border-top: 1px solid rgba(255,107,0,0.2);
      border-bottom: 1px solid rgba(255,107,0,0.2);
      overflow: hidden;
    }

    .premiacion-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 600px;
      height: 200px;
      transform: translate(-50%, -50%);
      background: radial-gradient(ellipse, rgba(255,107,0,0.1) 0%, transparent 70%);
      pointer-events: none;
    }

    .premiacion-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      text-align: center;
    }

    .premiacion-icon {
      font-size: 3.5rem;
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
      font-size: 1.1rem;
      color: var(--c-orange);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 0.3rem;
    }

    .premiacion-amount {
      font-family: 'Bebas Neue', cursive;
      font-size: clamp(2.5rem, 6vw, 4rem);
      color: #ffffff;
      line-height: 1;
      letter-spacing: 0.04em;
      text-shadow: 0 0 30px rgba(255,107,0,0.2);
    }

    .premiacion-amount small {
      font-size: 0.5em;
      color: var(--c-muted);
      vertical-align: middle;
      margin-left: 0.3rem;
    }

    .premiacion-sub {
      font-size: 0.9rem;
      color: var(--c-muted);
      margin-top: 0.5rem;
      font-weight: 500;
    }

    .premiacion-decorators {
      display: flex;
      gap: 0.5rem;
      font-size: 1.8rem;
      opacity: 0.7;
    }

    .deco-medal {
      animation: float 3s ease-in-out infinite;
    }

    .deco-medal:nth-child(2) { animation-delay: 0.3s; }
    .deco-medal:nth-child(3) { animation-delay: 0.6s; }

    @media (max-width: 600px) {
      .premiacion-content { flex-direction: column; gap: 1rem; }
      .premiacion-decorators { justify-content: center; }
    }
  `]
})
export class PremiacionComponent {}
