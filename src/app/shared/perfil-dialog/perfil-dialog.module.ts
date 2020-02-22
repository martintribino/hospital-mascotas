import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogModule } from '@angular/material';

import { PerfilDialogComponent } from './perfil-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    PerfilDialogComponent
  ],
  exports: [
    PerfilDialogComponent
  ],
  entryComponents: [PerfilDialogComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})

export class PerfilDialogModule { }