import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

import { ITurno, IEvento, IMascota, EventoTipoSinAcento, EventoTipo } from 'src/app/interfaces/interfaces.model';
import { EventoService } from 'src/app/services/evento.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-turno-dialog',
  templateUrl: './turno-dialog.component.html',
  styleUrls: ['./turno-dialog.component.styl']
})
export class TurnoDialogComponent implements OnInit {

  private turno: ITurno;
  private evento: IEvento;
  private mascota: IMascota;
  private isSubmitting: boolean;
  tiposEventos: Array<EventoTipo>;
  EventoTipoSA = EventoTipoSinAcento;

  constructor(
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<TurnoDialogComponent>,
    private evService: EventoService,
    @Inject(MAT_DIALOG_DATA) public data: ITurno
  ) {
    this.turno = data;
    this.evento = this.turno.evento;
    this.mascota = this.evento != null && this.evento.mascota != null ? this.evento.mascota : null;
    this.tiposEventos = [];
    this.isSubmitting = false;
    Object.keys(EventoTipo).map(ind => this.tiposEventos[ind] = EventoTipo[ind] as string);
  }

  ngOnInit() {
  }

  onCancel() {
    this.isSubmitting = true;
    let usu = this.authService.getUsuario();
    this.evService.cancelarEvento(usu.nombreUsuario, this.evento.slug)
      .subscribe(
        () => { this.dialogRef.close("success"); },
        (error) => console.log(error),
        () => this.isSubmitting = false
      );
  }

  private isDisabled() {
    let fecha = moment(),
      tfecha = moment(this.turno.fecha),
      time = moment(this.turno.inicio, 'HH:mm');
    tfecha.set({
      hour: time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second')
    });
    return fecha.isBefore(tfecha);
  }

  private compareEvento(tipoSelected, ev) {
    return tipoSelected == ev;
  }

}
