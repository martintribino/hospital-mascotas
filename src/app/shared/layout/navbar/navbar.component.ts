import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})

export class NavbarComponent implements OnInit {
  loginUrl: string;
  profileUrl: string;
  profileText: string;
  registerUrl: string;
  logoutUrl: string;
  isAuthenticated: boolean;

  constructor() {
    this.isAuthenticated = false;
    this.loginUrl = "login";
    this.profileUrl = "profile";
    this.registerUrl = "signup";
    this.profileText = "";
    this.logoutUrl = "login";
  }

  ngOnInit() {
  }

}
