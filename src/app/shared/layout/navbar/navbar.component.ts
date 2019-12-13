import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/interfaces/interfaces.model';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})

@Injectable()
export class NavbarComponent implements OnInit {
  loginUrl: string;
  profileUrl: string;
  usuario: IUser = new Usuario();
  registerUrl: string;
  mascotasUrl: string;
  createMascotasUrl: string;
  logoutUrl: string;
  editPerfilUrl: string;
  editUserUrl: string;

  constructor(private authService: AuthenticationService) {
    this.loginUrl = "login";
    this.registerUrl = "signup";
    this.logoutUrl = "logout";
    this.mascotasUrl = "mascotas";
    this.editPerfilUrl = "edit-perfil";
    this.editUserUrl = "edit-user";
    this.createMascotasUrl = "create-mascota";
  }

  ngOnInit() {
    this.authService.usuario.subscribe(
      (usu: IUser) => {
        this.usuario = usu;
      }
    );
  }

}
