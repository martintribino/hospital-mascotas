import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { PasswordValidation } from '../signup/password.validator';
import { PerfilService } from 'src/app/auth/perfil.service';
import { ILoginBody, IUser } from 'src/app/interfaces/interfaces.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.styl']
})
export class EditUserComponent implements OnInit {
  loginForm = new FormGroup({
    nombreUsuario: new FormControl(''),
    clave: new FormControl(''),
    confirmarClave: new FormControl(''),
  });
  errorResponse: string;
  successResponse: string;
  isSubmiting: boolean;
  usuario: IUser;

  constructor(
    private authService: AuthenticationService,
    private perfilService: PerfilService,
    private router: Router
  ) {
    this.isSubmiting = false;
    this.loginForm = new FormGroup({
      nombreUsuario: new FormControl(''),
      clave: new FormControl(''),
      confirmarClave: new FormControl(''),
    }, PasswordValidation.MatchPassword);
    this.errorResponse = "";
    this.successResponse = "";
    this.usuario = this.authService.getUsuario();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmiting = true;
    let loginBody: ILoginBody = {
      "nombreUsuario": this.loginF.nombreUsuario.value,
      "clave": this.loginF.clave.value,
      "confirmar_clave": this.loginF.confirmarClave.value,
      "nombreUsuarioViejo": this.usuario.nombreUsuario
    };
    this.perfilService.editarUsuario(loginBody)
      .subscribe(
        (data: IUser) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  onSuccess(user: IUser) {
    this.errorResponse = "";
    this.successResponse = "Actualización correcta.";
    this.authService.setSession(user);
    this.usuario = user;
    this.clean();
  }

  handleError(error: HttpErrorResponse) {
    this.errorResponse = "";
    this.successResponse = "";
    this.isSubmiting = false;
    this.clean();
  }

  clean() {
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key).setErrors(null);
    });
  }

  get loginF() {
    return this.loginForm.controls;
  }

}
