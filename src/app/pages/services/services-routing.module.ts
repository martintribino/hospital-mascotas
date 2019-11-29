import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ServicesRoutingModule { }