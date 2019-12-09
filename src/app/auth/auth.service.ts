import { Injectable } from '@angular/core';
import { ILoginBody, IUser, IProfile, ISignup } from '../interfaces/interfaces.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  baseApiUrl = environment.baseApiUrl;
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
    } catch (error) {
      usu = null;
      this.updateLoggedInState(false);
    }
    this.setUsuario(usu);
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

  login(body: ILoginBody) {
    let url: string = this.baseApiUrl + "/login/",
      options = {
        headers: this.headers,
        //observe: 'body',
        //responseType: 'json'
      };
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

  signup(body: ISignup) {
    console.log("--- Sign Up ---");
    console.log(body);
    let url: string = this.baseApiUrl + "/profile/",
      options = {
        headers: this.headers,
        //observe: 'body',
        //responseType: 'json'
      };
    return this.http.post<IProfile>(url, body, options);
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

}
