import { NgModule } from '@angular/core';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    SignupRoutingModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SignupComponent
  ],
  providers: []
})

export class SignupModule { }