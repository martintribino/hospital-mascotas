import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { IEvento, ITurno } from '../interfaces/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "application/json");
  }

  crearEvento(evento: IEvento): Observable<IEvento> {
    let url = this.endpoints.evento,
      options = {
        headers: this.headers,
      };
    return this.http.post<IEvento>(url, evento, options);
  }

}
