import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ILoginBody, IUser } from 'src/app/interfaces/interfaces.model';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

@Injectable()
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    nombreUsuario: new FormControl(''),
    clave: new FormControl(''),
  });
  errorResponse: string;
  successResponse: string;
  redirecting: boolean;
  isSubmiting: boolean;
  baseApiUrl = environment.baseApiUrl;

  constructor(
    private authService: AuthenticationService,
    private router: Router) {
    this.isSubmiting = false;
    this.loginForm = new FormGroup({
      nombreUsuario: new FormControl(''),
      clave: new FormControl(''),
    });
    this.errorResponse = "";
    this.successResponse = "";
    this.redirecting = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmiting = true;
    let url = this.baseApiUrl + '/login';
    let loginBody: ILoginBody = {
      "nombre_usuario": this.loginF.nombreUsuario.value,
      "clave": this.loginF.clave.value
    };
    this.redirecting = false;
    let headers = new HttpHeaders().set("Content-Type", "application/json"),
      options = {
        headers: headers,
        //observe: 'body',
        //responseType: 'json'
      };
    this.authService.login(url, loginBody, options)
      .subscribe(
        (data: IUser) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  onSuccess(result: IUser) {
    this.errorResponse = "";
    this.successResponse = "Autenticación correcta. Redirigiendo...";
    this.redirecting = true;
    this.authService.isLoggedIn
      .subscribe(
        () => {
          this.router.navigate(['/loading-page'], { queryParams: {} });
        },
        () => { this.revert() }
      );
    this.authService.setSession(result);
    this.authService.setUsuarioByToken();
  }

  handleError(error: HttpErrorResponse) {
    this.successResponse = "";
    switch (error.status) {
      case 401: {
        this.errorResponse = "No autorizado. Por favor, intente nuevamente.";
        break;
      }
      case 404:
      case 400: {
        this.errorResponse = "Autenticación incorrecta. Por favor, intente nuevamente.";
        break;
      }
      default: {
        this.errorResponse = "Error interno. Por favor, intente nuevamente";
        break;
      }
    }
    this.revert();
  }

  revert() {
    this.redirecting = false;
    this.loginForm.reset();
  }

  get loginF() {
    return this.loginForm.controls;
  }

}
