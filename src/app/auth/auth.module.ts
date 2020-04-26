import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationService } from "src/app/services/auth.service";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthenticationService],
})
export class AuthModule {}
