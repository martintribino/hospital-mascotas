import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeterinarioComponent } from './veterinario.component';
import { VeterinarioRoutingModule } from './veterinario-routing.module';


@NgModule({
  imports: [
    VeterinarioRoutingModule,
    CommonModule,
  ],
  declarations: [
    VeterinarioComponent
  ],
  providers: []
})

export class VeterinarioModule { }