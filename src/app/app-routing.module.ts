import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
  { path: 'profile', loadChildren: () => import("./pages/profile/profile.module").then(mod => mod.ProfileModule) },
  { path: 'services', loadChildren: () => import("./pages/services/services.module").then(mod => mod.ServicesModule) },
  { path: 'contact', loadChildren: () => import("./pages/contact/contact.module").then(mod => mod.ContactModule) },
  { path: 'home', loadChildren: () => import("./pages/home/home.module").then(mod => mod.HomeModule) },
  { path: 'signup', loadChildren: () => import("./pages/signup/signup.module").then(mod => mod.SignupModule) },
  { path: 'login', loadChildren: () => import("./pages/login/login.module").then(mod => mod.LoginModule) },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', loadChildren: () => import("./pages/home/home.module").then(mod => mod.HomeModule) },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
