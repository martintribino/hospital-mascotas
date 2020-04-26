import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  IProfile,
  IDictionary,
  IPaginatorEv,
} from "src/app/interfaces/interfaces.model";
import { VeterinarioService } from "src/app/services/veterinario.service";
import {
  MatPaginator,
  MatTableDataSource,
  MatSnackBar,
  MatCheckboxChange,
} from "@angular/material";
import { PerfilService } from "src/app/services/perfil.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { AuthenticationService } from "src/app/services/auth.service";

@Component({
  selector: "app-validate-veterinarios",
  templateUrl: "./validate-veterinarios.component.html",
  styleUrls: ["./validate-veterinarios.component.styl"],
  animations: [
    trigger("veterinarioFadeAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(700)]),
      transition(":leave", animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class ValidateVeterinariosComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private vetSubject = new BehaviorSubject<Array<IProfile>>([]);
  public veterinarios = this.vetSubject.asObservable();
  obs: Observable<any>;
  dataSource: MatTableDataSource<IProfile>;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 25, 50];
  loadingDict: Array<IDictionary<boolean>>;
  checked: boolean;

  constructor(
    private auth: AuthenticationService,
    private vetService: VeterinarioService,
    private perfilService: PerfilService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.vetSubject.next([]);
    this.loadingDict = [];
    this.dataSource = new MatTableDataSource<IProfile>([]);
    this.checked = false;
  }

  ngOnInit() {
    this.vetService.getVeterinariosXValidacion(this.checked).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  public handlePage(e: IPaginatorEv) {
    const end = (e.pageIndex + 1) * e.pageSize;
    const start = e.pageIndex * e.pageSize;
    const part = this.vetSubject.value.slice(start, end);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.dataSource.data = part;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  onSuccess(result: Array<IProfile>) {
    this.vetSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IProfile>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  handleError(error) {
    this.vetSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  borrarPerfil(profile: IProfile) {
    let nombreUsuario: string = profile.usuario.nombreUsuario || "",
      usu = this.auth.getUsuario();
    if (nombreUsuario == "" || !this.auth.isLoggedIn || usu == null) return;
    this.loadingDict[nombreUsuario] = true;
    this.perfilService.borrarPerfil(nombreUsuario, usu.nombreUsuario).subscribe(
      () =>
        this.handleSuccessVet(
          nombreUsuario,
          "--- veterinario eliminado ---",
          "Se eliminó el veterinario "
        ),
      () =>
        this.handleErrorVet(
          nombreUsuario,
          "--- veterinario no eliminado ---",
          "No se pudo eliminar el veterinario "
        )
    );
  }

  validarPerfil(profile: IProfile) {
    let nombreUsuario: string = profile.usuario.nombreUsuario || "",
      usu = this.auth.getUsuario();
    if (nombreUsuario == "" || !this.auth.isLoggedIn || usu == null) return;
    this.loadingDict[nombreUsuario] = true;
    this.perfilService
      .validarPerfil(nombreUsuario, usu.nombreUsuario)
      .subscribe(
        () =>
          this.handleSuccessVet(
            nombreUsuario,
            "--- veterinario validado ---",
            "Se validó el veterinario "
          ),
        () =>
          this.handleErrorVet(
            nombreUsuario,
            "--- veterinario no validado ---",
            "No se pudo validar el veterinario "
          )
      );
  }

  handleSuccessVet(
    nombreUsuario: string,
    logMessage: string,
    snackMessage: string
  ) {
    let result: Array<IProfile> = [];
    this.vetSubject.value.map((obj) => {
      let nomUsu = obj.usuario.nombreUsuario || null;
      if (nomUsu == null || nomUsu == nombreUsuario) {
        return null;
      } else {
        result.push(obj);
        return obj;
      }
    });
    this.vetSubject.next(result);
    let pgntr: IPaginatorEv = {
      length: result.length,
      pageIndex: 0,
      pageSize: this.pageSize,
      previousPageIndex: 0,
    };
    this.handlePage(pgntr);
    this.snackBar.open(snackMessage + nombreUsuario, "", {
      duration: 2000,
      verticalPosition: "top",
      panelClass: "success",
    });
    this.loadingDict[nombreUsuario] = false;
  }

  handleErrorVet(
    nombreUsuario: string,
    logMessage: string,
    snackMessage: string
  ) {
    this.snackBar.open(snackMessage + nombreUsuario, "", {
      duration: 2000,
      verticalPosition: "top",
      panelClass: "error",
    });
    this.loadingDict[nombreUsuario] = false;
  }

  onChange(event: MatCheckboxChange) {
    this.ngOnInit();
  }
}
