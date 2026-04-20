// ============================================================
// components/jerseys/jerseys.component.ts
// ============================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector:   'app-jerseys',
  standalone: true,
  template: `
    <section id="jerseys" class="section jerseys-section">
      <div class="section-bg">
        <img src="bg_invitation.jpg" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>

      <div class="container">
        <div class="section-header">
          <p class="section-label">Indumentaria Oficial</p>
          <h2 class="section-title">Nuestras Camisetas</h2>
          <p class="section-subtitle">
            Edición exclusiva Triatlón Sucre Sin Límites 2.0. Diseños unisex de alto rendimiento.
          </p>
        </div>

        <div class="jerseys-videos-grid">
          <!-- Video 1: Running (Siza) -->
          <div class="jersey-card glass">
            <div class="video-container">
              <video autoplay loop muted playsinline class="jersey-video">
                <source src="camisetas/siza.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="jersey-info">
              <h3 class="jersey-title">Running Siza</h3>
              <p class="jersey-desc">Camiseta técnica unisex ideal para largas distancias con máximo confort.</p>
              <button class="btn btn-primary btn-jersey" (click)="abrirModal('Running Siza')">
                <span class="material-symbols-outlined" style="margin-right: 5px; vertical-align: middle;">shopping_cart</span> Reservar
              </button>
            </div>
          </div>

          <!-- Video 2: Ciclismo (Jersey) -->
          <div class="jersey-card glass">
            <div class="video-container">
              <video autoplay loop muted playsinline class="jersey-video">
                <source src="camisetas/jersey.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="jersey-info">
              <h3 class="jersey-title">Ciclismo Oficial</h3>
              <p class="jersey-desc">Jersey aero de secado rápido con ajuste perfecto para ruta.</p>
              <button class="btn btn-primary btn-jersey" (click)="abrirModal('Ciclismo Oficial')">
                <span class="material-symbols-outlined" style="margin-right: 5px; vertical-align: middle;">shopping_cart</span> Reservar
              </button>
            </div>
          </div>

          <!-- Video 3: Running (Clásica) -->
          <div class="jersey-card glass">
            <div class="video-container">
              <video autoplay loop muted playsinline class="jersey-video">
                <source src="camisetas/camisarunning.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="jersey-info">
              <h3 class="jersey-title">Running Clásica</h3>
              <p class="jersey-desc">Diseño exclusivo y ligero para enfrentar el tramo a pie de Sucre.</p>
              <button class="btn btn-primary btn-jersey" (click)="abrirModal('Running Clásica')">
                <span class="material-symbols-outlined" style="margin-right: 5px; vertical-align: middle;">shopping_cart</span> Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Formulario -->
      @if (mostrarModal) {
        <div class="modal-overlay" (click)="cerrarModal($event)">
          <div class="modal-content glass" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Reserva tu Camiseta</h3>
              <button class="modal-close" (click)="cerrarModal($event)"><span class="material-symbols-outlined">close</span></button>
            </div>
            
            <p class="modal-desc">
              Llena tus datos y serás dirigido a WhatsApp para coordinar tu pedido y envío de forma personalizada.
            </p>
            
            <form class="modal-form" (submit)="enviarpedido($event, nombre.value, talla.value, cantidad.value)">
              
              <div class="form-group">
                <label>Modelo Seleccionado (Unisex)</label>
                <input type="text" class="form-control" [value]="modeloSeleccionado" readonly />
              </div>

              <div class="form-group">
                <label>Nombre y Apellidos *</label>
                <input type="text" #nombre class="form-control" placeholder="Ej. Carlos Rodríguez" required />
              </div>
              
              <div class="form-row">
                <div class="form-group half">
                  <label>Talla *</label>
                  <select #talla class="form-control" required>
                    <option value="" disabled selected>Selecciona talla...</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
                
                <div class="form-group half">
                  <label>Cantidad *</label>
                  <input type="number" #cantidad class="form-control" min="1" max="50" value="1" required />
                </div>
              </div>
              
              <div class="form-info-alert">
                <span class="material-symbols-outlined">info</span>
                <small>Las tallas son estándar unisex. Precio por confirmar.</small>
              </div>

              <button type="submit" class="btn btn-primary btn-block">
                <span class="material-symbols-outlined" style="margin-right: 5px; vertical-align: middle;">send</span> Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .jerseys-section {
      position: relative;
      overflow: hidden;
      border-top: 1px solid var(--c-border);
    }
    
    .jerseys-section::before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 700px; height: 700px;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(0,71,204,0.06) 0%, transparent 70%);
      pointer-events: none;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header .section-subtitle {
      margin-inline: auto;
    }

    /* ── Grid Videos ─────────────────────────── */
    .jerseys-videos-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .jersey-card {
      display: flex;
      flex-direction: column;
      border-radius: var(--r-xl);
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.08);
      transition: transform var(--tr-med), box-shadow var(--tr-med);
    }

    .jersey-card:hover {
      transform: translateY(-8px);
      border-color: rgba(0, 200, 83, 0.4);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    }

    .video-container {
      width: 100%;
      aspect-ratio: 9/16;
      background: #000;
      position: relative;
      overflow: hidden;
    }

    .jersey-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--tr-slow);
    }

    .jersey-card:hover .jersey-video {
      transform: scale(1.05); /* Zoom sutil al hover */
    }

    .video-container::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 20%);
      pointer-events: none;
    }

    .jersey-info {
      padding: 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .jersey-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-white);
      letter-spacing: 0.04em;
      margin-bottom: 0.5rem;
    }

    .jersey-desc {
      color: var(--c-muted);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
      flex: 1;
    }

    .btn-jersey {
      width: 100%;
      justify-content: center;
      border-radius: var(--r-md);
      font-weight: 600;
    }
    
    /* ── Modal ─────────────────────────── */
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn var(--tr-fast);
    }
    
    .modal-content {
      width: 100%;
      max-width: 500px;
      background: var(--c-bg); /* O glass más opaco */
      border: 1px solid var(--c-border);
      border-radius: var(--r-xl);
      padding: 2.5rem;
      position: relative;
      animation: slideUp var(--tr-med);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .modal-header h3 {
      font-family: 'Bebas Neue', cursive;
      font-size: 2.2rem;
      color: var(--c-white);
      margin: 0;
    }
    
    .modal-close {
      background: rgba(255,255,255,0.05);
      border: none;
      color: var(--c-white);
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background var(--tr-fast);
    }
    
    .modal-close:hover {
      background: rgba(255,107,0,0.2);
      color: var(--c-orange);
    }
    
    .modal-desc {
      color: var(--c-muted);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }
    
    .modal-form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    
    .form-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--c-white);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .form-control {
      width: 100%;
      padding: 0.8rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--r-md);
      color: var(--c-white);
      font-family: inherit;
      font-size: 1rem;
      transition: all var(--tr-fast);
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--c-blue);
      box-shadow: 0 0 0 3px rgba(26, 107, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
    }
    
    .form-control[readonly] {
      background: rgba(255,255,255,0.02);
      color: var(--c-muted);
      cursor: not-allowed;
    }
    
    select.form-control {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238899aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 16px;
    }
    
    select.form-control option {
      background: var(--c-bg);
      color: var(--c-white);
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
    }
    
    .form-group.half {
      flex: 1;
    }
    
    .form-info-alert {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(0, 200, 83, 0.05);
      border-left: 3px solid var(--c-green);
      padding: 0.8rem;
      border-radius: 0 var(--r-sm) var(--r-sm) 0;
      color: var(--c-muted);
    }
    
    .btn-block {
      width: 100%;
      justify-content: center;
      padding: 1rem;
      font-size: 1.1rem;
      margin-top: 1rem;
      background: linear-gradient(135deg, #00c853, #009c40);
      border: none;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Responsive ───────────────────── */
    @media (max-width: 900px) {
      .jerseys-videos-grid {
        grid-template-columns: 1fr;
        max-width: 400px;
        margin-inline: auto;
      }
    }

    @media (max-width: 600px) {
      .modal-content {
        padding: 1.5rem;
      }
      .form-row {
        flex-direction: column;
        gap: 1.2rem;
      }
    }
  `]
})
export class JerseysComponent implements OnInit {
  particles: string[] = [];
  mostrarModal = false;
  modeloSeleccionado = '';
  
  // Número de WhatsApp oficial para recibir las órdenes (código país + número)
  // Ejemplo ficticio: '573001234567'
  telefonoOficial = '573196985790'; // Reemplazar con el número real de atención

  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return `left:${x}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
    });
  }

  abrirModal(modelo: string) {
    this.modeloSeleccionado = modelo;
    this.mostrarModal = true;
    document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
  }

  cerrarModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.mostrarModal = false;
    this.modeloSeleccionado = '';
    document.body.style.overflow = '';
  }

  enviarpedido(event: Event, nombre: string, talla: string, cantidad: string) {
    event.preventDefault();
    
    if (!nombre || !talla || !cantidad) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }
    
    // Construir mensaje de WhatsApp
    const mensaje = `Hola Triatlón Sucre Sin Límites 2.0 🏆. Deseo reservar indumentaria:
    
👤 Nombre: ${nombre}
👕 Modelo: ${this.modeloSeleccionado}
📏 Talla: ${talla} (Unisex)
🔢 Cantidad: ${cantidad}

Quedo atento(a) a la confirmación de disponibilidad y método de pago.`;

    // Codificar URL para WhatsApp
    const url = `https://api.whatsapp.com/send?phone=${this.telefonoOficial}&text=${encodeURIComponent(mensaje)}`;
    
    // Abrir en nueva pestaña
    window.open(url, '_blank');
    
    // Cerrar modal
    this.cerrarModal();
  }
}
