import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule } from '@angular/material';

import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


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