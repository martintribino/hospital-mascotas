import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ILoginBody, IUser, IAvatarBody } from '../interfaces/interfaces.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private endpoints = environment.endpoints;
  private usuarioSubject = new BehaviorSubject<IUser>(null);
  public usuario = this.usuarioSubject.asObservable();
  private authSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.authSubject.asObservable();
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    this.unsetUsuario();
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
      this.setUsuario(usu);
    } catch (error) {
      usu = null;
      this.updateLoggedInState(false);
      this.unsetUsuario();
    }
  }

  setUsuario(usu: IUser) {
    this.usuarioSubject.next(usu);
  }

  getUsuario(): IUser {
    return this.usuarioSubject.getValue();
  }

  unsetUsuario() {
    this.usuarioSubject.next(null);
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
    console.log("--- Set Session ---");
  }

  logout() {
    localStorage.removeItem("jwtuser");
    this.updateLoggedInState(false);
    this.unsetUsuario();
    console.log("--- Log out ---");
  }

  updateLoggedInState(status: boolean) {
    this.authSubject.next(status);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn;
  }

  checkToken() {
    let url: string = this.endpoints.checkToken,
      options = {
        headers: this.headers,
      };
    return this.http.get<Response>(url, options);
  }

  login(body: ILoginBody): Observable<IUser> {
    let url: string = this.endpoints.login,
      options = {
        headers: this.headers
      };
    return this.http.post<IUser>(url, body, options);
  }

  guardarAvatar(body: IAvatarBody): Observable<IAvatarBody> {
    let url: string = this.endpoints.avatar,
      options = {
        headers: this.headers
      };
    return this.http.post<IAvatarBody>(url, body, options);
  }

}
