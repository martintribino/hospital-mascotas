import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ILoginBody, IUser } from 'src/app/interfaces/interfaces.model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { share } from 'rxjs/internal/operators/share';

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
    this.redirecting = false;
    let loginBody: ILoginBody = {
      "nombreUsuario": this.loginF.nombreUsuario.value,
      "clave": this.loginF.clave.value
    };
    this.authService.login(loginBody)
      .subscribe(
        (data: IUser) => this.onSuccess(data),
        (error: HttpErrorResponse) => this.handleError(error),
        () => this.handleCompleted()
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
        () => { this.revert(); this.redirecting = false; }
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
    this.isSubmiting = false;
    this.revert();
  }

  handleCompleted() {
    this.isSubmiting = false;
    this.redirecting = false;
  }

  revert() {
    this.loginForm.reset();
  }

  get loginF() {
    return this.loginForm.controls;
  }

}
