import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMascota, IMascotaBody } from '../interfaces/interfaces.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "application/json");
  }

  getMascotas() {
    let url = this.endpoints.mascotas,
      options = {
        headers: this.headers,
      };
    return this.http.get<IMascota>(url, options);
  }

  getMascotasPorDuenio(username: string) {
    let url = this.endpoints.mascotasDuenio + "?username=" + username,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IMascota>>(url, options);
  }

  crearMascota(masc: IMascotaBody) {
    let url = this.endpoints.mascota,
      options = {
        headers: this.headers,
      };
    return this.http.post<IMascota>(url, masc, options);
  }
}
