import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { QrcodeModule } from 'src/app/shared/qrcode/qrcode.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    QrcodeModule,
    MatCardModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule { }