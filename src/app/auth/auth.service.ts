import { Injectable } from '@angular/core';
import { ILoginBody, IUser } from '../interfaces/interfaces.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  baseApiUrl = environment.baseApiUrl;
  private usuarioSubject = new ReplaySubject<IUser>(1);
  public usuario = this.usuarioSubject.asObservable();
  private authSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.authSubject.asObservable();
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    if (this.isExpired()) {
      this.logout();
    }
    this.updateLoggedInState(false);
    this.setUsuarioByToken();
  }

  setUsuarioByToken() {
    let usu: IUser,
      jwtoken = JSON.parse(localStorage.getItem('jwtuser'));
    try {
      usu = {
        nombreUsuario: jwtoken.nombreUsuario,
        role: jwtoken.role,
        imagen: jwtoken.imagen,
        token: jwtoken.token
      };
      this.updateLoggedInState(true);
    } catch (error) {
      usu = null;
      this.updateLoggedInState(false);
    }
    this.setUsuario(usu);
  }

  setUsuario(usu: IUser) {
    this.usuarioSubject.next(usu);
  }

  unsetUsuario() {
    this.usuarioSubject.next(null);
  }

  login(url: string, body: ILoginBody, options: Object) {
    return this.http.post<IUser>(url, body, options);
  }

  setSession(authResult: IUser) {
    if (authResult == null)
      return;
    let jwtokenHeader = authResult.token;
    if (jwtokenHeader == undefined)
      return;
    this.updateLoggedInState(true);
    localStorage.setItem('jwtuser', JSON.stringify(authResult));
    this.setUsuario(authResult);
    console.log("--- Log in ---");
  }

  logout() {
    this.updateLoggedInState(false);
    localStorage.removeItem("jwtuser");
    this.unsetUsuario();
    console.log("--- Log out ---");
  }

  updateLoggedInState(status: boolean) {
    this.authSubject.next(status);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn;
  }

  public isExpired(): boolean {
    let jwtoken = localStorage.getItem('jwtuser');
    return this.helper.isTokenExpired(jwtoken);
  }

}
