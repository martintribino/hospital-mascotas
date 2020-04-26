import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { EventsComponent } from "./events.component";

const routes: Routes = [
  {
    path: "",
    component: EventsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
