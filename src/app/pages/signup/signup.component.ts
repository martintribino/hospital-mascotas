import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PasswordValidation } from './password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.styl']
})

export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    dni: new FormControl(''),
    telefono: new FormControl(''),
    nombreUsuario: new FormControl(''),
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

  constructor() {
    this.isSubmiting = false;
    this.signupForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      documento: new FormControl(''),
      telefono: new FormControl(''),
      nombreUsuario: new FormControl(''),
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
  }

  ngOnInit() {
  }

  revert() {
    this.redirecting = false;
    this.signupForm.reset();
  }

  get signupF() {
    return this.signupForm.controls;
  }

}
