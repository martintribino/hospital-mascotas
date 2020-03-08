import { NgModule } from '@angular/core';

import { Avatar1Component, Avatar2Component, Avatar3Component, Avatar4Component, Avatar5Component, Avatar6Component } from './avatars.component';

@NgModule({
  imports: [
  ],
  declarations: [
    Avatar1Component,
    Avatar2Component,
    Avatar3Component,
    Avatar4Component,
    Avatar5Component,
    Avatar6Component
  ],
  exports: [
    Avatar1Component,
    Avatar2Component,
    Avatar3Component,
    Avatar4Component,
    Avatar5Component,
    Avatar6Component
  ],
  providers: []
})

export class AvatarsModule { }