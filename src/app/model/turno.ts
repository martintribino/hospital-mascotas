import { ITurno, EstadoTurno, TimeLocal } from '../interfaces/interfaces.model';
import { Time } from '@angular/common';

export class Turno implements ITurno {
  //props
  fecha: Date;
  inicio: TimeLocal;
  fin: TimeLocal;
  estado: EstadoTurno;

  constructor(
    fecha: Date,
    inicio: TimeLocal,
    fin: TimeLocal,
    estado: EstadoTurno
  ) {
    this.fecha = fecha;
    this.inicio = inicio;
    this.fin = fin;
    this.estado = estado;
  }

}
