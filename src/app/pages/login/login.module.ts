import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatIconModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule {}
