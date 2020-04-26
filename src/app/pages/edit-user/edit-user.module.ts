import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { EditUserComponent } from "./edit-user.component";
import { EditUserRoutingModule } from "./edit-user-routing.module";

@NgModule({
  imports: [
    EditUserRoutingModule,
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditUserComponent],
  providers: [],
})
export class EditUserModule {}
