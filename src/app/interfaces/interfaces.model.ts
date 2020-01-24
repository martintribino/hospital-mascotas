
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

export enum Estado {
  ESPERA = "ESPERA",
  APROBADO = "APROBADO",
  RECHAZADO = "RECHAZADO"
}

export interface ISolicitud {
  slug: string;
  fecha: Date;
  estado: Estado;
  mascota: IMascota;
  veterinario: IProfile;
}

export interface ISolicitudBody {
  slug: string;
  fecha: Date;
  estado: Estado;
  mascota: string;
  veterinario: string;
}

export interface IMascota {
  slug: string;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  color?: string;
  senias?: string;
  fechaNacimiento?: Date;
  imagen?: string;
  duenio?: IProfile;
  veterinario?: IProfile;
  ficha?: IFicha;
  open?: boolean;
}

export interface IMascotaBody {
  slug?: string;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  color?: string;
  senias?: string;
  username: string;
  duenio?: IProfile;
  ficha?: IFicha;
  veterinario?: IProfile;
  fechaNacimiento?: Date;
  imagen?: string;
}

export interface IFicha {
  slug?: string;
  nombre: boolean;
  especie: boolean;
  raza: boolean;
  sexo: boolean;
  color: boolean;
  senias: boolean;
  fechaNacimiento: boolean;
  imagen: boolean;
  duenio: boolean;
  mascota?: IMascota;
}

export interface IQRImagen {
  qrcode: string;
  extension: string;
  width: number;
  height: number;
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