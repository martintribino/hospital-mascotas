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
  logoutUrl: string;

  constructor(private authService: AuthenticationService) {
    this.loginUrl = "login";
    this.profileUrl = "profile";
    this.registerUrl = "signup";
    this.logoutUrl = "logout";
  }

  ngOnInit() {
    this.authService.usuario.subscribe(
      (usu: IUser) => {
        this.usuario = usu;
      }
    );
  }

}
