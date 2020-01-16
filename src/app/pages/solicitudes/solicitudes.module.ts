import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { SolicitudesComponent } from './solicitudes.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';


@NgModule({
  imports: [
    SolicitudesRoutingModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  declarations: [
    SolicitudesComponent
  ],
  providers: []
})

export class SolicitudesModule { }