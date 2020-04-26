import { SafeUrl } from "@angular/platform-browser";

//estructuras
export interface FileExt extends File {
  objectURL: SafeUrl;
}

export declare type TimeLocal = {
  hour: number;
  minute: number;
  second: number;
};

export interface IDictionary<T> {
  [key: string]: T;
}

export interface IFiltro {
  clave: string;
  valor: string;
}

//enums
export enum Estado {
  ESPERA = "ESPERA",
  APROBADO = "APROBADO",
  RECHAZADO = "RECHAZADO",
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

export enum EventoTipo {
  Desparasitacion = "Desparasitación",
  Enfermedad = "Enfermedad",
  Intervencion = "Intervención",
  Recordatorio = "Recordatorio",
  Reproduccion = "Reproducción",
  Vacuna = "Vacuna",
  Visita = "Visita",
}

export enum EventoTipoSinAcento {
  Desparasitacion = "Desparasitacion",
  Enfermedad = "Enfermedad",
  Intervencion = "Intervencion",
  Recordatorio = "Recordatorio",
  Reproduccion = "Reproduccion",
  Vacuna = "Vacuna",
  Visita = "Visita",
}

export enum AvatarTipo {
  avatar1 = "avatar1",
  avatar2 = "avatar2",
  avatar3 = "avatar3",
  avatar4 = "avatar4",
  avatar5 = "avatar5",
  avatar6 = "avatar6",
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
  nombre_usuario_viejo?: string;
}

export interface IAvatarBody {
  nombreUsuario: string;
  imagen: string;
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
  extraviada: boolean;
  color?: string;
  senias?: string;
  fechaNacimiento?: Date;
  imagen?: string;
  duenio?: IProfile;
  veterinario?: IProfile;
  ficha?: IFicha;
  //front-end props
  open?: boolean;
  path?: string;
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
  extraviada: boolean;
}

export interface IEvento {
  slug?: string;
  tipo: EventoTipo;
  turno?: ITurno;
  descripcion: string;
  mascota: IMascota;
  droga?: string;
  resultado?: string;
  diagnostico?: string;
  indicaciones?: string;
  motivo?: string;
  peso?: string;
  fecha_parto?: Date;
  nro_cachorros?: number;
}

export interface IEventoReqBody {
  slug: string;
  fecha: string;
  inicio: TimeLocal;
  fin: TimeLocal;
  username: string;
  evento: IEvento;
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
  extraviada: boolean;
  duenio: boolean;
  veterinario: boolean;
  mascota?: IMascota;
}

export interface IImagen {
  b64str: string;
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
  evento?: IEvento;
  clase?: string;
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
  nombre_clinica?: string;
  domicilio_clinica?: string;
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
  nombreClinica?: string;
  domicilioClinica?: string;
  validado?: boolean;
}

export interface FileUploadModel {
  nombre: string;
  tipo: string;
  base64: string;
}

export interface IMascotaImagenBody {
  imagenes: Array<FileUploadModel>;
  mascota: string;
}
