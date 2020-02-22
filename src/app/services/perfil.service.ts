import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { ILoginBody, IUser, ISignup, IProfile, IEditarPerfil } from '../interfaces/interfaces.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  endpoints = environment.endpoints;
  private headers: HttpHeaders;
  private perfilSubject = new BehaviorSubject<IProfile>(null);
  public perfil = this.perfilSubject.asObservable();

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "application/json");
  }

  editarUsuario(body: ILoginBody) {
    let url: string = this.endpoints.editarUsuario,
      options = {
        headers: this.headers,
      };
    return this.http.put<IUser>(url, body, options);
  }

  editarPerfil(username: string, body: IEditarPerfil) {
    let url: string = this.endpoints.perfil + "?username=" + username,
      options = {
        headers: this.headers,
      };
    return this.http.put<IProfile>(url, body, options);
  }

  obtenerPerfil(username: string) {
    let url: string = this.endpoints.perfil + "?username=" + username,
      options = {
        headers: this.headers,
      };
    return this.http.get<IProfile>(url, options);
  }

  setPerfil(perfil: IProfile) {
    this.perfilSubject.next(perfil);
  }

  getPerfil(): IProfile {
    return this.perfilSubject.getValue();
  }

  unsetPerfil() {
    this.perfilSubject.next(null);
  }

  borrarPerfil(username: string) {
    let owner: string = this.getPerfil().usuario.nombreUsuario || "",
      url: string = this.endpoints.perfil + "?username=" + username + "&owner=" + owner,
      options = {
        headers: this.headers,
      };
    return this.http.delete(url, options);
  }

  validarPerfil(username: string) {
    let owner: string = this.getPerfil().usuario.nombreUsuario || "",
      url: string = this.endpoints.perfil + "/validar?username=" + username + "&owner=" + owner,
      options = {
        headers: this.headers,
      };
    return this.http.put(url, options);
  }

  signup(body: ISignup) {
    let url: string = this.endpoints.addUsuario,
      options = {
        headers: this.headers,
      };
    return this.http.post<IProfile>(url, body, options);
  }

}
