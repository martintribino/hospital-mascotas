import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogModule } from '@angular/material';

import { ImagenMascotaComponent } from './imagen-mascota.component';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FileUploaderModule
  ],
  declarations: [
    ImagenMascotaComponent
  ],
  exports: [
    ImagenMascotaComponent
  ],
  entryComponents: [ImagenMascotaComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})

export class ImagenMascotaModule { }