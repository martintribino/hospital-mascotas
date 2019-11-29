import { NgModule } from '@angular/core';

import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from '../../shared';


@NgModule({
  imports: [
    SharedModule,
    ServicesRoutingModule
  ],
  declarations: [
    ServicesComponent
  ],
  providers: []
})

export class ServicesModule { }