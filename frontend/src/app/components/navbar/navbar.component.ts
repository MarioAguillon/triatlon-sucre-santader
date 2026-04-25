// ============================================================
// components/navbar/navbar.component.ts
// ============================================================
import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector:   'app-navbar',
  standalone: true,
  imports:    [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="container nav-inner">
        <a href="#inicio" class="nav-brand">
          <img src="logo.png" alt="Triatlón Sucre Logo" class="brand-logo" />
          <span class="brand-text">
            <strong>TRIATLÓN</strong>
            <small>Sucre Sin Límites 2.0</small>
          </span>
        </a>

        <ul class="nav-links" [class.open]="menuOpen()">
          <li><a href="#inicio"      (click)="closeMenu()">Inicio</a></li>
          <li><a href="#evento"      (click)="closeMenu()">El Evento</a></li>
          <li><a href="#disciplinas" (click)="closeMenu()">Disciplinas</a></li>
          <li><a href="#invitacion"  (click)="closeMenu()">Invitación</a></li>
          <li><a href="#jerseys"      (click)="closeMenu()">Jerseys</a></li>
          <li><a href="#galeria-primera" (click)="closeMenu()">Galería</a></li>
          <li><a href="#patrocinadores" (click)="closeMenu()">Patrocinadores</a></li>
          <li><a href="#pagos"           (click)="closeMenu()">Pagos</a></li>
          <li>
            <a href="#inscripcion" class="nav-cta" (click)="closeMenu()">
              Inscribirse
            </a>
          </li>
        </ul>

        <button class="hamburger" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      padding: 1.2rem 0;
      transition: all 0.35s ease;
    }

    .navbar.scrolled {
      background: rgba(7, 9, 15, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      padding: 0.8rem 0;
      box-shadow: 0 4px 30px rgba(0,0,0,0.5);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      text-decoration: none;
    }

    .brand-logo { 
      height: 60px; 
      width: auto; 
      object-fit: contain;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .brand-text strong {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.3rem;
      letter-spacing: 0.08em;
      color: #fff;
      background: linear-gradient(90deg, #00c853, #fff, #1a6bff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .brand-text small {
      font-size: 0.65rem;
      color: #8899aa;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
      margin: 0; padding: 0;
    }

    .nav-links a {
      color: rgba(255,255,255,0.75);
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.2s;
      position: relative;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0; right: 0;
      height: 2px;
      background: #1a6bff;
      transform: scaleX(0);
      transition: transform 0.2s;
    }

    .nav-links a:hover { color: #fff; }
    .nav-links a:hover::after { transform: scaleX(1); }

    .nav-cta {
      background: linear-gradient(135deg, #0047cc, #4d8eff) !important;
      color: #fff !important;
      padding: 0.55rem 1.4rem;
      border-radius: 50px;
      font-weight: 700 !important;
      box-shadow: 0 4px 20px rgba(26,107,255,0.35);
      transition: all 0.2s !important;
    }

    .nav-cta::after { display: none !important; }

    .nav-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(26,107,255,0.5) !important;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
    }

    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s;
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }

      .nav-links {
        display: none;
        position: fixed;
        top: 70px; left: 0; right: 0;
        background: rgba(7,9,15,0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.07);
        max-height: calc(100vh - 70px);
        overflow-y: auto;
      }

      .nav-links.open { display: flex; }
    }
  `]
})
export class NavbarComponent {
  scrolled  = signal(false);
  menuOpen  = signal(false);

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 50); }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
