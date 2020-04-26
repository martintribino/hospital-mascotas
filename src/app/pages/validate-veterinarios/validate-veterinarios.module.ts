import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidateVeterinariosComponent } from "./validate-veterinarios.component";
import { ValidateVeterinariosRoutingModule } from "./validate-veterinarios-routing.module";
import { MatCardModule } from "@angular/material/card";
import {
  MatPaginatorModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatCheckboxModule,
} from "@angular/material";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    ValidateVeterinariosRoutingModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  declarations: [ValidateVeterinariosComponent],
  providers: [],
})
export class ValidateVeterinariosModule {}
