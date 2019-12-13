// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  port: 4200,
  baseApiUrl: 'http://localhost:8080/hospital-mascotas-java',
  endpoints: {
    //publicos - sin /api/
    login: "http://localhost:8080/hospital-mascotas-java/login/",
    addUsuario: "http://localhost:8080/hospital-mascotas-java/usuario/profile/",
    mascotas: "http://localhost:8080/hospital-mascotas-java/mascotas/",
    //privados - con /api/
    checkToken: "http://localhost:8080/hospital-mascotas-java/api/usuario/check-token/",
    editarUsuario: "http://localhost:8080/hospital-mascotas-java/api/usuario/editar/",
    perfil: "http://localhost:8080/hospital-mascotas-java/api/usuario/profile/",
    mascota: "http://localhost:8080/hospital-mascotas-java/api/mascotas/",
    mascotasDuenio: "http://localhost:8080/hospital-mascotas-java/api/mascotas/duenio/",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
