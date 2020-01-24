import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotasComponent } from './mascotas.component';
import { MascotasRoutingModule } from './mascotas-routing.module';
import {
  MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatProgressSpinnerModule, MatIconModule, MatExpansionModule, MatTooltipModule, MatSnackBarModule, MatDialogModule, MatMenuModule,
} from '@angular/material';
import { SubscriptionDialogModule } from 'src/app/shared/subscription-dialog/subscription-dialog.module';
import { FormMascotaModule } from 'src/app/shared/form-mascota/form-mascota.module';
import { FormFichaModule } from 'src/app/shared/form-ficha/form-ficha.module';

@NgModule({
  imports: [
    MascotasRoutingModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    SubscriptionDialogModule,
    FormMascotaModule,
    FormFichaModule,
    MatSnackBarModule
  ],
  declarations: [
    MascotasComponent,
  ],
  providers: []
})

export class MascotasModule { }