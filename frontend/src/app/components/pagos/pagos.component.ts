// ============================================================
// components/pagos/pagos.component.ts
// Sección de Pagos y Aportes — Nequi
// ============================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector:   'app-pagos',
  standalone: true,
  template: `
    <section id="pagos" class="section pagos-section">
      <div class="section-bg">
        <img src="bg_hero.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="section-header">
          <p class="section-label">Paso Final</p>
          <h2 class="section-title">Pagos y Aportes</h2>
          <p class="section-subtitle" style="margin-inline:auto">
            Completa tu inscripción realizando el pago a través de Nequi.
            Una vez realizado, envía tu comprobante por WhatsApp para validación.
          </p>
        </div>

        <div class="pagos-grid">
          <!-- QR Code Card -->
          <div class="pago-card qr-card glass">
            <div class="card-header-icon">
              <span class="material-symbols-outlined">qr_code_2</span>
            </div>
            <h3 class="pago-card-title">Escanea el Código QR</h3>
            <p class="pago-card-desc">Abre tu app Nequi, selecciona "Pagar" y escanea este código:</p>
            <div class="qr-wrapper">
              <img src="qr_nequi.jpg" alt="QR de pago Nequi" class="qr-image" />
              <div class="qr-glow"></div>
            </div>
            <div class="qr-brand">
              <span class="nequi-badge">Nequi</span>
            </div>
          </div>

          <!-- Payment Keys Card -->
          <div class="pago-card keys-card glass">
            <div class="card-header-icon">
              <span class="material-symbols-outlined">key</span>
            </div>
            <h3 class="pago-card-title">Llaves de Pago</h3>
            <p class="pago-card-desc">Si prefieres, usa una de las siguientes llaves en tu app Nequi:</p>

            <div class="keys-list">
              <!-- Llave 1 -->
              <div class="key-item">
                <div class="key-icon">
                  <span class="material-symbols-outlined">phone_android</span>
                </div>
                <div class="key-info">
                  <span class="key-label">Llave Telefónica (BRE B)</span>
                  <span class="key-value">3102198939</span>
                </div>
                <button class="copy-btn" (click)="copiar('3102198939')" [title]="copiadoKey === '3102198939' ? 'Copiado' : 'Copiar'">
                  <span class="material-symbols-outlined">
                    {{ copiadoKey === '3102198939' ? 'check' : 'content_copy' }}
                  </span>
                </button>
              </div>

              <!-- Llave 2 -->
              <div class="key-item">
                <div class="key-icon">
                  <span class="material-symbols-outlined">alternate_email</span>
                </div>
                <div class="key-info">
                  <span class="key-label">Llave Digital</span>
                  <span class="key-value">&#64;EAMA7209</span>
                </div>
                <button class="copy-btn" (click)="copiar('@EAMA7209')" [title]="copiadoKey === '@EAMA7209' ? 'Copiado' : 'Copiar'">
                  <span class="material-symbols-outlined">
                    {{ copiadoKey === '@EAMA7209' ? 'check' : 'content_copy' }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Instructions -->
            <div class="instrucciones">
              <div class="instrucciones-title">
                <span class="material-symbols-outlined">info</span>
                <span>Instrucciones</span>
              </div>
              <ol class="instrucciones-list">
                <li>Abre la app <strong>Nequi</strong> en tu celular</li>
                <li>Selecciona <strong>"Enviar plata"</strong></li>
                <li>Usa el QR o ingresa una de las llaves</li>
                <li>Confirma el monto de tu inscripción</li>
                <li>Guarda o captura el <strong>comprobante</strong></li>
              </ol>
            </div>

            <!-- WhatsApp CTA -->
            <a
              [href]="whatsappUrl"
              target="_blank"
              rel="noopener"
              class="btn btn-whatsapp"
            >
              <svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar comprobante por WhatsApp
            </a>
          </div>
        </div>

        <!-- Info footer -->
        <div class="pagos-footer glass">
          <span class="material-symbols-outlined">verified</span>
          <p>Tu pago será verificado en un plazo de <strong>24 horas</strong>. Al ser confirmado, recibirás la validación de tu inscripción.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pagos-section {
      position: relative;
      overflow: hidden;
      border-top: 1px solid var(--c-border);
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header .section-subtitle {
      margin-inline: auto;
    }

    /* ── Grid ──────────────────────────── */
    .pagos-grid {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 2.5rem;
      align-items: start;
      margin-bottom: 3rem;
    }

    /* ── Card base ─────────────────────── */
    .pago-card {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .card-header-icon {
      width: 60px; height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(26,107,255,0.15), rgba(0,200,83,0.1));
      border: 1px solid rgba(26,107,255,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.2rem;
    }

    .card-header-icon .material-symbols-outlined {
      font-size: 1.8rem;
      color: var(--c-blue-light);
    }

    .pago-card-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 2rem;
      color: var(--c-white);
      letter-spacing: 0.04em;
      margin-bottom: 0.5rem;
    }

    .pago-card-desc {
      color: var(--c-muted);
      font-size: 0.92rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      max-width: 380px;
    }

    /* ── QR Card ───────────────────────── */
    .qr-wrapper {
      position: relative;
      padding: 1.2rem;
      background: #fff;
      border-radius: var(--r-lg);
      margin-bottom: 1.5rem;
      box-shadow: 0 8px 40px rgba(0,0,0,0.4);
      overflow: hidden;
    }

    .qr-image {
      width: 220px;
      height: 220px;
      object-fit: cover;
      object-position: center;
      border-radius: var(--r-sm);
      background: var(--c-bg); /* Use theme bg instead of white */
      /* Clip to hide maroon border — zoom in slightly to crop edges */
      transform: scale(1.08);
      /* Convertir el vinotinto de Nequi a un tono neutro o azulado de la paleta */
      filter: grayscale(100%) brightness(1.1) contrast(1.2);
    }

    .qr-glow {
      position: absolute;
      inset: -20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(26,107,255,0.12) 0%, transparent 70%);
      pointer-events: none;
      z-index: -1;
    }

    .nequi-badge {
      display: inline-block;
      padding: 0.4rem 1.5rem;
      background: linear-gradient(135deg, #e6007e, #d4006e);
      color: #fff;
      font-weight: 700;
      font-size: 0.85rem;
      border-radius: 50px;
      letter-spacing: 0.06em;
    }

    /* ── Keys Card ─────────────────────── */
    .keys-card {
      text-align: left;
      align-items: stretch;
    }

    .keys-card .card-header-icon,
    .keys-card .pago-card-title,
    .keys-card .pago-card-desc {
      align-self: center;
      text-align: center;
    }

    .keys-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.8rem;
    }

    .key-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.2rem;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--r-md);
      transition: all var(--tr-fast);
    }

    .key-item:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(26,107,255,0.25);
    }

    .key-icon {
      width: 44px; height: 44px;
      border-radius: 50%;
      background: rgba(26,107,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .key-icon .material-symbols-outlined {
      color: var(--c-blue-light);
      font-size: 1.3rem;
    }

    .key-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .key-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .key-value {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.6rem;
      color: var(--c-white);
      letter-spacing: 0.06em;
    }

    .copy-btn {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--c-border);
      color: var(--c-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--tr-fast);
      flex-shrink: 0;
    }

    .copy-btn .material-symbols-outlined {
      font-size: 1.1rem;
    }

    .copy-btn:hover {
      background: rgba(26,107,255,0.15);
      border-color: var(--c-blue);
      color: var(--c-blue-light);
    }

    /* ── Instructions ──────────────────── */
    .instrucciones {
      background: rgba(0,200,83,0.04);
      border: 1px solid rgba(0,200,83,0.15);
      border-radius: var(--r-md);
      padding: 1.2rem 1.5rem;
      margin-bottom: 2rem;
      width: 100%;
    }

    .instrucciones-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--c-green);
      margin-bottom: 0.8rem;
    }

    .instrucciones-title .material-symbols-outlined {
      font-size: 1.1rem;
    }

    .instrucciones-list {
      list-style: none;
      counter-reset: step;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .instrucciones-list li {
      counter-increment: step;
      display: flex;
      align-items: flex-start;
      gap: 0.7rem;
      font-size: 0.88rem;
      color: var(--c-muted);
      line-height: 1.5;
    }

    .instrucciones-list li::before {
      content: counter(step);
      width: 22px; height: 22px;
      border-radius: 50%;
      background: rgba(0,200,83,0.12);
      border: 1px solid rgba(0,200,83,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--c-green);
      flex-shrink: 0;
      margin-top: 1px;
    }

    .instrucciones-list li strong {
      color: var(--c-white);
    }

    /* ── WhatsApp Button ───────────────── */
    .btn-whatsapp {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.7rem;
      width: 100%;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: #fff;
      font-family: var(--font-body);
      font-size: 1.05rem;
      font-weight: 700;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      transition: all var(--tr-med);
      text-decoration: none;
      box-shadow: 0 8px 32px rgba(37,211,102,0.3);
    }

    .btn-whatsapp:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 44px rgba(37,211,102,0.45);
    }

    .wa-icon {
      flex-shrink: 0;
    }

    /* ── Footer info ───────────────────── */
    .pagos-footer {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem 2rem;
      margin-top: 1rem;
    }

    .pagos-footer .material-symbols-outlined {
      font-size: 1.8rem;
      color: var(--c-green);
      flex-shrink: 0;
    }

    .pagos-footer p {
      color: var(--c-muted);
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .pagos-footer strong {
      color: var(--c-white);
    }

    /* ── Responsive ────────────────────── */
    @media (max-width: 900px) {
      .pagos-grid {
        grid-template-columns: 1fr;
        max-width: 560px;
        margin-inline: auto;
      }
    }

    @media (max-width: 500px) {
      .pago-card {
        padding: 1.5rem;
      }

      .qr-image {
        width: 180px;
        height: 180px;
      }

      .key-item {
        padding: 0.8rem;
      }

      .key-value {
        font-size: 1.3rem;
      }

      .pagos-footer {
        flex-direction: column;
        text-align: center;
        padding: 1.2rem;
      }
    }
  `]
})
export class PagosComponent implements OnInit {
  particles: string[] = [];
  copiadoKey = '';

  whatsappUrl = '';

  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });

    const mensaje = 'Buenos días, adjunto mi comprobante de pago correspondiente al evento para validación.';
    this.whatsappUrl = `https://api.whatsapp.com/send?phone=573102198939&text=${encodeURIComponent(mensaje)}`;
  }

  copiar(valor: string) {
    navigator.clipboard.writeText(valor).then(() => {
      this.copiadoKey = valor;
      setTimeout(() => this.copiadoKey = '', 2000);
    });
  }
}
