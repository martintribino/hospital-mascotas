import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let allowedRoles: string[] = route.data.allowedRoles,
      usu = this.auth.getUsuario();
    if (
      this.auth.isLoggedIn &&
      usu != null
    ) {
      if (allowedRoles.includes(usu.role)) {
        return true;
      } else {
        this.router.navigate(['not-allowed']);
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
