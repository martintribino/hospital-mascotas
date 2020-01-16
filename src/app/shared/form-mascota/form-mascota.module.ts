import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormMascotaComponent } from './form-mascota.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormMascotaComponent
  ],
  exports: [
    FormMascotaComponent
  ],
  entryComponents: [FormMascotaComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})

export class FormMascotaModule { }