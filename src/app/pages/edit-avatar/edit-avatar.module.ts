import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule, MatRadioModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PerfilService } from "src/app/services/perfil.service";
import { EditAvatarComponent } from "./edit-avatar.component";
import { EditAvatarRoutingModule } from "./edit-avatar-routing.module";
import { AvatarsModule } from "src/assets/svg/avatars.module";

@NgModule({
  imports: [
    EditAvatarRoutingModule,
    CommonModule,
    MatRadioModule,
    MatSnackBarModule,
    AvatarsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditAvatarComponent],
  providers: [PerfilService],
})
export class EditAvatarModule {}
