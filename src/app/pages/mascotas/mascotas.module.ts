import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatProgressSpinnerModule, MatIconModule, MatExpansionModule, MatTooltipModule, MatSnackBarModule, MatDialogModule, MatMenuModule, MatGridListModule,
} from '@angular/material';

import { SubscriptionDialogModule } from 'src/app/shared/subscription-dialog/subscription-dialog.module';
import { FormMascotaModule } from 'src/app/shared/form-mascota/form-mascota.module';
import { FormFichaModule } from 'src/app/shared/form-ficha/form-ficha.module';
import { PerfilDialogModule } from 'src/app/shared/perfil-dialog/perfil-dialog.module';
import { ImagenMascotaModule } from 'src/app/shared/imagen-mascota/imagen-mascota.module';
import { PetSearchModule } from 'src/app/shared/pet-search/pet-search.module';

import { MascotasComponent } from './mascotas.component';
import { MascotasRoutingModule } from './mascotas-routing.module';

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
    MatSnackBarModule,
    SubscriptionDialogModule,
    PerfilDialogModule,
    FormMascotaModule,
    FormFichaModule,
    PetSearchModule,
    ImagenMascotaModule
  ],
  declarations: [
    MascotasComponent,
  ],
  providers: []
})

export class MascotasModule { }