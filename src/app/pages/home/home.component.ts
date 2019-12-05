import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/auth/mascota.service';
import { IMascota } from 'src/app/interfaces/interfaces.model';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

  private mascSubject = new BehaviorSubject<Array<IMascota>>([]);
  public mascotas = this.mascSubject.asObservable();

  constructor(
    private mascService: MascotaService,
    private router: Router
  ) {
    this.mascSubject.next([]);
  }

  ngOnInit() {
    let headers = new HttpHeaders().set("Content-Type", "application/json"),
      options = {
        headers: headers,
        //observe: 'response'
      };
    this.mascService.getMascotas(options).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  onSuccess(result) {
    console.log(result);
    this.mascSubject.next(result);
  }

  handleError(error) {
    this.mascSubject.next([]);
  }

}
