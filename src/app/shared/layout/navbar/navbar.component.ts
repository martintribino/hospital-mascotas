import { Component, OnInit } from '@angular/core';
import { INavbar, IUser } from '../../../interfaces/interfaces.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})

export class NavbarComponent implements OnInit, INavbar {
  loginUrl: string;
  profileUrl: string;
  profileText: string;
  logoutUrl: string;
  isAuthenticated: boolean;
  user: IUser;

  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.loginUrl = "login";
    this.profileUrl = "login";
    this.profileText = "";
    this.logoutUrl = "login";
    if (this.isAuthenticated && this.user != null) {
      this.profileText = this.user.nombreUsuario;
    }
  }

  ngOnInit() {
  }

}
