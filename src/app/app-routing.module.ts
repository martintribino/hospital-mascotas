import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RoleGuard } from './auth/role.guard';


export const routes: Routes = [
  {
    path: 'edit-perfil',
    loadChildren: () => import("./pages/edit-perfil/edit-perfil.module").then(mod => mod.EditPerfilModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['administrador', 'duenio', 'veterinario']
    }
  },
  {
    path: 'edit-user',
    loadChildren: () => import("./pages/edit-user/edit-user.module").then(mod => mod.EditUserModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['administrador', 'duenio', 'veterinario']
    }
  },
  {
    path: 'mascotas',
    loadChildren: () => import("./pages/mascotas/mascotas.module").then(mod => mod.MascotasModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['duenio', 'veterinario']
    }
  },
  {
    path: 'create-mascota',
    loadChildren: () => import("./pages/create-mascota/create-mascota.module").then(mod => mod.CreateMascotaModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['duenio']
    }
  },
  { path: 'services', loadChildren: () => import("./pages/services/services.module").then(mod => mod.ServicesModule) },
  { path: 'contact', loadChildren: () => import("./pages/contact/contact.module").then(mod => mod.ContactModule) },
  { path: 'home', loadChildren: () => import("./pages/home/home.module").then(mod => mod.HomeModule) },
  { path: 'signup', loadChildren: () => import("./pages/signup/signup.module").then(mod => mod.SignupModule) },
  { path: 'login', loadChildren: () => import("./pages/login/login.module").then(mod => mod.LoginModule) },
  { path: 'logout', loadChildren: () => import("./pages/logout/logout.module").then(mod => mod.LogoutModule) },
  { path: 'loading-page', loadChildren: () => import("./pages/loading-page/loading-page.module").then(mod => mod.LoadingPageModule) },
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
