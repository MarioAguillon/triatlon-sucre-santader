// ============================================================
// components/home/home.component.ts — Landing Page orquestador
// ============================================================
import { Component } from '@angular/core';
import { HeroComponent }            from '../hero/hero.component';
import { AboutComponent }           from '../about/about.component';
import { DisciplinesComponent }     from '../disciplines/disciplines.component';
import { PremiacionComponent }      from '../premiacion/premiacion.component';
import { InvitationComponent }      from '../invitation/invitation.component';
import { RegistrationComponent }    from '../registration/registration.component';
import { RutasComponent }           from '../rutas/rutas.component';
import { GalleryPrimeraComponent }  from '../gallery-primera/gallery-primera.component';
import { GalleryPaisajesComponent } from '../gallery-paisajes/gallery-paisajes.component';
import { JerseysComponent }         from '../jerseys/jerseys.component';
import { SponsorsComponent }        from '../sponsors/sponsors.component';
import { FooterComponent }          from '../footer/footer.component';
import { NavbarComponent }          from '../navbar/navbar.component';

@Component({
  selector:  'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    DisciplinesComponent,
    PremiacionComponent,
    InvitationComponent,
    RegistrationComponent,
    RutasComponent,
    GalleryPrimeraComponent,
    GalleryPaisajesComponent,
    JerseysComponent,
    SponsorsComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-disciplines />
      <app-premiacion />
      <app-invitation />
      <app-registration />
      <app-rutas />
      <app-gallery-primera />
      <app-gallery-paisajes />
      <app-jerseys />
      <app-sponsors />
    </main>
    <app-footer />
  `,
  styles: []
})
export class HomeComponent {}
