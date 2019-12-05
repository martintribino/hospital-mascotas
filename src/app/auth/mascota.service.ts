import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMascota } from '../interfaces/interfaces.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private baseApiUrl: string;

  constructor(private http: HttpClient) {
    this.baseApiUrl = environment.baseApiUrl;
  }

  getMascotas(options: Object) {
    let url = this.baseApiUrl + '/mascotas';
    return this.http.get<IMascota>(url, options);
  }
}
