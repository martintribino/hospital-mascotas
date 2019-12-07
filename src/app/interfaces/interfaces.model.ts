
export interface ILoginBody {
  nombre_usuario: string;
  clave: string;
}

export interface IMascota {
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  color: string;
  senias: string;
  fecha_nacimiento: Date;
  imagen: string;
  duenio: IProfile;
  veterinario: IProfile;
}

export interface IUser {
  nombreUsuario: string;
  role: string;
  token?: string;
  imagen?: string;
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
