
export class Usuario {
  nombre_usuario: string;
  clave: string;
  roles: Array<string>;
  token?: string;

  constructor() {
    this.nombre_usuario = "";
    this.clave = "";
    this.roles = [];
  }
}
