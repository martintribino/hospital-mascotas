import { IHorario, EstadoTurno, TimeLocal, ITurno } from '../interfaces/interfaces.model';
import { Time } from '@angular/common';
import { Turno } from './turno';

export class Horario implements IHorario {

  turno: number;
  inicio: TimeLocal;
  fin: TimeLocal;
  estados: Array<EstadoTurno>;
  turnosValidos: Array<ITurno>;

  constructor(
    turno: number,
    inicio: TimeLocal,
    fin: TimeLocal,
    estados: Array<EstadoTurno>,
    turnosValidos: Array<ITurno>
  ) {
    this.turno = turno;
    this.inicio = inicio;
    this.fin = fin;
    this.estados = estados;
    this.turnosValidos = turnosValidos;
  }

  esTurnoValido(t: Turno): boolean {
    return t.inicio < t.fin &&
      t.inicio.hour >= this.inicio.hour &&
      t.fin.hour <= this.fin.hour;
  }

}