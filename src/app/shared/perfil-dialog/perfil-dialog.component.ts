import { Component, OnInit, Inject } from '@angular/core';
import { IProfile, IUser } from 'src/app/interfaces/interfaces.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.styl']
})
export class PerfilDialogComponent implements OnInit {

  private perfil: IProfile;
  private usuario: IUser;

  constructor(
    public dialogRef: MatDialogRef<PerfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProfile
  ) {
    this.perfil = data;
    this.usuario = this.perfil != null && this.perfil.usuario != null ? this.perfil.usuario : null;
  }

  ngOnInit() {
  }

  isAdministrador(): boolean {
    return this.usuario != null && this.usuario.role == Usuario.adminRole;
  }

  isDuenio(): boolean {
    return this.usuario != null && this.usuario.role == Usuario.duenioRole;
  }

  isVeterinario(): boolean {
    return this.usuario != null && this.usuario.role == Usuario.vetRole;
  }

}
