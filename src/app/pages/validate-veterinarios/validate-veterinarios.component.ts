import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProfile, IDictionary, IPaginatorEv } from 'src/app/interfaces/interfaces.model';
import { VeterinarioService } from 'src/app/auth/veterinario.service';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { PerfilService } from 'src/app/auth/perfil.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-validate-veterinarios',
  templateUrl: './validate-veterinarios.component.html',
  styleUrls: ['./validate-veterinarios.component.styl'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('veterinarioFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),
      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(700)
      ]),
      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class ValidateVeterinariosComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private vetSubject = new BehaviorSubject<Array<IProfile>>([]);
  public veterinarios = this.vetSubject.asObservable();
  obs: Observable<any>;
  dataSource: MatTableDataSource<IProfile>;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2, 5, 10, 25];
  loadingDict: Array<IDictionary<boolean>>;
  borradoDict: Array<IDictionary<boolean>>;

  constructor(
    private vetService: VeterinarioService,
    private perfilService: PerfilService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.vetSubject.next([]);
    this.loadingDict = [];
    this.borradoDict = [];
    this.dataSource = new MatTableDataSource<IProfile>([]);
  }

  ngOnInit() {
    this.vetService.getVeterinariosXValidacion(false).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  openSnackBar(messageParam: string, actionParam: string, durationParam: number) {
    this.snackBar.open(messageParam, actionParam, {
      duration: durationParam,
    });
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
    let nombreUsuario: string = profile.usuario.nombreUsuario || "";
    if (nombreUsuario == "")
      return;
    this.loadingDict[nombreUsuario] = true;
    this.perfilService.borrarPerfil(nombreUsuario).subscribe(
      () => this.handleSuccessVet(nombreUsuario, "--- veterinario eliminado ---"),
      () => this.handleErrorVet(nombreUsuario, "--- veterinario no eliminado ---")
    );
  }

  validarPerfil(profile: IProfile) {
    let nombreUsuario: string = profile.usuario.nombreUsuario || "";
    if (nombreUsuario == "")
      return;
    this.loadingDict[nombreUsuario] = true;
    this.perfilService.validarPerfil(nombreUsuario).subscribe(
      () => this.handleSuccessVet(nombreUsuario, "--- veterinario validado ---"),
      () => this.handleErrorVet(nombreUsuario, "--- veterinario no validado ---")
    );
  }

  handleSuccessVet(nombreUsuario: string, logMessage: string) {
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
      previousPageIndex: 0
    };
    this.handlePage(pgntr);
    console.log(logMessage);
  }

  handleErrorVet(nombreUsuario: string, logMessage: string) {
    this.openSnackBar(
      "No se pudo validar el veterinario: " + nombreUsuario,
      "",
      2000)
    this.loadingDict[nombreUsuario] = false;
    console.log(logMessage);
  }

}