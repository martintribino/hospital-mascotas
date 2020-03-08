import { Usuario } from 'src/app/model/usuario';
import { IUser, FileUploadModel } from 'src/app/interfaces/interfaces.model';

export function isEmpty(str: string) {
  return (!str || 0 === str.length);
}

export function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

export function isEqual(val1, val2) {
  return (val1 == val2);
}

export function isSame(val1, val2) {
  return (val1 === val2);
}

export function isAdministrador(usu: IUser): boolean {
  return usu.role == Usuario.adminRole;
}

export function isDuenio(usu: IUser): boolean {
  return usu.role == Usuario.duenioRole;
}

export function isVeterinario(usu: IUser): boolean {
  return usu.role == Usuario.vetRole;
}
