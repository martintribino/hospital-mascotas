import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfilService } from 'src/app/services/perfil.service';
import { EditAvatarComponent } from './edit-avatar.component';
import { EditAvatarRoutingModule } from './edit-avatar-routing.module';

@NgModule({
  imports: [
    EditAvatarRoutingModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EditAvatarComponent
  ],
  providers: [
    PerfilService
  ]
})

export class EditAvatarModule { }