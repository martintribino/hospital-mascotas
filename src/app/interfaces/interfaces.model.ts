
export interface ILoginBody {
  nombre_usuario: string;
  clave: string;
}

export interface IUser {
  token: string;
  nombreUsuario: string;
  imagen: string;
}

export interface IProfile {
  nombre: string;
  apellido: string;
  dni: number;
  telefono: number;
  nombreUsuario: string;
  email: string;
  domicilio: string;
  imagen: string;
  nombreClinica?: string;
  domicilioClinica?: string;
  validado?: boolean;
}
