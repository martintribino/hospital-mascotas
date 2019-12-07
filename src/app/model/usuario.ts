import { IUser } from '../interfaces/interfaces.model';

export class Usuario implements IUser {
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
