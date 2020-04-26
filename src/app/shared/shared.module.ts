import { NgModule } from "@angular/core";
import { NavbarModule } from "./layout/navbar/navbar.module";
import { PetSearchComponent } from "./pet-search/pet-search.component";

@NgModule({
  imports: [NavbarModule],
  exports: [NavbarModule],
  declarations: [],
})
export class SharedModule {}
