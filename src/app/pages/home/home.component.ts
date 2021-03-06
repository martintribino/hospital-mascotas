import { Component, OnInit } from "@angular/core";

import { MascotaService } from "src/app/services/mascota.service";
import {
  IMascota,
  IFiltro,
  IImagen,
} from "src/app/interfaces/interfaces.model";
import { BehaviorSubject } from "rxjs";
import { MatDialog } from "@angular/material";
import { QrcodeComponent } from "src/app/shared/qrcode/qrcode.component";
import { ArchivosService } from "src/app/services/archivos.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.styl"],
})
export class HomeComponent implements OnInit {
  private mascSubject = new BehaviorSubject<Array<IMascota>>([]);
  public mascotas = this.mascSubject.asObservable();
  private qrImage: IImagen;
  filtros: Array<IFiltro>;
  isLoading: boolean;
  selectedFilter: string;

  constructor(
    private mascService: MascotaService,
    private archService: ArchivosService,
    public dialog: MatDialog
  ) {
    this.mascSubject.next([]);
    this.qrImage = null;
    this.filtros = [
      { clave: "extraviadas", valor: "Extraviadas" },
      { clave: "todas", valor: "Todas" },
    ];
    this.isLoading = false;
    this.selectedFilter = "todas";
  }

  ngOnInit() {
    this.mascService.getMascotas().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  onSuccess(result) {
    this.isLoading = false;
    result.map((masc) => {
      masc.open = false;
      masc.path = "assets/images/pet_default_image.jpg";
    });
    this.mascSubject.next(result);
    this.mascSubject.value.map((masc) => {
      if (masc.imagen != null && masc.imagen.length > 0) {
        this.archService.cargarImagen(masc).subscribe(
          (data: IImagen) => {
            masc.path = `data:image/jpeg;base64,${data.b64str}`;
          },
          (error) => console.log(error)
        );
      }
    });
  }

  handleError(error) {
    this.isLoading = false;
    this.mascSubject.next([]);
  }

  onQRCode(mascota: IMascota) {
    mascota.open = false;
    this.mascService.getQRCode(mascota.slug).subscribe(
      (data: IImagen) => {
        this.qrImage = data;
        this.dialog.open(QrcodeComponent, {
          maxWidth: "100%",
          width: `450px`,
          height: `400px`,
          data: data,
        });
      },
      (error) => error
    );
  }

  onSelectionChange(value: string) {
    this.mascSubject.next([]);
    this.isLoading = true;
    this.mascService.getMascotasFiltro(value).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }
}
