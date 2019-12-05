import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.styl']
})
@Injectable()
export class LoadingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/home'], { queryParams: {} });
  }

}
