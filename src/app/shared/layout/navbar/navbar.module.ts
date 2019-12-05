import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule } from '@angular/material';

import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  imports: [
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  providers: []
})

export class NavbarModule { }