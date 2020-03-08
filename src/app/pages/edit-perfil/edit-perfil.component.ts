import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IUser, IProfile, IEditarPerfil } from 'src/app/interfaces/interfaces.model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { isEqual, isVeterinario } from 'src/helpers/functions';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.styl']
})
export class EditPerfilComponent implements OnInit {

  private perfilSubject = new BehaviorSubject<IProfile>(null);
  perfil = this.perfilSubject.asObservable();
  perfilInicial: IProfile;
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

  constructor(
    private authService: AuthenticationService,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar
  ) {
    this.isSubmiting = false;
    this.errorResponse = "";
    this.successResponse = "";
    this.perfilInicial = null;
    this.perfilSubject.next(null);
    this.usuario = this.authService.getUsuario();
    this.perfilService.obtenerPerfil(this.usuario.nombreUsuario)
      .subscribe(
        (data: IProfile) => {
          this.perfilSubject.next(data);
          this.perfilInicial = data;
          this.perfilForm = new FormGroup({
            nombre: new FormControl(data.nombre),
            apellido: new FormControl(data.apellido),
            email: new FormControl(data.email),
            documento: new FormControl(data.dni),
            telefono: new FormControl(data.telefono),
            domicilio: new FormControl(data.domicilio),
            nombreClinica: new FormControl(data.nombreClinica),
            domicilioClinica: new FormControl(data.domicilioClinica),
            validado: new FormControl(data.validado),
          });
        },
        (error: HttpErrorResponse) => {
          this.perfilSubject.next(null);
        }
      );
  }

  ngOnInit() {
  }

  private onSubmit(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.isSubmiting = true;
    let loginBody: IEditarPerfil = {
      "nombre": this.editarPerfilF.nombre.value,
      "apellido": this.editarPerfilF.apellido.value,
      "email": this.editarPerfilF.email.value,
      "dni": this.editarPerfilF.documento.value,
      "telefono": this.editarPerfilF.telefono.value,
      "domicilio": this.editarPerfilF.domicilio.value,
      "nombre_clinica": this.editarPerfilF.nombreClinica.value,
      "domicilio_clinica": this.editarPerfilF.domicilioClinica.value,
    };
    this.perfilService.editarPerfil(this.usuario.nombreUsuario, loginBody)
      .subscribe(
        (data: IProfile) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  private onSuccess(perfil: IProfile) {
    this.showError("Actualización exitosa.", "success");
    this.isSubmiting = false;
    this.perfilSubject.next(perfil);
    this.perfilInicial = perfil;
  }

  private handleError(error: HttpErrorResponse) {
    this.showError("Datos incorrectos. Por favor, intente nuevamente", "error");
    this.isSubmiting = false;
    this.perfilSubject.next(null);
    this.perfilInicial = null;
  }

  private clean() {
    this.perfilForm.reset();
    Object.keys(this.perfilForm.controls).forEach(key => {
      this.perfilForm.get(key).setErrors(null);
    });
  }

  get editarPerfilF() {
    return this.perfilForm.controls;
  }

  private isDisabled(): boolean {
    return this.isSubmiting || (
      isEqual(this.perfilInicial.nombre, this.editarPerfilF.nombre.value) &&
      isEqual(this.perfilInicial.apellido, this.editarPerfilF.apellido.value) &&
      isEqual(this.perfilInicial.email, this.editarPerfilF.email.value) &&
      isEqual(this.perfilInicial.dni, this.editarPerfilF.documento.value) &&
      isEqual(this.perfilInicial.telefono, this.editarPerfilF.telefono.value) &&
      isEqual(this.perfilInicial.domicilio, this.editarPerfilF.domicilio.value) &&
      isEqual(this.perfilInicial.nombreClinica, this.editarPerfilF.nombreClinica.value) &&
      isEqual(this.perfilInicial.domicilioClinica, this.editarPerfilF.domicilioClinica.value)
    );
  }

  private isVeterinario(): boolean {
    return isVeterinario(this.usuario);
  }

  private showError(strError: string, clase: string = "", time: number = 2000, pos: MatSnackBarVerticalPosition = "top") {
    this.snackBar.open(
      strError,
      "",
      {
        duration: time,
        verticalPosition: pos,
        panelClass: clase
      }
    );
  }

}
