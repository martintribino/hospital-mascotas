import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ITurno, IEvento } from 'src/app/interfaces/interfaces.model';

@Component({
  selector: 'app-turno-dialog',
  templateUrl: './turno-dialog.component.html',
  styleUrls: ['./turno-dialog.component.styl']
})
export class TurnoDialogComponent implements OnInit {

  private turno: ITurno;
  private evento: IEvento;

  constructor(
    public dialogRef: MatDialogRef<TurnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITurno
  ) {
    this.turno = data;
  }

  ngOnInit() {
  }

}
