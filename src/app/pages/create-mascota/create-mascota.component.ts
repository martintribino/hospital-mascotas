import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IUser, IMascota, IMascotaBody } from 'src/app/interfaces/interfaces.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MascotaService } from 'src/app/auth/mascota.service';

@Component({
  selector: 'app-create-mascota',
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.styl']
})
export class CreateMascotaComponent implements OnInit {

  mascotasForm = new FormGroup({
    nombre: new FormControl(''),
    especie: new FormControl(''),
    raza: new FormControl(''),
    sexo: new FormControl(''),
    color: new FormControl(''),
    senias: new FormControl(''),
    fecha: new FormControl(''),
    imagen: new FormControl(''),
  });
  errorResponse: string;
  successResponse: string;
  isSubmiting: boolean;
  usuario: IUser;

  constructor(
    private authService: AuthenticationService,
    private mascService: MascotaService,
    private router: Router
  ) {
    this.mascotasForm = new FormGroup({
      nombre: new FormControl(''),
      especie: new FormControl(''),
      raza: new FormControl(''),
      sexo: new FormControl(''),
      color: new FormControl(''),
      senias: new FormControl(''),
      fecha: new FormControl(''),
      imagen: new FormControl(''),
    });
    this.isSubmiting = false;
    this.errorResponse = "";
    this.successResponse = "";
    this.usuario = this.authService.getUsuario();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmiting = true;
    let mascBody: IMascotaBody = {
      "nombre": this.crearMascF.nombre.value,
      "especie": this.crearMascF.especie.value,
      "raza": this.crearMascF.raza.value,
      "sexo": this.crearMascF.sexo.value,
      "color": this.crearMascF.color.value,
      "senias": this.crearMascF.senias.value,
      "fecha_nacimiento": this.crearMascF.fecha.value,
      "imagen": this.crearMascF.imagen.value,
      "username": this.authService.getUsuario().nombreUsuario
    };
    this.mascService.crearMascota(mascBody)
      .subscribe(
        (data: IMascota) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  onSuccess(masc: IMascota) {
    this.errorResponse = "";
    this.successResponse = "Se ha credado la mascota correctamente.";
    this.clean();
    this.router.navigate(['/mascotas'], { queryParams: {} });
  }

  handleError(error: HttpErrorResponse) {
    this.errorResponse = "No se ha podido crear la mascota. Por favor intente nuevamente.";
    this.successResponse = "";
    this.isSubmiting = false;
    /*if (error.status === 0 ||
      error.status === 401 ||
      error.status === 403
    ) {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }*/
    this.clean();
  }

  clean() {
    this.mascotasForm.reset();
    Object.keys(this.mascotasForm.controls).forEach(key => {
      this.mascotasForm.get(key).setErrors(null);
    });
  }

  get crearMascF() {
    return this.mascotasForm.controls;
  }

}
