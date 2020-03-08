import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IImagen } from 'src/app/interfaces/interfaces.model';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.styl']
})
export class QrcodeComponent {

  public qrImage: IImagen;

  constructor(
    public dialogRef: MatDialogRef<QrcodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IImagen
  ) {
    this.qrImage = data;
  }

}
