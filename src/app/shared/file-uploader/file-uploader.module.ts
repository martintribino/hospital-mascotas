import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  MatInputModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatIconModule,
  MatTooltipModule,
  MatChipsModule,
} from "@angular/material";

import { FileUploaderComponent } from "./file-uploader.component";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    FormsModule,
  ],
  declarations: [FileUploaderComponent],
  exports: [FileUploaderComponent],
  entryComponents: [FileUploaderComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FileUploaderModule {}
