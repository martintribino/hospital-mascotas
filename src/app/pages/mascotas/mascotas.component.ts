import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { IMascota } from 'src/app/interfaces/interfaces.model';
import { MascotaService } from 'src/app/auth/mascota.service';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.styl']
})
export class MascotasComponent implements OnInit {

  private mascSubject = new BehaviorSubject<Array<IMascota>>([]);
  public mascotas = this.mascSubject.asObservable();

  constructor(
    private authService: AuthenticationService,
    private mascService: MascotaService,
    private router: Router
  ) {
    this.mascSubject.next([]);
  }

  ngOnInit() {
    let usu = this.authService.getUsuario();
    if (usu != null)
      this.mascService.getMascotasPorDuenio(usu.nombreUsuario).subscribe(
        (data: Array<IMascota>) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  onSuccess(masc: Array<IMascota>) {
    this.mascSubject.next(masc);
  }

  handleError(error: HttpErrorResponse) {
    this.mascSubject.next([]);
  }

}
