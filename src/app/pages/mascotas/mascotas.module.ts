import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MascotasComponent } from './mascotas.component';
import { MascotasRoutingModule } from './mascotas-routing.module';


@NgModule({
  imports: [
    MascotasRoutingModule,
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    MascotasComponent,
  ],
  providers: []
})

export class MascotasModule { }