import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDictionary, IMascota } from 'src/app/interfaces/interfaces.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.styl'],
  animations: [
    trigger('solicitudesFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(750)
      ]),
      transition(':leave',
        animate(700, style({ opacity: 0 })))
    ])
  ]
})
export class SolicitudesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private solicitudSubject = new BehaviorSubject<Array<IMascota>>([]);
  public solicitudes = this.solicitudSubject.asObservable();
  obs: Observable<IMascota[]>;
  dataSource: MatTableDataSource<IMascota>;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 25, 50];
  loadingDict: Array<IDictionary<boolean>>;

  constructor(
    private authService: AuthenticationService,
    private solService: SolicitudService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.solicitudSubject.next([]);
    this.loadingDict = [];
    this.dataSource = new MatTableDataSource<IMascota>([]);
  }

  ngOnInit() {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      this.solService.obtenerSolicitudesXUsuario(usu.nombreUsuario).subscribe(
        (data) => this.onSuccess(data),
        (error) => this.onError(error)
      );
    } else {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }
  }

  onSuccess(result: Array<IMascota>) {
    this.solicitudSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IMascota>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onError(error: HttpErrorResponse) {
    this.solicitudSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
