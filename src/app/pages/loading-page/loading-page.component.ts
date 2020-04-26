import { Component, OnInit, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PerfilService } from "src/app/services/perfil.service";
import { IProfile } from "src/app/interfaces/interfaces.model";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/auth.service";

@Component({
  selector: "app-loading-page",
  templateUrl: "./loading-page.component.html",
  styleUrls: ["./loading-page.component.styl"],
})
@Injectable()
export class LoadingPageComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.getUsuario() != null)
      this.perfilService
        .obtenerPerfil(this.authService.getUsuario().nombreUsuario)
        .subscribe(
          (data: IProfile) => this.onSuccess(data),
          (error: HttpErrorResponse) => this.handleError(error)
        );
  }

  onSuccess(perfil: IProfile) {
    this.perfilService.setPerfil(perfil);
    this.router.navigate(["/home"], { queryParams: {} });
  }

  handleError(error: HttpErrorResponse) {
    this.authService.logout();
    this.router.navigate(["/login"], { queryParams: {} });
  }
}
