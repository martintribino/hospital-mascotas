import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeEsExtra from '@angular/common/locales/extra/es-AR';
import localeEnExtra from '@angular/common/locales/extra/en-US-POSIX';

registerLocaleData(localeEs, 'es-ES', localeEsExtra);
registerLocaleData(localeEn, 'en-ES', localeEnExtra);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
}
