import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginBody } from 'src/app/interfaces/interfaces.model';
import { Config } from 'protractor';
import { AuthService } from 'src/app/rest/auth.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})

@Injectable()
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });
  errorResponse: string;
  successResponse: string;
  redirecting: boolean;
  isSubmiting: boolean;
  baseApiUrl = environment.baseApiUrl;

  constructor(private authService: AuthService) {
    this.isSubmiting = false;
    this.loginForm = new FormGroup({
      nombreUsuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
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
        observe: 'response'
      };
    let response = this.authService.login(url, loginBody, options)
      .subscribe(
        (data: Response) => this.onSuccess(data),
        (error: any) => this.handleError(error),
        () => this.onComplete()
      );
    //this.loginForm.reset();
  }

  onSuccess(result: Response) {
    console.log(result);
    this.authService.setSession(result);
    this.errorResponse = "";
    this.successResponse = "Autenticación correcta. Redirigiendo...";
    this.redirecting = true;
  }

  handleError(error: any) {
    console.log(error);
    this.successResponse = "";
    switch (error.status) {
      case 404:
      case 401:
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

  onComplete() {
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
