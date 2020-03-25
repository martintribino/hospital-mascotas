import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';

import { EventoService } from 'src/app/services/evento.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { AuthenticationService } from 'src/app/services/auth.service';

import { IHorario, ITurno, EstadoTurno, IEvento, EventoTipo, IMascota, IEventoReqBody, EventoTipoSinAcento } from 'src/app/interfaces/interfaces.model';
import { Usuario } from 'src/app/model/usuario';
import { TurnoDialogComponent } from 'src/app/shared/turno-dialog/turno-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.styl'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class EventsComponent implements OnInit {
  private horarioSubject = new BehaviorSubject<IHorario>(null);
  private eventosSubject = new BehaviorSubject<Array<IEvento>>([]);
  private mascTotalSubject = new BehaviorSubject<Array<IMascota>>([]);
  mascotas = this.mascTotalSubject.asObservable();
  horario = this.horarioSubject.asObservable();
  eventos = this.eventosSubject.asObservable();
  isLinear: boolean = true;
  firstStepForm: FormGroup;
  horarioForm: FormGroup;
  secondStepForm: FormGroup;
  minDate: Date;
  currentDate: Date;
  turnoSeleccionado: ITurno;
  estados: Array<EstadoTurno>;
  tipoEventos: Array<{ "indice": string, "value": string }>;
  estadosHabilitados: Array<EstadoTurno>;
  isSubmiting: boolean;
  EventoTipo = EventoTipoSinAcento;

  constructor(
    private eventoService: EventoService,
    private authService: AuthenticationService,
    private mascService: MascotaService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.horarioSubject.next(null);
    this.eventosSubject.next([]);
    this.mascTotalSubject.next([]);
    this.minDate = new Date();
    this.currentDate = new Date();
    this.turnoSeleccionado = null;
    this.estados = Object.values(EstadoTurno);
    this.tipoEventos = [];
    this.estadosHabilitados = [];
    Object.keys(EventoTipo).map(ind => this.tipoEventos.push({ "indice": ind, "value": EventoTipo[ind] as string }));
    this.isSubmiting = false;
    this.firstStepForm = new FormGroup({
      fecha: new FormControl(''),
    });
    this.horarioForm = new FormGroup({
      turno: new FormControl(null, Validators.required),
    });
    this.secondStepForm = new FormGroup({
      tipo: new FormControl(EventoTipo.Visita),
      descripcion: new FormControl(''),
      mascota: new FormControl(null),
      droga: new FormControl(null),
      resultado: new FormControl(null),
      diagnostico: new FormControl(null),
      indicaciones: new FormControl(null),
      motivo: new FormControl(null),
      peso: new FormControl(null),
      fechaParto: new FormControl(null),
      nroCachorros: new FormControl(null),
    });
  }

  ngOnInit() {
    let usu = this.authService.getUsuario();
    if (usu != null) {
      if (this.isDuenio()) {
        this.estadosHabilitados = [
          EstadoTurno.CONCURRIO,
          EstadoTurno.DISPONIBLE,
          EstadoTurno.RESERVADO
        ];
      } else {
        this.minDate = null;
        this.estadosHabilitados = [
          EstadoTurno.CANCELADO,
          EstadoTurno.CONCURRIO,
          EstadoTurno.DISPONIBLE,
          EstadoTurno.NOCONCURRIO,
          EstadoTurno.RESERVADO
        ];
      }
      this.mascService.getMascotasPorUsuario(usu.nombreUsuario).subscribe(
        (data) => this.onSuccess(data),
        (error) => this.handleError(error)
      );
    } else {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }
  }

  private onSuccess(mascotas: Array<IMascota>) {
    this.mascTotalSubject.next(mascotas.filter((m: IMascota) => { return m.veterinario != null }));
  }

  private handleError(error) {
    this.mascTotalSubject.next(null);
  }

  private onSubmit(stepper: MatStepper) {
    this.isSubmiting = true;
    let usu = this.authService.getUsuario();
    if (usu != null) {
      let msct: IMascota = this.secondStepF.mascota.value,
        evt: IEvento = {
          "tipo": this.secondStepF.tipo.value,
          "turno": null,
          "descripcion": this.secondStepF.descripcion.value,
          "mascota": null,
          "droga": this.secondStepF.droga.value,
          "resultado": this.secondStepF.resultado.value,
          "diagnostico": this.secondStepF.diagnostico.value,
          "indicaciones": this.secondStepF.indicaciones.value,
          "motivo": this.secondStepF.motivo.value,
          "peso": this.secondStepF.peso.value,
          "fecha_parto": this.secondStepF.fechaParto.value,
          "nro_cachorros": this.secondStepF.nroCachorros.value
        },
        evtBody: IEventoReqBody = {
          slug: msct.slug,
          fecha: this.currentDate.toISOString().substring(0, 10),
          inicio: this.turnoSeleccionado.inicio,
          fin: this.turnoSeleccionado.fin,
          username: usu.nombreUsuario,
          evento: evt
        };
      this.eventoService.crearEvento(evtBody).subscribe(
        (data: IEvento) => this.guardarEvSuccess(data, stepper),
        (error) => this.guardarEvError(error)
      );
    } else {
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: {} });
    }
  }

  private guardarEvSuccess(evento: IEvento, stepper: MatStepper) {
    this.isSubmiting = false;
    this.clear();
    stepper.reset();
    this.showError("El evento ha sido creado", "success");
  }

  private guardarEvError(error) {
    this.isSubmiting = false;
    this.showError("El evento no ha podido ser creado", "error");
  }

  private clickTurno(turno: ITurno, stepper: MatStepper) {
    switch (turno.estado) {
      case EstadoTurno.CANCELADO:
        if (this.estadosHabilitados.includes(EstadoTurno.CONCURRIO))
          this.showInfo(turno, stepper);
        break;
      case EstadoTurno.CONCURRIO:
        if (this.estadosHabilitados.includes(EstadoTurno.CONCURRIO))
          this.showInfo(turno, stepper);
        break;
      case EstadoTurno.DISPONIBLE:
        this.horarioStepF.turno.setValue(null);
        if (this.turnoSeleccionado == turno) {
          this.turnoSeleccionado = null;
        } else {
          this.turnoSeleccionado = turno;
          this.horarioStepF.turno.setValue(turno.estado);
        }
        break;
      case EstadoTurno.NOCONCURRIO:
        if (this.estadosHabilitados.includes(EstadoTurno.NOCONCURRIO))
          this.showInfo(turno, stepper);
        break;
      case EstadoTurno.RESERVADO:
        if (this.estadosHabilitados.includes(EstadoTurno.RESERVADO))
          this.showInfo(turno, stepper);
        break;
      default:
        break;
    }
  }

  private showInfo(turno: ITurno, stepper: MatStepper) {
    const dialogRef = this.dialog.open(TurnoDialogComponent, {
      width: '350px',
      maxWidth: '450px',
      data: turno
    });
    dialogRef.afterClosed().subscribe((ok: string) => {
      if (ok == "success")
        stepper.reset();
    });
  }

  private changeDate(event: MatDatepickerInputEvent<Date>) {
    this.turnoSeleccionado = null;
    this.currentDate = event.value;
    this.eventoService.horarios(this.currentDate).subscribe(
      (data: IHorario) => this.horarioSuccess(data),
      (error) => this.horarioSuccess(error)
    );
  }

  private horarioSuccess(horario: IHorario) {
    this.horarioSubject.next(horario);
  }

  private horarioError(error) {
    this.horarioSubject.next(null);
  }

  private isEnabled = (t: ITurno): boolean => {
    return this.estadosHabilitados.includes(t.estado);
  }

  private myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Previene de ser seleccionados al Sabado y Domingo.
    return day !== 0 && day !== 6;
  }

  private hasBadge(turno: ITurno): string {
    let strBadge: string = "";
    if (turno.evento != null && turno.evento.tipo == EventoTipo.Recordatorio) {
      strBadge = "R";
    }
    return strBadge;
  }

  private compareEvento(tipoSelected, ev): boolean {
    return tipoSelected == ev;
  }

  get firstStepF() {
    return this.firstStepForm.controls;
  }

  get horarioStepF() {
    return this.horarioForm.controls;
  }

  get secondStepF() {
    return this.secondStepForm.controls;
  }

  private clear() {
    this.firstStepForm.reset();
    this.secondStepForm.reset();
    this.firstStepForm = new FormGroup({
      fecha: new FormControl(''),
    });
    this.secondStepForm = new FormGroup({
      tipo: new FormControl(EventoTipo.Visita),
      descripcion: new FormControl(''),
      mascota: new FormControl(null),
      droga: new FormControl(null),
      resultado: new FormControl(null),
      diagnostico: new FormControl(null),
      indicaciones: new FormControl(null),
      motivo: new FormControl(null),
      peso: new FormControl(null),
      fechaParto: new FormControl(null),
      nroCachorros: new FormControl(null),
    });
  }

  private showError(strError: string, clase: string = "", time: number = 2000, pos: MatSnackBarVerticalPosition = "top") {
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
    return usu.role == Usuario.adminRole;
  }

  isDuenio(): boolean {
    let usu = this.authService.getUsuario();
    return usu.role == Usuario.duenioRole;
  }

  isVeterinario(): boolean {
    let usu = this.authService.getUsuario();
    return usu.role == Usuario.vetRole;
  }

}
