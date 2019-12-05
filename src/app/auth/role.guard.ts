import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';
import decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles: string[] = route.data.allowedRoles;
    const token = localStorage.getItem('jwtoken');
    const tokenPayload = decode(token);
    if (
      this.auth.isAuthenticated() &&
      allowedRoles.includes(tokenPayload.role)
    ) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
