import { Injectable } from '@angular/core';
import { ILoginBody, IUser, IProfile, IJWToken } from '../interfaces/interfaces.model';
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
      jwtoken = localStorage.getItem('jwtoken'),
      decodedToken = this.helper.decodeToken(jwtoken);
    try {
      usu = {
        nombreUsuario: decodedToken.nombre_usuario,
        role: decodedToken.role,
        imagen: decodedToken.imagen
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
    return this.http.post<Response>(url, body, options);
  }

  getPerfil(options: Object) {
    let url = this.baseApiUrl + '/auth/perfil';
    return this.http.get<IProfile>(url, options);
  }

  getUsuario(options: Object) {
    let url = this.baseApiUrl + `/auth/usuario`;
    return this.http.get<IUser>(url, options);
  }

  setSession(authResult: Response) {
    if (authResult == null || authResult.headers == null)
      return;
    let jwtokenHeader = authResult.headers.get("X-JWToken");
    if (jwtokenHeader == undefined)
      return;
    localStorage.setItem('jwtoken', jwtokenHeader);
    console.log("--- Log in ---");
  }

  logout() {
    this.updateLoggedInState(false);
    localStorage.removeItem("jwtoken");
    console.log("--- Log out ---");
  }

  updateLoggedInState(status: boolean) {
    this.authSubject.next(status);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn;
  }

  public isExpired(): boolean {
    let jwtoken = localStorage.getItem('jwtoken');
    return this.helper.isTokenExpired(jwtoken);
  }

}
