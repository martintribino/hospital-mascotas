import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { IMascota } from '../interfaces/interfaces.model';

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
    return this.http.get<Array<IMascota>>(url, options);
  }
}
