import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { IProfile } from '../interfaces/interfaces.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set("Content-Type", "application/json");
  }

  getVeterinariosXValidacion(validados: boolean): Observable<Array<IProfile>> {
    let url = this.endpoints.veterinariosValidados + "?validados=" + validados,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IProfile>>(url, options);
  }
}
