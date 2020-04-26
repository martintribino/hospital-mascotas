import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { IFiltro } from "src/app/interfaces/interfaces.model";

@Component({
  selector: "app-pet-search",
  templateUrl: "./pet-search.component.html",
  styleUrls: ["./pet-search.component.styl"],
})
export class PetSearchComponent implements OnInit {
  @Output() petSearchSubmit = new EventEmitter<any>();
  searchForm = new FormGroup({
    criteria: new FormControl(""),
    search: new FormControl(""),
  });
  filtros: Array<IFiltro>;
  filtrosKeys: Array<string>;
  enabledKeys: Array<string>;

  constructor() {
    this.searchForm = new FormGroup({
      criteria: new FormControl(""),
      search: new FormControl(""),
    });
    this.filtros = [
      { clave: "color", valor: "Color" },
      { clave: "especie", valor: "Especie" },
      { clave: "extraviada", valor: "Extraviadas" },
      { clave: "nombre", valor: "Nombre" },
      { clave: "raza", valor: "Raza" },
      { clave: "senias", valor: "Señas" },
      { clave: "sexo", valor: "Sexo" },
      { clave: "todas", valor: "Todas" },
    ];
    this.filtrosKeys = ["color", "especie", "nombre", "raza", "senias", "sexo"];
    this.enabledKeys = [
      "color",
      "especie",
      "extraviada",
      "nombre",
      "raza",
      "senias",
      "sexo",
      "todas",
    ];
  }

  ngOnInit() {
    this.clean();
  }

  onChange() {
    this.searchPetF.search.setValue("");
  }

  onSubmit() {
    this.petSearchSubmit.emit();
  }

  enableSearchInput() {
    return this.filtrosKeys.indexOf(this.searchPetF.criteria.value) != -1;
  }

  disabled() {
    return (
      this.enabledKeys.indexOf(this.searchPetF.criteria.value) == -1 ||
      ((this.searchPetF.criteria.value == "todas" ||
        this.searchPetF.criteria.value != "extraviada") &&
        this.searchPetF.search.invalid)
    );
  }

  clean() {
    this.searchForm.reset();
  }

  get searchPetF() {
    return this.searchForm.controls;
  }
}
