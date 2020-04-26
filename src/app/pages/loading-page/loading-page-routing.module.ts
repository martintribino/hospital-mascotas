import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoadingPageComponent } from "./loading-page.component";

const routes: Routes = [
  {
    path: "",
    component: LoadingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingPageRoutingModule {}
