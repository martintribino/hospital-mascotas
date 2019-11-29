import { Component, OnInit } from '@angular/core';

import * as languages from "../../../data/languages.json";
@Component({
  selector: 'app-language-chooser',
  templateUrl: './language-chooser.component.html',
  styleUrls: ['./language-chooser.component.styl']
})

export class LanguageChooserComponent implements OnInit {

  languageOptions: Object;
  languageSelected: string;

  constructor() {
    this.languageOptions = languages;
    this.languageSelected = "es-ES";
  }

  ngOnInit() {
  }

}
