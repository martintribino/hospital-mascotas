import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateMascotaComponent } from './create-mascota.component';
import { CreateMascotaRoutingModule } from './create-mascota-routing.module';

@NgModule({
  imports: [
    CreateMascotaRoutingModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateMascotaComponent
  ],
  providers: []
})

export class CreateMascotaModule { }