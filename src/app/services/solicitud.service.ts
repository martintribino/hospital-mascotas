import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { ISolicitud, ISolicitudBody, Estado } from '../interfaces/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  obtenerSolicitudesXUsuario(username: string) {
    let url: string = this.endpoints.solicitud + "?username=" + username,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<ISolicitud>>(url, options);
  }

  obtenerSolicitudesXUsuarioYEstado(username: string, estado: Estado) {
    let url: string = `${this.endpoints.solicitud}${estado}/?username=${username}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<ISolicitud>>(url, options);
  }

  modificarSolicitud(username: string, solicitud: ISolicitudBody) {
    let url: string = this.endpoints.solicitud + "?username=" + username,
      options = {
        headers: this.headers,
      };
    return this.http.put<ISolicitud>(url, solicitud, options);
  }
}
