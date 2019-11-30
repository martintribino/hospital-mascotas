import { NgModule } from '@angular/core';
import { NavbarModule } from '../navbar/navbar.module';
import { HeaderComponent } from './header.component';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  imports: [
    NavbarModule
  ],
  declarations: [
    HeaderComponent,
    NavbarComponent
  ],
  exports: [
    HeaderModule
  ],
  providers: []
})

export class HeaderModule { }