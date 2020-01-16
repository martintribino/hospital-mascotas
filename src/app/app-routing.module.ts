import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RoleGuard } from './auth/role.guard';
import { Usuario } from './model/usuario';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';


export const routes: Routes = [
  {
    path: 'validate-veterinarios',
    loadChildren: () => import("./pages/validate-veterinarios/validate-veterinarios.module").then(mod => mod.ValidateVeterinariosModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: [Usuario.adminRole]
    }
  },
  {
    path: 'edit-perfil',
    loadChildren: () => import("./pages/edit-perfil/edit-perfil.module").then(mod => mod.EditPerfilModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: Usuario.allowedUserRoles
    }
  },
  {
    path: 'edit-user',
    loadChildren: () => import("./pages/edit-user/edit-user.module").then(mod => mod.EditUserModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: Usuario.allowedUserRoles
    }
  },
  {
    path: 'mascotas',
    loadChildren: () => import("./pages/mascotas/mascotas.module").then(mod => mod.MascotasModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: [Usuario.duenioRole, Usuario.vetRole]
    }
  },
  {
    path: 'solicitudes',
    loadChildren: () => import("./pages/solicitudes/solicitudes.module").then(mod => mod.SolicitudesModule),
    canActivate: [RoleGuard],
    data: {
      allowedRoles: [Usuario.vetRole]
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
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
