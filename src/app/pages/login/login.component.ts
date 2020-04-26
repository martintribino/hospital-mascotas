import { Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { ILoginBody, IUser } from "src/app/interfaces/interfaces.model";
import { AuthenticationService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.styl"],
})
@Injectable()
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    nombreUsuario: new FormControl(""),
    clave: new FormControl(""),
  });
  redirecting: boolean;
  isSubmiting: boolean;

  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.isSubmiting = false;
    this.loginForm = new FormGroup({
      nombreUsuario: new FormControl(""),
      clave: new FormControl(""),
    });
    this.redirecting = false;
  }

  ngOnInit() {}

  onSubmit() {
    this.isSubmiting = true;
    this.redirecting = false;
    let loginBody: ILoginBody = {
      nombreUsuario: this.loginF.nombreUsuario.value,
      clave: this.loginF.clave.value,
    };
    this.authService.login(loginBody).subscribe(
      (data: IUser) => this.onSuccess(data),
      (error: HttpErrorResponse) => this.handleError(error),
      () => this.handleCompleted()
    );
  }

  onSuccess(result: IUser) {
    this.showError("Autenticación correcta. Redirigiendo...", "success");
    this.redirecting = true;
    this.authService.isLoggedIn.subscribe(
      () => {
        this.router.navigate(["/loading-page"], { queryParams: {} });
      },
      () => {
        this.revert();
        this.redirecting = false;
      }
    );
    this.authService.setSession(result);
    this.authService.setUsuarioByToken();
  }

  handleError(error: HttpErrorResponse) {
    this.showError("Datos incorrectos. Por favor, intente nuevamente", "error");
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

  private showError(
    strError: string,
    clase: string = "",
    time: number = 2000,
    pos: MatSnackBarVerticalPosition = "top"
  ) {
    this.snackBar.open(strError, "", {
      duration: time,
      verticalPosition: pos,
      panelClass: clase,
    });
  }
}
