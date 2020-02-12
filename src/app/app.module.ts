import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  SharedModule, HeaderComponent
} from './shared';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthenticationService } from './services/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { MatPaginatorIntl } from '@angular/material';
import { getEsPaginatorIntl } from 'src/helpers/es-paginator-intl';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    NotAllowedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
