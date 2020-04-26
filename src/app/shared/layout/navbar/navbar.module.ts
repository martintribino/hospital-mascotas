import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatDividerModule,
} from "@angular/material";

import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AvatarsModule } from "src/assets/svg/avatars.module";

@NgModule({
  imports: [
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    AvatarsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [],
})
export class NavbarModule {}
