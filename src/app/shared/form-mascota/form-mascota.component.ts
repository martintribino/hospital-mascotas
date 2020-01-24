import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SubscriptionDialogComponent } from '../subscription-dialog/subscription-dialog.component';
import { IMascota } from 'src/app/interfaces/interfaces.model';

@Component({
  selector: 'app-form-mascota',
  templateUrl: './form-mascota.component.html',
  styleUrls: ['./form-mascota.component.styl']
})
export class FormMascotaComponent {

  mascotasForm = new FormGroup({
    slug: new FormControl(''),
    nombre: new FormControl(''),
    especie: new FormControl(''),
    raza: new FormControl(''),
    sexo: new FormControl(''),
    color: new FormControl(''),
    senias: new FormControl(''),
    fecha: new FormControl(''),
    imagen: new FormControl(''),
  });
  maxDate: Date;
  mascota: IMascota;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMascota
  ) {
    this.mascotasForm = new FormGroup({
      slug: new FormControl(''),
      nombre: new FormControl(''),
      especie: new FormControl(''),
      raza: new FormControl(''),
      sexo: new FormControl(''),
      color: new FormControl(''),
      senias: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      imagen: new FormControl(''),
    });
    this.maxDate = new Date();
    this.mascota = data;
    this.crearMascF.slug.setValue(this.mascota.slug);
    this.crearMascF.nombre.setValue(this.mascota.nombre);
    this.crearMascF.especie.setValue(this.mascota.especie);
    this.crearMascF.raza.setValue(this.mascota.raza);
    this.crearMascF.sexo.setValue(this.mascota.sexo);
    this.crearMascF.color.setValue(this.mascota.color);
    this.crearMascF.senias.setValue(this.mascota.senias);
    this.crearMascF.fechaNacimiento.setValue(this.mascota.fechaNacimiento);
    this.crearMascF.imagen.setValue(this.mascota.imagen);
  }

  onSubmit() {
    this.dialogRef.close(this.mascotasForm.value);
  }

  clean() {
    this.mascotasForm.reset();
  }

  get crearMascF() {
    return this.mascotasForm.controls;
  }

}
