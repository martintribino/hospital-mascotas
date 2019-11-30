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
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    nombreUsuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
    repetirClave: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    nombreClinica: new FormControl('', [Validators.required]),
    domicilioClinica: new FormControl('', [Validators.required]),
    validado: new FormControl('', [Validators.required]),
  });
  errorResponse: string;
  successResponse: string;
  redirecting: boolean;
  isSubmiting: boolean;

  constructor() {
    this.isSubmiting = false;
    this.signupForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required]),
      confirmarClave: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      domicilio: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      nombreClinica: new FormControl('', [Validators.required]),
      domicilioClinica: new FormControl('', [Validators.required]),
      validado: new FormControl('', [Validators.required]),
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
