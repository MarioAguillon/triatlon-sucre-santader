// ============================================================
// components/home/home.component.ts — Landing Page orquestador
// ============================================================
import { Component } from '@angular/core';
import { HeroComponent }            from '../hero/hero.component';
import { NoticiasComponent }          from '../noticias/noticias.component';
import { DisciplinesComponent }     from '../disciplines/disciplines.component';
import { PremiacionComponent }      from '../premiacion/premiacion.component';
import { RegistrationComponent }    from '../registration/registration.component';
import { RutasComponent }           from '../rutas/rutas.component';
import { GalleryPrimeraComponent }  from '../gallery-primera/gallery-primera.component';
import { GalleryPaisajesComponent } from '../gallery-paisajes/gallery-paisajes.component';
import { JerseysComponent }         from '../jerseys/jerseys.component';
import { SponsorsComponent }        from '../sponsors/sponsors.component';
import { PagosComponent }           from '../pagos/pagos.component';
import { FooterComponent }          from '../footer/footer.component';
import { NavbarComponent }          from '../navbar/navbar.component';

@Component({
  selector:  'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    NoticiasComponent,
    DisciplinesComponent,
    PremiacionComponent,
    RegistrationComponent,
    RutasComponent,
    GalleryPrimeraComponent,
    GalleryPaisajesComponent,
    JerseysComponent,
    SponsorsComponent,
    PagosComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-noticias />
      <app-disciplines />
      <app-premiacion />
      <app-registration />
      <app-rutas />
      <app-gallery-primera />
      <app-gallery-paisajes />
      <app-jerseys />
      <app-sponsors />
      <app-pagos />
    </main>
    <app-footer />
  `,
  styles: []
})
export class HomeComponent {}
