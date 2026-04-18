// ============================================================
// components/hero/hero.component.ts
// ============================================================
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RegistrationService }       from '../../services/registration.service';

@Component({
  selector:   'app-hero',
  standalone: true,
  template: `
    <section id="inicio" class="hero">
      <!-- Background image -->
      <div class="hero-bg">
        <img src="bg_hero.jpg" alt="Triatlón Sucre Sin Límites" class="hero-img" />
        <div class="hero-overlay"></div>
      </div>

      <!-- Particles -->
      <div class="particles">
        @for (p of particles; track $index) {
          <div class="particle" [style]="p"></div>
        }
      </div>

      <!-- Content -->
      <div class="container hero-content">
        <div class="hero-badge animate-fade-up">
          <span>🗓️</span>
          <span>18 de Julio · 2026 · Sucre, Santander</span>
        </div>

        <div class="hero-split-layout">
          <div class="hero-left-col">
            <h1 class="hero-title animate-fade-up" style="animation-delay:0.15s">
              TRIATLÓN<br>
              <span class="title-accent">SUCRE</span><br>
              <span class="title-thin">SIN LÍMITES</span>
              <span class="title-version">2.0</span>
            </h1>

            <p class="hero-subtitle animate-fade-up" style="animation-delay:0.3s">
              Natación · Ciclismo · Running<br>
              <strong>¡La aventura más grande de Santander!</strong>
            </p>

            <div class="hero-actions animate-fade-up" style="animation-delay:0.45s">
              <a href="#inscripcion" class="btn btn-primary btn-hero">
                🏁 Inscribirse Ahora
              </a>
              <a href="#evento" class="btn btn-outline">
                Conocer más
              </a>
            </div>
          </div>

          <div class="hero-right-col">
            <!-- Countdown Timer -->
            <div class="countdown-timer animate-fade-up" style="animation-delay:0.55s">
              <div class="countdown-item">
                <span class="countdown-value">{{ days() }}</span>
                <span class="countdown-label">Días</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <span class="countdown-value">{{ hours() }}</span>
                <span class="countdown-label">Horas</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <span class="countdown-value">{{ minutes() }}</span>
                <span class="countdown-label">Minutos</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <span class="countdown-value">{{ seconds() }}</span>
                <span class="countdown-label">Segundos</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-stats animate-fade-up" style="animation-delay:0.7s">
          <div class="stat">
            <span class="stat-num">{{ count() }}+</span>
            <span class="stat-label">Inscritos</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">Disciplinas</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">2ª</span>
            <span class="stat-label">Edición</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <div class="scroll-dot"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    /* ── Background ─────────────────────────── */
    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      transform: scale(1.05);
      animation: heroZoom 20s ease-in-out infinite alternate;
    }

    @keyframes heroZoom {
      from { transform: scale(1.05); }
      to   { transform: scale(1.12); }
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(7,9,15,0.92) 0%,
        rgba(10,22,40,0.82) 40%,
        rgba(7,9,15,0.75) 100%
      );
    }

    /* ── Particles ──────────────────────────── */
    .particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
    .particle {
      position: absolute;
      width: 3px; height: 3px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      animation: float1 linear infinite;
    }

    @keyframes float1 {
      from { transform: translateY(100vh) scale(0); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      to   { transform: translateY(-10vh) scale(1); opacity: 0; }
    }

    /* ── Content ────────────────────────────── */
    .hero-content {
      position: relative;
      z-index: 2;
      padding-top: 100px;
      padding-bottom: 60px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      background: rgba(26,107,255,0.15);
      border: 1px solid rgba(26,107,255,0.35);
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #4d8eff;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(8px);
    }

    .hero-title {
      font-family: 'Bebas Neue', cursive;
      font-size: clamp(4rem, 10vw, 8rem);
      line-height: 0.9;
      letter-spacing: 0.02em;
      color: #fff;
      margin-bottom: 1.5rem;
    }

    .title-accent {
      background: linear-gradient(135deg, #ff6b00, #ff8c38);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .title-thin {
      font-size: clamp(2.5rem, 6vw, 5rem);
      opacity: 0.85;
    }

    .title-version {
      display: inline-block;
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      background: linear-gradient(135deg, #00c853, #4dffa0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: 0.5rem;
      vertical-align: super;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: rgba(226,232,240,0.8);
      margin-bottom: 2.5rem;
      line-height: 1.7;
    }

    /* ── Split Layout ───────────────────────── */
    .hero-split-layout {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .hero-left-col {
      flex: 1;
    }

    .hero-right-col {
      display: flex;
      justify-content: flex-end;
    }
    
    /* ── Title overrides for split layout ───── */
    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 0;
    }

    .btn-hero {
      font-size: 1.1rem;
      padding: 1rem 2.5rem;
      box-shadow: 0 8px 40px rgba(255,107,0,0.45);
    }

    /* ── Countdown Timer ────────────────────── */
    .countdown-timer {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 0;
      padding: 1.5rem 2.5rem;
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      display: inline-flex;
    }

    .countdown-item {
      text-align: center;
      min-width: 60px;
    }

    .countdown-value {
      display: block;
      font-family: 'Bebas Neue', cursive;
      font-size: clamp(2.2rem, 5vw, 3.2rem);
      color: #ffffff;
      line-height: 1;
      letter-spacing: 0.04em;
      text-shadow: 0 0 20px rgba(255,255,255,0.15);
      animation: countdownPulse 2s ease-in-out infinite;
    }

    .countdown-label {
      display: block;
      font-size: 0.65rem;
      font-weight: 600;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-top: 0.3rem;
    }

    .countdown-separator {
      font-family: 'Bebas Neue', cursive;
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      color: rgba(255,255,255,0.25);
      line-height: 1;
      margin-bottom: 1rem;
      animation: countdownPulse 1s ease-in-out infinite;
    }

    @keyframes countdownPulse {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0.85; }
    }

    /* ── Stats ──────────────────────────────── */
    .hero-stats {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .stat { text-align: center; }

    .stat-num {
      display: block;
      font-family: 'Bebas Neue', cursive;
      font-size: 2.5rem;
      color: #fff;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #8899aa;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: rgba(255,255,255,0.15);
    }

    /* ── Scroll indicator ───────────────────── */
    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }

    .scroll-dot {
      width: 20px; height: 20px;
      border: 2px solid rgba(255,255,255,0.4);
      border-radius: 50%;
      animation: bounceDown 1.5s infinite;
    }

    @keyframes bounceDown {
      0%, 100% { transform: translateY(0); opacity: 0.5; }
      50%       { transform: translateY(8px); opacity: 1; }
    }

    @media (max-width: 900px) {
      .hero-split-layout {
        flex-direction: column;
        align-items: flex-start;
      }
      .hero-right-col {
        justify-content: flex-start;
        width: 100%;
        margin-top: 1rem;
      }
    }

    @media (max-width: 768px) {
      .hero-actions { flex-direction: column; }
      .btn-hero     { text-align: center; }
      .hero-stats   { gap: 1rem; }
      .stat-num     { font-size: 2rem; }
      .countdown-timer { gap: 0.5rem; padding: 1rem 1.2rem; margin-bottom: 2.5rem; }
      .countdown-item  { min-width: 45px; }
      .countdown-separator { margin-bottom: 0.8rem; }
    }

    @media (max-width: 400px) {
      .countdown-timer { gap: 0.3rem; padding: 0.8rem 0.8rem; }
      .countdown-item  { min-width: 38px; }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  count    = signal(0);
  days     = signal('00');
  hours    = signal('00');
  minutes  = signal('00');
  seconds  = signal('00');
  particles: string[] = [];

  private countdownInterval: any;

  constructor(private regSvc: RegistrationService) {}

  ngOnInit() {
    // Generar partículas
    this.particles = Array.from({ length: 30 }, () => {
      const x    = Math.random() * 100;
      const dur  = 8 + Math.random() * 12;
      const del  = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });

    // Contar inscritos
    this.regSvc.getCount().subscribe({
      next: res => this.count.set(res.total),
      error: ()  => this.count.set(0)
    });

    // Countdown — 18 de julio de 2026 a las 8:00 AM
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private updateCountdown() {
    const target = new Date('2026-07-18T08:00:00').getTime();
    const now    = Date.now();
    const diff   = Math.max(0, target - now);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    this.days.set(String(d).padStart(2, '0'));
    this.hours.set(String(h).padStart(2, '0'));
    this.minutes.set(String(m).padStart(2, '0'));
    this.seconds.set(String(s).padStart(2, '0'));
  }
}
