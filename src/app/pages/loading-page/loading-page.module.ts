import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingPageComponent } from './loading-page.component';
import { LoadingPageRoutingModule } from './loading-page-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    LoadingPageRoutingModule,
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    LoadingPageComponent,
  ],
  providers: []
})

export class LoadingPageModule { }