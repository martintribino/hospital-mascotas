import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PasswordValidation } from '../../../helpers/password.validator';
import { IProfile, ISignup } from 'src/app/interfaces/interfaces.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/auth.service';
import { isAdministrador } from 'src/helpers/functions';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.styl']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    documento: new FormControl(''),
    telefono: new FormControl(''),
    nombreUsuario: new FormControl(''),
    role: new FormControl(''),
    clave: new FormControl(''),
    repetirClave: new FormControl(''),
    email: new FormControl(''),
    domicilio: new FormControl(''),
    imagen: new FormControl(''),
    nombreClinica: new FormControl(''),
    domicilioClinica: new FormControl(''),
    validado: new FormControl(''),
  });
  redirecting: boolean;
  isSubmiting: boolean;
  roles: Array<{ clave: string, valor: string }>;

  constructor(
    private authService: AuthenticationService,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.isSubmiting = false;
    this.signupForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      documento: new FormControl(''),
      telefono: new FormControl(''),
      nombreUsuario: new FormControl(''),
      role: new FormControl(''),
      clave: new FormControl(''),
      confirmarClave: new FormControl(''),
      email: new FormControl(''),
      domicilio: new FormControl(''),
      imagen: new FormControl(''),
      nombreClinica: new FormControl(''),
      domicilioClinica: new FormControl(''),
      validado: new FormControl(''),
    }, PasswordValidation.MatchPassword);
    this.redirecting = false;
    this.roles = [
      { clave: 'duenio', valor: 'Dueño' },
      { clave: 'veterinario', valor: 'Veterinario' },
    ];
    if (this.isAdministrador()) {
      this.roles.push({ clave: 'administrador', valor: 'Administrador' });
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmiting = true;
    this.redirecting = false;
    let loginBody: ISignup = {
      "nombre": this.signupF.nombre.value,
      "apellido": this.signupF.apellido.value,
      "role": this.signupF.role.value,
      "nombreUsuario": this.signupF.nombreUsuario.value,
      "clave": this.signupF.clave.value,
      "confirmarClave": this.signupF.confirmarClave.value,
      "email": this.signupF.email.value,
      "dni": this.signupF.documento.value,
      "telefono": this.signupF.telefono.value,
    };
    this.perfilService.signup(loginBody)
      .subscribe(
        (data: IProfile) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error),
        () => this.handleCompleted()
      );
  }

  onSuccess(data: IProfile) {
    this.showError("Creación de usuario exitosa. Redirigiendo al login...", "success");
    this.redirecting = true;
    this.router.navigate(['/login'], { queryParams: {} });
  }

  handleError(error: HttpErrorResponse) {
    this.showError("Datos incorrectos. Por favor, intente nuevamente", "error");
    this.redirecting = false;
    this.isSubmiting = false;
  }

  handleCompleted() {
    this.isSubmiting = false;
  }

  revert() {
    this.signupForm.reset();
  }

  get signupF() {
    return this.signupForm.controls;
  }

  isAdministrador(): boolean {
    let usu = this.authService.getUsuario();
    return usu != null && usu.role == Usuario.adminRole;
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
