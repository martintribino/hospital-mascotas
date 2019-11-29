
export interface ILoginBody {
  nombre_usuario: string;
  clave: string;
}

export interface IUser {
  email: string;
  token: string;
  nombreUsuario: string;
  image: string;
}

export interface INavbar {
  loginUrl: string;
  profileUrl: string;
  profileText: string;
  logoutUrl: string;
  isAuthenticated: boolean;
  user: IUser;
}
