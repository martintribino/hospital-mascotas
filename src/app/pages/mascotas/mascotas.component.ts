import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog, MatSnackBarVerticalPosition } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { VeterinarioService } from 'src/app/services/veterinario.service';
import { IDictionary, IMascota, IPaginatorEv, IProfile, IMascotaBody, IFicha, IImagen } from 'src/app/interfaces/interfaces.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SubscriptionDialogComponent } from 'src/app/shared/subscription-dialog/subscription-dialog.component';
import { FormMascotaComponent } from 'src/app/shared/form-mascota/form-mascota.component';
import { Usuario } from 'src/app/model/usuario';
import { FormFichaComponent } from 'src/app/shared/form-ficha/form-ficha.component';
import { PerfilDialogComponent } from 'src/app/shared/perfil-dialog/perfil-dialog.component';
import { ImagenMascotaComponent } from 'src/app/shared/imagen-mascota/imagen-mascota.component';
import { environment } from 'src/environments/environment.prod';
import { ArchivosService } from 'src/app/services/archivos.service';
import { PetSearchComponent } from 'src/app/shared/pet-search/pet-search.component';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.styl'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ opacity: 0, height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ opacity: 1, height: '*' })),
      transition('expanded => collapsed', animate("300ms ease-out")),
      transition('collapsed => expanded', animate("150ms ease-out")),
    ]),
    trigger('loading', [
      state('hide', style({ opacity: 0, height: '0px', minHeight: '0', display: 'none' })),
      state('show', style({ opacity: 1, height: '*' })),
      transition('show => hide', animate("400ms ease-in")),
      transition('hide => show', animate("200ms ease-in")),
    ])
  ]
})
export class MascotasComponent implements AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(PetSearchComponent, { static: false }) searchForm: PetSearchComponent;

  endpoints = environment.endpoints;
  private veterinariosSubject = new BehaviorSubject<Array<IProfile>>([]);
  veterinarios = this.veterinariosSubject.asObservable();
  private mascTotalSubject = new BehaviorSubject<Array<IMascota>>([]);
  mascotas = this.mascTotalSubject.asObservable();
  private mascotasSubject = new BehaviorSubject<Array<IMascota>>([]);
  obs: Observable<any>;
  private dataSource: MatTableDataSource<IMascota>;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 25, 50];
  public loadingDict: Array<IDictionary<boolean>>;
  public displayedColumns: Array<string> =
    ["imagen", "nombre", "raza", "sexo", "actions"];
  public descColumns: Array<string> = ["descripcion"];
  public loadColumns: Array<string> = ["loading"];

  constructor(
    private authService: AuthenticationService,
    private mascService: MascotaService,
    private vetService: VeterinarioService,
    private archService: ArchivosService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.mascotasSubject.next([]);
    this.mascTotalSubject.next([]);
    this.veterinariosSubject.next([])
    this.loadingDict = [];
    this.dataSource = new MatTableDataSource<IMascota>([]);
  }

  ngAfterViewInit(): void {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      this.mascService.getMascotasPorUsuario(usu.nombreUsuario).subscribe(
        (data) => this.onSuccess(data),
        (error) => this.handleError(error)
      );
      this.vetService.getVeterinariosXValidacion(true).subscribe(
        (result) => { this.veterinariosSubject.next(result); },
        (error) => { this.veterinariosSubject.next([]); }
      );
    } else {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  onSuccess(result: Array<IMascota>) {
    result.map((masc) => {
      masc.open = false;
      masc.path = "assets/images/pet_default_image.jpg";
      this.loadingDict[masc.slug] = false;
    });
    this.changeDataSource(result);
    this.mascotasSubject.value.map((masc) => {
      if (masc.imagen != null && masc.imagen.length > 0) {
        this.archService.cargarImagen(masc).subscribe(
          (data: IImagen) => { masc.path = `data:image/jpeg;base64,${data.b64str}` },
          (error) => console.log(error)
        );
      }
    });
  }

  private changeDataSource(result: Array<IMascota>) {
    this.mascTotalSubject.next(result);
    this.mascotasSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IMascota>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  handleError(error) {
    this.mascTotalSubject.next([]);
    this.mascotasSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  public handlePage(e: IPaginatorEv) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  public onRowClick(mascota: IMascota) {
    mascota.open = !mascota.open;
  }

  public onSubscription(mascota: IMascota) {
    mascota.open = false;
    const dialogRef = this.dialog.open(SubscriptionDialogComponent, {
      data: this.veterinariosSubject.value
    });
    dialogRef.afterClosed().subscribe((result) => {
      let veterinario: IProfile = result,
        usu = this.authService.getUsuario();
      event.stopPropagation();
      event.preventDefault();
      if (veterinario != null && veterinario.usuario != null && usu != null) {
        let vusername = veterinario.usuario.nombreUsuario || null;
        this.loadingDict[mascota.slug] = true;
        this.mascService.solicitudMascota(usu.nombreUsuario, mascota.slug, vusername)
          .subscribe(
            () => this.mascotaSuccess(mascota, `Se ha enviado solicitud para ${veterinario.nombre} de ${mascota.nombre}`),
            (error) => {
              let strMessage: string = `No se ha podido solicitar el veterinario ${veterinario.nombre} para la mascota ${mascota.nombre}`;
              if (error.status == 409) {
                strMessage = `Ya existe una solicitud al veterinario ${veterinario.nombre} para la mascota ${mascota.nombre}`;
              }
              this.mascotaError(mascota, strMessage);
            }
          );
      }
    });
  }

  public onDelete(mascota: IMascota) {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      this.loadingDict[mascota.slug] = true;
      this.mascService.borrarMascota(usu.nombreUsuario, mascota.slug)
        .subscribe(
          () => {
            this.mascotaSuccess(mascota, `Se ha borrado la mascota ${mascota.nombre}`);
            this.ngAfterViewInit();
          },
          () => this.mascotaError(mascota, `No se ha podido borrar la mascota  ${mascota.nombre}`)
        );
    } else {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }
    mascota.open = false;
  }

  public onCreate() {
    let mascota: IMascota = {
      "slug": "", "nombre": "", "especie": "", "raza": "", "sexo": "", "color": "", "senias": "",
      "imagen": "", "duenio": null, "veterinario": null, "extraviada": false, "open": false
    };
    const dialogRef = this.dialog.open(FormMascotaComponent, {
      maxWidth: "100%", width: '550px',
      height: '80%', data: mascota
    });
    dialogRef.afterClosed().subscribe((result) => {
      let masc: IMascota = result,
        usu = this.authService.getUsuario();
      if (masc != null && usu != null) {
        let mascBody: IMascotaBody = {
          "slug": masc.slug, "nombre": masc.nombre, "especie": masc.especie, "raza": masc.raza,
          "sexo": masc.sexo, "color": masc.color, "senias": masc.senias, "extraviada": masc.extraviada,
          "fechaNacimiento": masc.fechaNacimiento, "imagen": masc.imagen, "duenio": null,
          "username": usu.nombreUsuario
        };
        this.mascService.crearMascota(mascBody)
          .subscribe(
            () => {
              this.mascotaSuccess(mascota, `Se ha editado correctamente la mascota ${mascota.nombre}`)
              this.ngAfterViewInit();
            },
            () => this.mascotaError(mascota, `No se ha podido editar la mascota ${mascota.nombre}`)
          );
      }
    });
  }

  public onEdit(mascota: IMascota) {
    mascota.open = false;
    const dialogRef = this.dialog.open(FormMascotaComponent, {
      maxWidth: "100%",
      width: '550px',
      height: '80%',
      data: mascota
    });
    dialogRef.afterClosed().subscribe((result) => {
      let masc: IMascota = result,
        usu = this.authService.getUsuario();
      if (masc != null && usu != null) {
        this.loadingDict[mascota.slug] = true;
        let mascBody: IMascotaBody = {
          "slug": masc.slug,
          "nombre": masc.nombre,
          "especie": masc.especie,
          "raza": masc.raza,
          "sexo": masc.sexo,
          "color": masc.color,
          "senias": masc.senias,
          "fechaNacimiento": masc.fechaNacimiento,
          "imagen": masc.imagen,
          "extraviada": masc.extraviada,
          "username": usu.nombreUsuario
        };
        this.mascService.editarMascota(mascBody)
          .subscribe(
            () => {
              this.mascotaSuccess(mascota, `Se ha editado correctamente la mascota ${mascota.nombre}`)
              this.ngAfterViewInit();
            },
            () => this.mascotaError(mascota, `No se ha podido editar la mascota ${mascota.nombre}`)
          );
      }
    });
  }

  public onEditFicha(mascota: IMascota) {
    mascota.open = false;
    const dialogRef = this.dialog.open(FormFichaComponent, {
      maxWidth: "100%",
      width: '450px',
      height: 'auto',
      data: mascota.ficha
    });
    dialogRef.afterClosed().subscribe((result) => {
      let ficha: IFicha = result,
        usu = this.authService.getUsuario();
      if (ficha != null && usu != null) {
        this.loadingDict[mascota.slug] = true;
        let fichaBody: IFicha = {
          "slug": ficha.slug,
          "nombre": ficha.nombre,
          "especie": ficha.especie,
          "raza": ficha.raza,
          "sexo": ficha.sexo,
          "color": ficha.color,
          "senias": ficha.senias,
          "fechaNacimiento": ficha.fechaNacimiento,
          "imagen": ficha.imagen,
          "extraviada": ficha.extraviada,
          "duenio": ficha.duenio,
          "veterinario": ficha.veterinario
        };
        this.mascService.editarFichaPublica(fichaBody)
          .subscribe(
            () => {
              this.mascotaSuccess(mascota, `Se ha editado correctamente la ficha de ${mascota.nombre}`)
              this.ngAfterViewInit();
            },
            () => this.mascotaError(mascota, `No se ha podido editar la ficha de ${mascota.nombre}`)
          );
      }
    });
  }

  public onEditImage(mascota: IMascota) {
    mascota.open = false;
    const dialogRef = this.dialog.open(ImagenMascotaComponent, {
      maxWidth: "100%",
      width: '550px',
      height: '80%',
      data: mascota
    });
    dialogRef.afterClosed().subscribe((m: IMascota) => {
      mascota = m;
      this.ngAfterViewInit();
    });
  }

  private onPetSearchSubmit() {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      this.mascService.getMascotasPorUsuarioCrit(
        usu.nombreUsuario,
        this.searchForm.searchPetF.criteria.value,
        this.searchForm.searchPetF.search.value
      ).subscribe(
        (data: IMascota[]) => {
          if (data.length > 0) {
            this.showError("Busqueda exitosa.", "success");
          } else {
            this.showError("Busqueda sin resultados.", "info");
          }
          this.onSuccess(data);
        },
        (error) => { this.onPetSearchError(); this.showError("Busqueda no válida.", "error"); }
      );
    } else {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }
  }

  private onPetSearchError() { }

  private mascotaSuccess(mascota: IMascota, strSuccess: string) {
    this.showError(strSuccess, "success");
    this.loadingDict[mascota.slug] = false;
    console.log(`---${strSuccess}---`);
  }

  private mascotaError(mascota: IMascota, strError: string) {
    this.showError(strError, "error");
    this.loadingDict[mascota.slug] = false;
    console.log(`---${strError}---`);
  }

  moreInfo(perfil: IProfile): void {
    this.dialog.open(PerfilDialogComponent, {
      maxWidth: "100%",
      width: 'auto',
      height: 'auto',
      maxHeight: "100%",
      data: perfil
    });
  }

  private showError(strError: string, clase: string = "", time: number = 20000, pos: MatSnackBarVerticalPosition = "top") {
    this.snackBar.open(
      strError,
      "",
      {
        duration: time,
        verticalPosition: pos,
        panelClass: clase
      }
    );
  }

  isAdministrador(): boolean {
    let usu = this.authService.getUsuario();
    return usu != null && usu.role == Usuario.adminRole;
  }

  isDuenio(): boolean {
    let usu = this.authService.getUsuario();
    return usu != null && usu.role == Usuario.duenioRole;
  }

  isVeterinario(): boolean {
    let usu = this.authService.getUsuario();
    return usu != null && usu.role == Usuario.vetRole;
  }

}
