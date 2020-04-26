import { Component, OnInit } from "@angular/core";

import { AvatarTipo, IAvatarBody } from "src/app/interfaces/interfaces.model";
import { AuthenticationService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material";

@Component({
  selector: "app-edit-avatar",
  templateUrl: "./edit-avatar.component.html",
  styleUrls: ["./edit-avatar.component.styl"],
})
export class EditAvatarComponent implements OnInit {
  imagenSeleccionada: string;
  avatars: Array<string>;
  isSubmiting: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    let usu = this.authService.getUsuario();
    this.isSubmiting = false;
    this.avatars = Object.keys(AvatarTipo);
    this.imagenSeleccionada =
      usu != null && this.avatars.includes(usu.imagen) ? usu.imagen : null;
  }

  ngOnInit() {}

  private isDisabled(): boolean {
    let usu = this.authService.getUsuario();
    return (
      this.imagenSeleccionada == null || this.imagenSeleccionada == usu.imagen
    );
  }

  private onClick() {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      this.isSubmiting = true;
      let avatarBody: IAvatarBody = {
        nombreUsuario: usu.nombreUsuario,
        imagen: this.imagenSeleccionada,
      };
      this.authService.guardarAvatar(avatarBody).subscribe(
        (data) => this.onSuccess(data),
        (error) => this.handleError()
      );
    } else {
      this.authService.logout();
      this.router.navigate(["/login"], { queryParams: {} });
    }
  }

  private onSuccess(data: IAvatarBody) {
    let jwtoken = JSON.parse(localStorage.getItem("jwtuser"));
    jwtoken.imagen = data.imagen;
    localStorage.setItem("jwtuser", JSON.stringify(jwtoken));
    this.authService.setUsuario(jwtoken);
    this.isSubmiting = false;
    this.showError("Su avatar ha sido actualizado", "success");
  }

  private handleError() {
    this.isSubmiting = false;
    this.showError("Su avatar no ha podido ser actualizado", "error");
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
