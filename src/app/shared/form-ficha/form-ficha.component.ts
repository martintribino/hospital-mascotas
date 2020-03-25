import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubscriptionDialogComponent } from '../subscription-dialog/subscription-dialog.component';
import { IFicha } from 'src/app/interfaces/interfaces.model';

@Component({
  selector: 'app-form-ficha',
  templateUrl: './form-ficha.component.html',
  styleUrls: ['./form-ficha.component.styl']
})
export class FormFichaComponent {

  private fichaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFicha
  ) {
    this.fichaForm = new FormGroup({
      slug: new FormControl(data.slug),
      nombre: new FormControl(data.nombre),
      especie: new FormControl(data.especie),
      raza: new FormControl(data.raza),
      sexo: new FormControl(data.sexo),
      color: new FormControl(data.color),
      senias: new FormControl(data.senias),
      fechaNacimiento: new FormControl(data.fechaNacimiento),
      imagen: new FormControl(data.imagen),
      extraviada: new FormControl(data.extraviada),
      duenio: new FormControl(data.duenio),
      veterinario: new FormControl(data.veterinario),
    });
  }

  onSubmit() {
    this.dialogRef.close(this.fichaForm.value);
  }

  clean() {
    this.fichaForm.reset();
  }

  get getFichaForm() {
    return this.fichaForm.controls;
  }

}
