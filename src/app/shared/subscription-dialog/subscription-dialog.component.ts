import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSelectChange,
} from "@angular/material";

import { IProfile } from "src/app/interfaces/interfaces.model";

@Component({
  selector: "app-subscription-dialog",
  templateUrl: "./subscription-dialog.component.html",
  styleUrls: ["./subscription-dialog.component.styl"],
})
export class SubscriptionDialogComponent {
  veterinario: IProfile;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<IProfile>
  ) {
    this.veterinario = null;
  }

  onSelect(vet: MatSelectChange): void {
    this.veterinario = vet.value;
  }
}
