import { Component, OnInit } from '@angular/core';

import { MascotaService } from 'src/app/auth/mascota.service';
import { IMascota } from 'src/app/interfaces/interfaces.model';
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
    private mascService: MascotaService
  ) {
    this.mascSubject.next([]);
  }

  ngOnInit() {
    this.mascService.getMascotas().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  onSuccess(result) {
    this.mascSubject.next(result);
  }

  handleError(error) {
    this.mascSubject.next([]);
  }

}
