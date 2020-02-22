import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ITurno, IEvento, IMascota, EventoTipoSinAcento, EventoTipo } from 'src/app/interfaces/interfaces.model';

@Component({
  selector: 'app-turno-dialog',
  templateUrl: './turno-dialog.component.html',
  styleUrls: ['./turno-dialog.component.styl']
})
export class TurnoDialogComponent implements OnInit {

  private turno: ITurno;
  private evento: IEvento;
  private mascota: IMascota;
  tiposEventos: Array<EventoTipo>;
  EventoTipoSA = EventoTipoSinAcento;

  constructor(
    public dialogRef: MatDialogRef<TurnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITurno
  ) {
    this.turno = data;
    this.evento = this.turno.evento;
    this.mascota = this.evento != null && this.evento.mascota != null ? this.evento.mascota : null;
    this.tiposEventos = [];
    Object.keys(EventoTipo).map(ind => this.tiposEventos[ind] = EventoTipo[ind] as string);
  }

  ngOnInit() {
  }

  private compareEvento(tipoSelected, ev) {
    return tipoSelected == ev;
  }

}
