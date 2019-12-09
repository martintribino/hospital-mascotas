import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MascotasComponent } from './mascotas.component';

const routes: Routes = [
  {
    path: '',
    component: MascotasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MascotasRoutingModule { }