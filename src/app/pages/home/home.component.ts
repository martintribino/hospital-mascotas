import { Component, OnInit } from '@angular/core';

import { MascotaService } from 'src/app/services/mascota.service';
import { IMascota, IMascotaBody, IFicha, IQRImagen } from 'src/app/interfaces/interfaces.model';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';
import { QrcodeComponent } from 'src/app/shared/qrcode/qrcode.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

  private mascSubject = new BehaviorSubject<Array<IMascota>>([]);
  public mascotas = this.mascSubject.asObservable();
  private qrImage: IQRImagen;

  constructor(
    private mascService: MascotaService,
    public dialog: MatDialog
  ) {
    this.mascSubject.next([]);
    this.qrImage = null;
  }

  ngOnInit() {
    this.mascService.getMascotas().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  onSuccess(result) {
    this.mascSubject.next(result);
  }

  handleError(error) {
    this.mascSubject.next([]);
  }

  onQRCode(mascota: IMascota) {
    mascota.open = false;
    this.mascService.getQRCode(mascota.slug).subscribe(
      (data: IQRImagen) => {
        this.qrImage = data;
        const dialogRef = this.dialog.open(QrcodeComponent, {
          maxWidth: "100%",
          width: `400px`,
          height: `400px`,
          data: data
        });
      },
      (error) => error
    );
  }

}
