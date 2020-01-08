
export interface IPaginatorEv {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

export interface ILoginBody {
  nombreUsuario: string;
  clave: string;
  confirmar_clave?: string;
  nombreUsuarioViejo?: string;
}

export interface IMascota {
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  color?: string;
  senias?: string;
  fecha_nacimiento?: Date;
  imagen?: string;
  duenio?: IProfile;
  veterinario?: IProfile;
}

export interface IMascotaBody {
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  color?: string;
  senias?: string;
  username: string;
  fecha_nacimiento?: Date;
  imagen?: string;
}

export interface IUser {
  nombreUsuario: string;
  role: string;
  token?: string;
  imagen?: string;
}

export interface IEditarPerfil {
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono?: number;
  domicilio?: string;
  imagen?: string;
  nombreClinica?: string;
  domicilioClinica?: string;
  validado?: boolean;
}

export interface ISignup {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  dni: number;
  role: string;
  email: string;
  clave: string;
  confirmarClave: string;
  telefono: number;
  domicilio?: string;
  imagen?: string;
  nombreClinica?: string;
  domicilioClinica?: string;
  validado?: boolean;
}

export interface IProfile {
  nombre: string;
  apellido: string;
  usuario: IUser;
  dni: number;
  email: string;
  domicilio?: string;
  telefono?: number;
  imagen?: string;
  nombreClinica?: string;
  domicilioClinica?: string;
  validado?: boolean;
}

export interface IDictionary<T> {
  [key: string]: T;
}