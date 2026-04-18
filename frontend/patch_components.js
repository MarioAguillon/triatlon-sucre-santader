const fs = require('fs');

const files = [
  { p: 'about/about.component.ts', img: 'bg_about.jpg' },
  { p: 'disciplines/disciplines.component.ts', img: 'bg_disciplines.jpg' },
  { p: 'invitation/invitation.component.ts', img: 'bg_invitation.jpg' },
  { p: 'jerseys/jerseys.component.ts', img: 'bg_invitation.jpg' },
  { p: 'sponsors/sponsors.component.ts', img: 'bg_hero.jpg' },
  { p: 'registration/registration.component.ts', img: 'bg_disciplines.jpg' },
  { p: 'footer/footer.component.ts', img: 'bg_about.jpg' }
];

const htmlSnippet = (img) => `
      <div class="section-bg">
        <img src="${img}" class="section-img">
        <div class="section-overlay"></div>
      </div>
      <div class="particles">
        @for (p of particles; track $index) { <div class="particle" [style]="p"></div> }
      </div>
`;

const particlesTS = `
  particles: string[] = [];
  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => {
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const del = Math.random() * 8;
      const size = 2 + Math.random() * 4;
      return \`left:\${x}%;width:\${size}px;height:\${size}px;animation-duration:\${dur}s;animation-delay:\${del}s\`;
    });
  }
`;

for (const {p, img} of files) {
  const path = 'c:/Angular Davis/triatlon/frontend/src/app/components/' + p;
  if (!fs.existsSync(path)) continue;
  let code = fs.readFileSync(path, 'utf8');

  // Insert bg html just after the opening <section...> or <footer> tag
  const regex = /(<(section|footer)[^>]*>)/;
  if (!code.includes('<div class="section-bg">')) {
    code = code.replace(regex, '$1' + htmlSnippet(img));
  }

  // Insert particles logic in class
  if (!code.includes('particles: string[]')) {
    if (!code.includes('OnInit')) {
      code = code.replace(/import { Component(.*?) } from '@angular\/core';/, "import { Component, OnInit$1 } from '@angular/core';");
      code = code.replace(/export class ([a-zA-Z]+) {/, "export class $1 implements OnInit {" + particlesTS);
    } else {
      if (code.includes('ngOnInit() {')) {
        const replacement = `particles: string[] = [];
  ngOnInit() {
    this.particles = Array.from({ length: 20 }, () => { const x = Math.random() * 100; const dur = 8 + Math.random() * 12; const del = Math.random() * 8; const size = 2 + Math.random() * 4; return \`left:\${x}%;width:\${size}px;height:\${size}px;animation-duration:\${dur}s;animation-delay:\${del}s\`; });
`;
        code = code.replace('ngOnInit() {', replacement);
      } else {
        code = code.replace(/export class ([a-zA-Z]+) implements OnInit {/, "export class $1 implements OnInit {" + particlesTS);
      }
    }
  }

  // Inject position: relative and overflow: hidden to styles if not there
  if (p === 'about/about.component.ts') {
    code = code.replace('.about-section {', '.about-section { position: relative; overflow: hidden;');
  }
  if (p === 'footer/footer.component.ts') {
    code = code.replace('.main-footer {', '.main-footer { position: relative; overflow: hidden;');
  }

  fs.writeFileSync(path, code, 'utf8');
  console.log('Processed', p);
}
