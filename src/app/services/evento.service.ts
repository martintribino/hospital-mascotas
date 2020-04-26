import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import {
  IEvento,
  ITurno,
  IHorario,
  IEventoReqBody,
} from "../interfaces/interfaces.model";

@Injectable({
  providedIn: "root",
})
export class EventoService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set("Content-Type", "application/json");
  }

  crearEvento(evento: IEventoReqBody): Observable<IEvento> {
    this.headers = this.headers.set("evento", evento.evento.tipo);
    let url = this.endpoints.evento,
      options = {
        headers: this.headers,
      };
    return this.http.post<IEvento>(url, evento, options);
  }

  cancelarEvento(username: string, evSlug: string): Observable<IEvento> {
    let url = `${this.endpoints.evento}?username=${username}&slg=${evSlug}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<IEvento>(url, options);
  }

  horarios(fecha: Date): Observable<IHorario> {
    let url = `${this.endpoints.evento}?fecha=${fecha
        .toISOString()
        .substring(0, 10)}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IHorario>(url, options);
  }

  guardar(usrname: string, slg: string, evento: IEvento): Observable<IEvento> {
    let url = `${this.endpoints.evento}?username=${usrname}&slg=${slg}`,
      options = {
        headers: this.headers,
      };
    return this.http.post<IEvento>(url, evento, options);
  }
}
