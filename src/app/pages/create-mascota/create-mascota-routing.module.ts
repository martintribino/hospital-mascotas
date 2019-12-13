import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateMascotaComponent } from './create-mascota.component';

const routes: Routes = [
  {
    path: '',
    component: CreateMascotaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateMascotaRoutingModule { }