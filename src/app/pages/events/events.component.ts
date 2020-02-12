import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EventoService } from 'src/app/services/evento.service';
import { TurnoService } from 'src/app/services/turno.service';
import { IHorario, ITurno, EstadoTurno } from 'src/app/interfaces/interfaces.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  horario = this.horarioSubject.asObservable();
  isLinear: boolean = true;
  firstStepForm: FormGroup;
  secondStepForm: FormGroup;
  thirdStepForm: FormGroup;
  currentDate: Date;

  constructor(
    private turnoService: TurnoService
  ) {
    this.horarioSubject.next(null);
    this.currentDate = new Date();
    this.firstStepForm = new FormGroup({
      fecha: new FormControl(''),
    });
    this.secondStepForm = new FormGroup({
      nombreUsuario: new FormControl(''),
      clave: new FormControl(''),
    });
    this.thirdStepForm = new FormGroup({
      nombreUsuario: new FormControl(''),
      clave: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  private changeDate(event: MatDatepickerInputEvent<Date>) {
    this.currentDate = event.value;
    this.turnoService.horarios(this.currentDate).subscribe(
      (data: IHorario) => this.horarioSuccess(data),
      (error) => this.horarioError(error)
    );
  }

  private horarioSuccess(horario: IHorario) {
    this.horarioSubject.next(horario);
  }

  private horarioError(error) {
    this.horarioSubject.next(null);
  }

  isEnabled = (t: ITurno): boolean => {
    return t.estado == EstadoTurno.DISPONIBLE;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  get firstStepF() {
    return this.firstStepForm.controls;
  }

  get secondStepF() {
    return this.secondStepForm.controls;
  }

}
