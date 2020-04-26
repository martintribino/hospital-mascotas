import { NgModule } from "@angular/core";
import {
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatOptionModule,
  MatFormFieldModule,
} from "@angular/material";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { QrcodeModule } from "src/app/shared/qrcode/qrcode.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    QrcodeModule,
    MatCardModule,
  ],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
