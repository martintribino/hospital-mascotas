import { NgModule } from '@angular/core';
import { NavbarModule } from './layout/navbar/navbar.module';

@NgModule({
  imports: [
    NavbarModule,
  ],
  declarations: [],
  exports: [
    NavbarModule,
  ]
})
export class SharedModule { }