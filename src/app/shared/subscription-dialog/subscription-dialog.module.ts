import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatDialogModule,
} from "@angular/material";

import { SubscriptionDialogComponent } from "./subscription-dialog.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  declarations: [SubscriptionDialogComponent],
  exports: [SubscriptionDialogComponent],
  entryComponents: [SubscriptionDialogComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class SubscriptionDialogModule {}
