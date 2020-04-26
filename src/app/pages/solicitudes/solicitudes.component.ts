import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, BehaviorSubject } from "rxjs";
import {
  IDictionary,
  ISolicitud,
  Estado,
  ISolicitudBody,
  IImagen,
} from "src/app/interfaces/interfaces.model";
import {
  MatTableDataSource,
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material";
import { SolicitudService } from "src/app/services/solicitud.service";
import { AuthenticationService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ArchivosService } from "src/app/services/archivos.service";

@Component({
  selector: "app-solicitudes",
  templateUrl: "./solicitudes.component.html",
  styleUrls: ["./solicitudes.component.styl"],
  animations: [
    trigger("solicitudesFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(750)]),
      transition(":leave", animate(700, style({ opacity: 0 }))),
    ]),
  ],
})
export class SolicitudesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private solicitudSubject = new BehaviorSubject<Array<ISolicitud>>([]);
  public solicitudes = this.solicitudSubject.asObservable();
  obs: Observable<Array<ISolicitud>>;
  dataSource: MatTableDataSource<ISolicitud>;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 25, 50];
  loadingDict: Array<IDictionary<boolean>>;

  constructor(
    private archService: ArchivosService,
    private authService: AuthenticationService,
    private solService: SolicitudService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.solicitudSubject.next([]);
    this.loadingDict = [];
    this.dataSource = new MatTableDataSource<ISolicitud>([]);
  }

  ngOnInit() {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      this.solService
        .obtenerSolicitudesXUsuarioYEstado(usu.nombreUsuario, Estado.ESPERA)
        .subscribe(
          (data) => this.onSuccess(data),
          () => this.onError()
        );
    } else {
      this.authService.logout();
      this.router.navigate(["/login"], { queryParams: {} });
    }
  }

  onSuccess(result: Array<ISolicitud>) {
    result.map((sol) => {
      if (sol.mascota) {
        sol.mascota.path = "assets/images/pet_default_image.jpg";
        if (sol.mascota.imagen != null && sol.mascota.imagen.length > 0) {
          this.archService.cargarImagen(sol.mascota).subscribe(
            (data: IImagen) => {
              sol.mascota.path = `data:image/jpeg;base64,${data.b64str}`;
            },
            (error) => console.log(error)
          );
        }
      }
    });
    this.solicitudSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<ISolicitud>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onError() {
    this.solicitudSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  aceptarSolicitud(solicitud: ISolicitud) {
    this.modificarSolicitud(solicitud, Estado.APROBADO);
  }

  rechazarSolicitud(solicitud: ISolicitud) {
    this.modificarSolicitud(solicitud, Estado.RECHAZADO);
  }

  modificarSolicitud(solicitud: ISolicitud, estado: Estado) {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      this.loadingDict[solicitud.slug] = true;
      solicitud.estado = estado;
      let strMessage = "",
        solicitudBody: ISolicitudBody = {
          slug: solicitud.slug,
          fecha: solicitud.fecha,
          estado: estado,
          mascota: solicitud.mascota.slug,
          veterinario: solicitud.veterinario.usuario.nombreUsuario,
        };
      switch (solicitud.estado) {
        case Estado.APROBADO:
          strMessage = "aprobada";
          break;
        case Estado.ESPERA:
          strMessage = "en espera";
          break;
        case Estado.RECHAZADO:
          strMessage = "rechazada";
          break;
        default:
          strMessage = "en espera";
          break;
      }
      this.solService
        .modificarSolicitud(usu.nombreUsuario, solicitudBody)
        .subscribe(
          () =>
            this.solicitudSuccess(
              solicitud,
              `solicitud de mascota ${solicitud.mascota.nombre} ${strMessage}`
            ),
          () =>
            this.solicitudError(
              solicitud,
              `solicitud de mascota ${solicitud.mascota.nombre} no actualizada`
            )
        );
    } else {
      this.authService.logout();
      this.router.navigate(["/login"], { queryParams: {} });
    }
  }

  private solicitudSuccess(solicitud: ISolicitud, strSuccess: string) {
    this.showError(strSuccess, "success");
    this.loadingDict[solicitud.slug] = false;
    console.log(`---${strSuccess}---`);
    this.ngOnInit();
  }

  private solicitudError(solicitud: ISolicitud, strError: string) {
    this.showError(strError, "error");
    this.loadingDict[solicitud.slug] = false;
    console.log(`---${strError}---`);
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
