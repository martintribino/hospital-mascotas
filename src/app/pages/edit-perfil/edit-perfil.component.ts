import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IUser, IProfile, IEditarPerfil } from 'src/app/interfaces/interfaces.model';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { PerfilService } from 'src/app/auth/perfil.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.styl']
})
export class EditPerfilComponent implements OnInit {

  perfilForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    documento: new FormControl(''),
    telefono: new FormControl(''),
    domicilio: new FormControl(''),
    imagen: new FormControl(''),
    nombreClinica: new FormControl(''),
    domicilioClinica: new FormControl(''),
    validado: new FormControl(''),
  });
  errorResponse: string;
  successResponse: string;
  isSubmiting: boolean;
  usuario: IUser;
  perfil: IProfile;

  constructor(
    private authService: AuthenticationService,
    private perfilService: PerfilService,
    private router: Router
  ) {
    this.isSubmiting = false;
    this.perfilForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      documento: new FormControl(''),
      telefono: new FormControl(''),
      domicilio: new FormControl(''),
      imagen: new FormControl(''),
      nombreClinica: new FormControl(''),
      domicilioClinica: new FormControl(''),
      validado: new FormControl(''),
    });
    this.errorResponse = "";
    this.successResponse = "";
    this.usuario = this.authService.getUsuario();
    this.perfil = this.perfilService.getPerfil();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmiting = true;
    let loginBody: IEditarPerfil = {
      "nombre": this.editarPerfilF.nombre.value,
      "apellido": this.editarPerfilF.apellido.value,
      "email": this.editarPerfilF.email.value,
      "dni": this.editarPerfilF.documento.value,
      "telefono": this.editarPerfilF.telefono.value,
      "domicilio": this.editarPerfilF.domicilio.value,
      "imagen": this.editarPerfilF.imagen.value,
      "nombreClinica": this.editarPerfilF.nombreClinica.value,
      "domicilioClinica": this.editarPerfilF.domicilioClinica.value,
    };
    this.perfilService.editarPerfil(this.usuario.nombreUsuario, loginBody)
      .subscribe(
        (data: IProfile) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  onSuccess(perfil: IProfile) {
    this.errorResponse = "";
    this.successResponse = "Actualización correcta.";
    this.perfilService.setPerfil(perfil);
    this.perfil = perfil;
    this.clean();
  }

  handleError(error: HttpErrorResponse) {
    this.errorResponse = "No se ha podido actualizar. Por favor intente nuevamente.";
    this.successResponse = "";
    this.isSubmiting = false;
    if (error.status === 0 ||
      error.status === 401 ||
      error.status === 403
    ) {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }
    this.clean();
  }

  clean() {
    this.perfilForm.reset();
    Object.keys(this.perfilForm.controls).forEach(key => {
      this.perfilForm.get(key).setErrors(null);
    });
  }

  get editarPerfilF() {
    return this.perfilForm.controls;
  }

}
