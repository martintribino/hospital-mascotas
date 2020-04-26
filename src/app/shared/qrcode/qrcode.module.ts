import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatDialogModule,
} from "@angular/material";

import { QrcodeComponent } from "./qrcode.component";

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [QrcodeComponent],
  exports: [QrcodeComponent],
  entryComponents: [QrcodeComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class QrcodeModule {}
