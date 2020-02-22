import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('clave').value;
    if (AC.get('confirmarClave').touched || AC.get('confirmarClave').dirty) {
      let verifyPassword = AC.get('confirmarClave').value;
      if (password != verifyPassword) {
        AC.get('confirmarClave').setErrors({ matchPassword: true })
      } else {
        return null
      }
    }
  }
  static MatchPasswordIncEmpty(AC: AbstractControl) {
    let password = AC.get('clave').value;
    let verifyPassword = AC.get('confirmarClave').value;
    if (password != verifyPassword) {
      AC.get('confirmarClave').setErrors({ matchPassword: true })
    } else {
      return null
    }
  }
}
