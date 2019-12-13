import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MascotasComponent } from './mascotas.component';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { MatCardModule } from '@angular/material';


@NgModule({
  imports: [
    MascotasRoutingModule,
    CommonModule,
    MatCardModule
  ],
  declarations: [
    MascotasComponent,
  ],
  providers: []
})

export class MascotasModule { }