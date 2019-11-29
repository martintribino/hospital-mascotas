import * as moment from "moment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginBody } from '../interfaces/interfaces.model';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  login(url: string, body: ILoginBody, options: Object) {
    return this.httpClient.post<Response>(url, body, options);
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.headers.expires, 'second');
    localStorage.setItem('jwtoken', authResult.headers.XJWToken);
    localStorage.setItem("expires", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("jwtoken");
    localStorage.removeItem("expires");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
