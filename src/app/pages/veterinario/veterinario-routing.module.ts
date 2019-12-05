import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { VeterinarioComponent } from './veterinario.component';

const routes: Routes = [
  {
    path: '',
    component: VeterinarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VeterinarioRoutingModule { }