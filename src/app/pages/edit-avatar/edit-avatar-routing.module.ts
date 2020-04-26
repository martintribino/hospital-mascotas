import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { EditAvatarComponent } from "./edit-avatar.component";

const routes: Routes = [
  {
    path: "",
    component: EditAvatarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAvatarRoutingModule {}
