import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateVeterinariosComponent } from './validate-veterinarios.component';
import { ValidateVeterinariosRoutingModule } from './validate-veterinarios-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';


@NgModule({
  imports: [
    ValidateVeterinariosRoutingModule,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  declarations: [
    ValidateVeterinariosComponent
  ],
  providers: []
})

export class ValidateVeterinariosModule { }