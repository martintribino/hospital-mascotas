import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { ValidateVeterinariosComponent } from "./validate-veterinarios.component";

const routes: Routes = [
  {
    path: "",
    component: ValidateVeterinariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateVeterinariosRoutingModule {}
