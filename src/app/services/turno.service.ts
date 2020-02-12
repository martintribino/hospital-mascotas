import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment.prod';
import { IHorario } from '../interfaces/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  horarios(fecha: Date): Observable<IHorario> {
    let url = `${this.endpoints.turno}horarios?fecha=${fecha.toISOString().substring(0, 10)}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IHorario>(url, options);
  }

}
