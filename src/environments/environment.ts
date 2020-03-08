export const environment = {
  production: false,
  port: 4200,
  baseLocalUrl: 'http://localhost:4200/',
  baseApiUrl: 'http://localhost:8080/hospital-mascotas-java',
  endpoints: {
    //publicos - sin /api/
    addUsuario: "http://localhost:8080/hospital-mascotas-java/usuario/profile/",
    login: "http://localhost:8080/hospital-mascotas-java/login/",
    mascotas: "http://localhost:8080/hospital-mascotas-java/mascotas/",
    //privados - con /api/
    archivos: "http://localhost:8080/hospital-mascotas-java/api/archivos/",
    avatar: "http://localhost:8080/hospital-mascotas-java/api/usuario/imagen/editar/",
    checkToken: "http://localhost:8080/hospital-mascotas-java/api/usuario/check-token/",
    editarUsuario: "http://localhost:8080/hospital-mascotas-java/api/usuario/editar/",
    evento: "http://localhost:8080/hospital-mascotas-java/api/eventos/",
    ficha: "http://localhost:8080/hospital-mascotas-java/api/ficha/",
    mascota: "http://localhost:8080/hospital-mascotas-java/api/mascotas/",
    mascotasUsuario: "http://localhost:8080/hospital-mascotas-java/api/mascotas/usuario/",
    perfil: "http://localhost:8080/hospital-mascotas-java/api/usuario/profile/",
    qr: "http://localhost:8080/hospital-mascotas-java/mascotas/qr/",
    solicitud: "http://localhost:8080/hospital-mascotas-java/api/solicitud/",
    turno: "http://localhost:8080/hospital-mascotas-java/api/turnos/",
    veterinariosValidados: "http://localhost:8080/hospital-mascotas-java/api/veterinarios/XValidacion/",
  }
};
