import { Component, OnInit } from '@angular/core';

import { MascotaService } from 'src/app/services/mascota.service';
import { IMascota, IMascotaBody, IFicha, IQRImagen, IDictionary, IFiltro } from 'src/app/interfaces/interfaces.model';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatSnackBar, MatSnackBarVerticalPosition, MatSelectChange } from '@angular/material';
import { QrcodeComponent } from 'src/app/shared/qrcode/qrcode.component';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionChange } from '@angular/cdk/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

  private mascSubject = new BehaviorSubject<Array<IMascota>>([]);
  public mascotas = this.mascSubject.asObservable();
  private qrImage: IQRImagen;
  filtros: Array<IFiltro>;
  isLoading: boolean;
  selectedFilter: string;

  constructor(
    private mascService: MascotaService,
    public dialog: MatDialog
  ) {
    this.mascSubject.next([]);
    this.qrImage = null;
    this.filtros = [
      { clave: "extraviadas", valor: "Extraviadas" },
      { clave: "todas", valor: "Todas" }
    ];
    this.isLoading = false;
    this.selectedFilter = "todas";
  }

  ngOnInit() {
    this.mascService.getMascotas().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  onSuccess(result) {
    this.isLoading = false;
    this.mascSubject.next(result);
  }

  handleError(error) {
    this.isLoading = false;
    this.mascSubject.next([]);
  }

  onQRCode(mascota: IMascota) {
    mascota.open = false;
    this.mascService.getQRCode(mascota.slug).subscribe(
      (data: IQRImagen) => {
        this.qrImage = data;
        this.dialog.open(QrcodeComponent, {
          maxWidth: "100%",
          width: `450px`,
          height: `400px`,
          data: data
        });
      },
      (error) => error
    );
  }

  onSelectionChange(value: string) {
    this.mascSubject.next([]);
    this.isLoading = true;
    this.mascService.getMascotasFiltro(value).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

}
