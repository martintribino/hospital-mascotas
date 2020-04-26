import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { PasswordValidation } from "../../../helpers/password.validator";
import { PerfilService } from "src/app/services/perfil.service";
import { ILoginBody, IUser } from "src/app/interfaces/interfaces.model";
import { AuthenticationService } from "src/app/services/auth.service";
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { isEqual, isEmpty } from "src/helpers/functions";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.styl"],
})
export class EditUserComponent implements AfterViewInit {
  loginForm = new FormGroup({
    nombreUsuario: new FormControl(""),
    clave: new FormControl(""),
    confirmarClave: new FormControl(""),
  });
  isSubmiting: boolean;
  usuario: IUser;
  usuarioActual: IUser;
  @ViewChild("username", { static: false }) username: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar
  ) {
    this.isSubmiting = false;
    this.usuario = this.authService.getUsuario();
    this.usuarioActual = this.usuario;
    this.loginForm = new FormGroup(
      {
        nombreUsuario: new FormControl(this.usuario.nombreUsuario),
        clave: new FormControl(""),
        confirmarClave: new FormControl(""),
      },
      PasswordValidation.MatchPasswordIncEmpty
    );
    this.username.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }

  onSubmit() {
    this.isSubmiting = true;
    let loginBody: ILoginBody = {
      nombreUsuario: this.loginF.nombreUsuario.value,
      clave: this.loginF.clave.value,
      confirmar_clave: this.loginF.confirmarClave.value,
      nombre_usuario_viejo: this.usuario.nombreUsuario,
    };
    this.perfilService.editarUsuario(loginBody).subscribe(
      (data: IUser) => this.onSuccess(data),
      (error: HttpErrorResponse) => this.handleError(error)
    );
  }

  onSuccess(user: IUser) {
    this.showError("Actualiación exitosa.", "success");
    this.authService.setSession(user);
    this.usuario = user;
  }

  handleError(error: HttpErrorResponse) {
    this.showError("Datos incorrectos. Por favor, intente nuevamente", "error");
    this.username.nativeElement.focus();
    this.isSubmiting = false;
  }

  get loginF() {
    return this.loginForm.controls;
  }

  private isEmpty(value: FormControl): boolean {
    return isEmpty(value.value);
  }

  private isDisabled(): boolean {
    return (
      this.isSubmiting ||
      (isEqual(
        this.usuarioActual.nombreUsuario,
        this.loginF.nombreUsuario.value
      ) &&
        isEmpty(this.loginF.clave.value))
    );
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
