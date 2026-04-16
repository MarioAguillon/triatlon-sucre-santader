// ============================================================
// components/home/home.component.ts — Landing Page orquestador
// ============================================================
import { Component } from '@angular/core';
import { HeroComponent }         from '../hero/hero.component';
import { AboutComponent }        from '../about/about.component';
import { DisciplinesComponent }  from '../disciplines/disciplines.component';
import { InvitationComponent }   from '../invitation/invitation.component';
import { RegistrationComponent } from '../registration/registration.component';
import { JerseysComponent }      from '../jerseys/jerseys.component';
import { SponsorsComponent }     from '../sponsors/sponsors.component';
import { FooterComponent }       from '../footer/footer.component';
import { NavbarComponent }       from '../navbar/navbar.component';

@Component({
  selector:  'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    DisciplinesComponent,
    InvitationComponent,
    RegistrationComponent,
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
      <app-invitation />
      <app-registration />
      <app-jerseys />
      <app-sponsors />
    </main>
    <app-footer />
  `,
  styles: []
})
export class HomeComponent {}
