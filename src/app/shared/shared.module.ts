import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LanguageChooserComponent } from './layout/language-chooser/language-chooser.component';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [LanguageChooserComponent],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class SharedModule { }