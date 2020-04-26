import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatDialogModule,
} from "@angular/material";

import { TurnoDialogComponent } from "./turno-dialog.component";

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [TurnoDialogComponent],
  exports: [TurnoDialogComponent],
  entryComponents: [TurnoDialogComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class TurnoDialogModule {}
