import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatCheckboxModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { EditPerfilRoutingModule } from "./edit-perfil-routing.module";
import { EditPerfilComponent } from "./edit-perfil.component";
import { PerfilService } from "src/app/services/perfil.service";

@NgModule({
  imports: [
    EditPerfilRoutingModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditPerfilComponent],
  providers: [PerfilService],
})
export class EditPerfilModule {}
