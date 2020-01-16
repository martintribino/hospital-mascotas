import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SolicitudesComponent } from './solicitudes.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SolicitudesRoutingModule { }