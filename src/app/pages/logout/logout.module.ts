import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthenticationService } from 'src/app/services/auth.service';
import { LogoutComponent } from './logout.component';
import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  imports: [
    LogoutRoutingModule,
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    LogoutComponent,
  ],
  providers: []
})

export class LogoutModule { }