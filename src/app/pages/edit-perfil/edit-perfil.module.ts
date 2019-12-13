import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditPerfilRoutingModule } from './edit-perfil-routing.module';
import { EditPerfilComponent } from './edit-perfil.component';

@NgModule({
  imports: [
    EditPerfilRoutingModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EditPerfilComponent
  ],
  providers: []
})

export class EditPerfilModule { }