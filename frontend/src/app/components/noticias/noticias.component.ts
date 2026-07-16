// ============================================================
// components/noticias/noticias.component.ts
// ============================================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="noticias" class="section noticias-section">
      <div class="container">
        <div class="section-header" style="text-align:center">
          <p class="section-label">Actualidad</p>
          <h2 class="section-title">Noticias y Videos</h2>
          <p class="section-subtitle" style="margin-inline:auto">
            Revive los mejores momentos y entérate de las últimas novedades en nuestras redes sociales.
          </p>
        </div>

        <div class="news-grid">
          <!-- Noticia de Texto (Anuncio Oficial) -->
          <div class="news-card highlight-card">
            <div class="news-text-content">
              <span class="news-badge">🔥 ÚLTIMA HORA</span>
              <h3 class="news-title-large">¡Faltan solo {{ daysLeft }} días!</h3>
              <p class="news-body">
                ¡El tiempo vuela y ya solo faltan <strong>2 días</strong> para el gran evento! Muchos sucreños que hoy viven en diferentes rincones de Colombia ya están empacando maletas para regresar a su pueblo y disfrutar de la Triatlón 2.0 este 18 de julio. ¡Será un reencuentro inolvidable y no te lo puedes perder!
              </p>
              <p class="news-body">
                <strong>¡No te quedes por fuera, inscríbete ahora mismo!</strong> Cada día se siguen sumando más amigos y patrocinadores que, con su granito de arena, hacen posible que vivamos este evento tan especial. 
                <br><br>
                <strong>Un agradecimiento muy especial a quienes ya se han unido a esta causa:</strong> La Alcaldía Municipal de Sucre Santander en cabeza de la señora alcaldesa Nelcy Tellez, y nuestros patrocinadores Heymar García Ariza, Carlos Darío Marín, Cristian Mateus Marín, Hely Marin González, Néstor, Lelio, Fanny, Andres, Samantha, Oscar, Heladería Oohz, Disac y Alma. ¡Mil gracias por su valioso aporte! Asegura tu lugar y ven a celebrar con nosotros.
              </p>
              <a href="#inscripcion" class="news-cta">Inscribirse Ahora <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <!-- Ejemplo Embed Instagram -->
          <div class="news-card">
            <div class="embed-container" style="padding: 1rem 0;">
              <iframe src="https://www.instagram.com/reel/Daz9dxMOUXg/embed" width="320" height="476" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
            </div>
            <div class="news-info">
              <span class="news-platform" style="color: #E1306C">● Instagram</span>
              <h3 class="news-title">Último Reel</h3>
            </div>
          </div>

          <!-- Ejemplo Embed Facebook -->
          <div class="news-card">
            <div class="embed-container" style="padding: 1rem 0;">
              <iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2090755455654040%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
            </div>
            <div class="news-info">
              <span class="news-platform" style="color: #1877F2">● Facebook</span>
              <h3 class="news-title">Triatlón Sin Límites</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .noticias-section {
      background: var(--c-bg, #07090f);
      padding-top: 6rem;
      padding-bottom: 6rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .section-header { margin-bottom: 4rem; }
    
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .news-card {
      background: rgba(20, 25, 35, 0.6);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      backdrop-filter: blur(10px);
    }
    
    .news-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.4);
      border-color: rgba(255,255,255,0.1);
    }

    /* Estilos especiales para la noticia de texto principal */
    .highlight-card {
      grid-column: 1 / -1;
      background: linear-gradient(135deg, rgba(26,107,255,0.15) 0%, rgba(0,200,83,0.1) 100%);
      border: 1px solid rgba(26,107,255,0.3);
    }
    
    .news-text-content {
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
    
    .news-badge {
      display: inline-block;
      background: #1a6bff;
      font-weight: 800;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      margin-bottom: 1rem;
      align-self: flex-start;
      letter-spacing: 0.05em;
    }
    
    .news-title-large {
      font-size: 2rem;
      color: #fff;
      font-weight: 800;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    .news-body {
      color: rgba(255,255,255,0.7);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .news-cta {
      display: inline-block;
      margin-top: auto;
      padding: 0.8rem 1.5rem;
      background: #1a6bff;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      align-self: flex-start;
      transition: background 0.3s;
    }
    
    .news-cta:hover {
      background: #00c853;
    }

    .embed-container {
      width: 100%;
      min-height: 250px;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(255,255,255,0.03);
    }
    
    .embed-container iframe, .embed-container blockquote {
      margin: 0 auto !important;
      max-width: 100% !important;
      border: none;
      display: block;
    }
    
    .news-info {
      padding: 1.5rem;
    }
    
    .news-platform {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 800;
      display: block;
      margin-bottom: 0.5rem;
    }
    
    .news-title {
      font-size: 1.2rem;
      color: #fff;
      margin: 0;
      font-weight: 600;
      line-height: 1.3;
    }
  `]
})
export class NoticiasComponent implements OnInit {
  daysLeft: number = 0;
  private eventDate: Date = new Date('2026-07-18'); // 16 days from now

  ngOnInit() {
    const today = new Date();
    const diffTime = this.eventDate.getTime() - today.getTime();
    this.daysLeft = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  }
}
