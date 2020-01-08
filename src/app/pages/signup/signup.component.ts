import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PasswordValidation } from './password.validator';
import { IProfile, ISignup } from 'src/app/interfaces/interfaces.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/auth/perfil.service';

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
  errorResponse: string;
  successResponse: string;
  redirecting: boolean;
  isSubmiting: boolean;
  roles: Array<{ clave: string, valor: string }>;

  constructor(private perfilService: PerfilService, private router: Router) {
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
    this.errorResponse = "";
    this.successResponse = "";
    this.redirecting = false;
    this.roles = [
      { clave: 'duenio', valor: 'Dueño' },
      { clave: 'veterinario', valor: 'Veterinario' },
      { clave: 'administrador', valor: 'Administrador' },
    ];
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
    this.errorResponse = "";
    this.successResponse = "Creacion de usuario correcta. Redirigiendo al login...";
    this.redirecting = true;
    this.router.navigate(['/login'], { queryParams: {} });
  }

  handleError(error: HttpErrorResponse) {
    this.errorResponse = "No se pudo crear el usuario. Por favor intentelo de nuevo mas tarde.";
    this.successResponse = "";
    this.redirecting = false;
  }

  handleCompleted() {
    this.isSubmiting = false;
  }

  revert() {
    this.redirecting = false;
    this.signupForm.reset();
  }

  get signupF() {
    return this.signupForm.controls;
  }

}
