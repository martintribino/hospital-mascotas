import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatFormFieldModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatGridListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  imports: [
    EventsRoutingModule,
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EventsComponent
  ],
  providers: []
})

export class EventsModule { }