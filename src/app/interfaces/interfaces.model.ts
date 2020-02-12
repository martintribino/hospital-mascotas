
export declare type TimeLocal = {
  hour: number;
  minute: number;
  second: number;
  nano?: number;
};
//enums
export enum Estado {
  ESPERA = "ESPERA",
  APROBADO = "APROBADO",
  RECHAZADO = "RECHAZADO"
}

export enum EstadoTurno {
  CANCELADO = "CANCELADO", //cancelado
  CONCURRIO = "CONCURRIO", //para consltar historial
  DISPONIBLE = "DISPONIBLE", //disponible y aun no transcurrio la fecha
  INACTIVO = "INACTIVO", // ya transcurrio la fecha
  NOCONCURRIO = "NOCONCURRIO", //para consltar historial
  NODISPONIBLE = "NODISPONIBLE", //no disponible porque ya transcurrio la fecha
  RESERVADO = "RESERVADO", //reservado y aun no transcurrio la fecha
}

export enum IEventoTipo {
  DESPARASITACION = "Desparasitación",
  ENFERMEDAD = "Enfermedad",
  INTERVENCION = "Intervención",
  REPRODUCCION = "Reproducción",
  SOLICITUD = "Solicitud",
  VACUNA = "Vacuna",
  VISITA = "Visita"
}
//interface
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

export interface IEvento {
  slug?: string;
  tipo: IEventoTipo;
  fecha: Date;
  descripcion: string;
  concurrio: boolean;
  veterinario: IProfile;
  mascota: IMascota;
  droga?: string;
  resultado?: string;
  diagnostico?: string;
  indicaciones?: string;
  motivo?: string;
  peso?: string;
  fechaParto?: Date;
  nroCachorros?: number;
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

export interface ITurno {
  fecha: Date;
  inicio: TimeLocal;
  fin: TimeLocal;
  estado: EstadoTurno;
}

export interface IHorario {
  turno: number;
  inicio: TimeLocal;
  fin: TimeLocal;
  estados: Array<EstadoTurno>;
  turnosValidos: Array<ITurno>;
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