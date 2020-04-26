import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatInputModule,
  MatFormFieldModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatDialogModule,
  MatCheckboxModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FormFichaComponent } from "./form-ficha.component";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FormFichaComponent],
  exports: [FormFichaComponent],
  entryComponents: [FormFichaComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormFichaModule {}
