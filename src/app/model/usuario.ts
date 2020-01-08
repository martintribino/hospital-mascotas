import { IUser } from '../interfaces/interfaces.model';

export class Usuario implements IUser {
  //constants
  public static readonly adminRole = "administrador";
  public static readonly duenioRole = "duenio";
  public static readonly vetRole = "veterinario";
  public static readonly allowedUserRoles = [Usuario.adminRole, Usuario.duenioRole, Usuario.vetRole];
  //props
  nombreUsuario: string;
  role: string;
  token?: string;
  imagen?: string;

  constructor() {
    this.nombreUsuario = "";
    this.role = "";
    this.token = "";
    this.imagen = "";
  }

}
