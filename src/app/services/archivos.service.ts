import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { IMascota, IImagen } from '../interfaces/interfaces.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "multipart/form-data");
  }

  cargarImagen(mascota: IMascota): Observable<IImagen> {
    let url = `${this.endpoints.archivos}${mascota.slug}/${mascota.imagen}/`,
      options = {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json"),
      };
    return this.http.get<IImagen>(url, options);
  }

  guardarImagen(form: FormData) {
    let url = `${this.endpoints.archivos}guardar/`,
      options = {
        //headers: this.headers,
      };
    return this.http.post(url, form, options);
  }

}
