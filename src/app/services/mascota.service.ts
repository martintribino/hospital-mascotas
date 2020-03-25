import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMascota, IMascotaBody, IFicha, IImagen } from '../interfaces/interfaces.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';

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

  getMascotas(): Observable<IMascota> {
    let url = this.endpoints.mascotas,
      options = {
        headers: this.headers,
      };
    return this.http.get<IMascota>(url, options);
  }

  getMascotasFiltro(filtro: string): Observable<IMascota> {
    let url = `${this.endpoints.mascotas}?filtro=${filtro}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IMascota>(url, options);
  }

  getMascotasPorUsuario(username: string): Observable<Array<IMascota>> {
    let url = `${this.endpoints.mascotasUsuario}?username=${username}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IMascota>>(url, options);
  }

  getMascotasPorUsuarioCrit(username: string, criteria: string, search: string): Observable<Array<IMascota>> {
    let url = `${this.endpoints.mascotasUsuario}?user=${username}&crit=${criteria}&srch=${search}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IMascota>>(url, options);
  }

  getMascotasPorUsuarioFiltro(
    username: string,
    filter: string,
    sort: string,
    index: number,
    size: number
  ): Observable<Array<IMascota>> {
    let queryStr: string =
      `?username=${username}&campo=${filter}&sort=${sort}&index=${index}&size=${size}`,
      url = this.endpoints.mascotasUsuario + queryStr,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IMascota>>(url, options);
  }

  getQRCode(slug: String): Observable<IImagen> {
    let queryStr = `?slg=${slug}`,
      url = this.endpoints.qr + queryStr,
      options = {
        headers: this.headers,
      };
    return this.http.get<IImagen>(url, options);
  }

  crearMascota(masc: IMascotaBody): Observable<IMascota> {
    let url = this.endpoints.mascota,
      options = {
        headers: this.headers,
      };
    return this.http.post<IMascota>(url, masc, options);
  }

  editarMascota(masc: IMascotaBody): Observable<IMascota> {
    let url = this.endpoints.mascota,
      options = {
        headers: this.headers,
      };
    return this.http.put<IMascota>(url, masc, options);
  }

  borrarMascota(username: string, mascSlug: string): Observable<IMascota> {
    let queryStr = `?username=${username}&slg=${mascSlug}`,
      url = this.endpoints.mascota + queryStr,
      options = {
        headers: this.headers,
      };
    return this.http.delete<IMascota>(url, options);
  }

  solicitudMascota(username: string, mascSlug: string, vetUsername: string): Observable<IMascota> {
    let queryStr = `?username=${username}&slg=${mascSlug}&vusername=${vetUsername}`,
      url = this.endpoints.solicitud + queryStr,
      options = {
        headers: this.headers,
      };
    return this.http.post<IMascota>(url, options);
  }

  editarFichaPublica(ficha: IFicha): Observable<IFicha> {
    let url = this.endpoints.ficha,
      options = {
        headers: this.headers,
      };
    return this.http.put<IFicha>(url, ficha, options);
  }
}
