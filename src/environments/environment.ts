export const environment = {
  production: false,
  port: 4200,
  baseLocalUrl: 'http://localhost:4200/',
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
    solicitud: "http://localhost:8080/hospital-mascotas-java/api/solicitud/",
    mascotasUsuario: "http://localhost:8080/hospital-mascotas-java/api/mascotas/usuario/",
    veterinariosValidados: "http://localhost:8080/hospital-mascotas-java/api/veterinarios/XValidacion/",
  }
};
