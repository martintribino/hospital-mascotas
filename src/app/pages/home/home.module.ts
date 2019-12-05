import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatCardModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule { }