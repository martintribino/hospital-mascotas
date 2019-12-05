import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: ':sara',
        component: ProfileComponent
      },
      {
        path: 'sarasa',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }