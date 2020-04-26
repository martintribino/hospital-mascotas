import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from "@angular/material";
import { IMascota } from "src/app/interfaces/interfaces.model";
import { FileUploaderComponent } from "../file-uploader/file-uploader.component";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { ArchivosService } from "src/app/services/archivos.service";

@Component({
  selector: "app-imagen-mascota",
  templateUrl: "./imagen-mascota.component.html",
  styleUrls: ["./imagen-mascota.component.styl"],
})
export class ImagenMascotaComponent {
  @ViewChild("uploader", { static: true }) uploader: FileUploaderComponent;

  private mascota: IMascota;
  private isSubmitting: boolean;
  uploadForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ImagenMascotaComponent>,
    private snackBar: MatSnackBar,
    private archService: ArchivosService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IMascota
  ) {
    this.mascota = data;
    this.isSubmitting = false;
    this.uploadForm = this.formBuilder.group({
      archivos: [""],
      mascota: [this.mascota.slug],
    });
  }

  private onSubmit(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.uploader.files.length > 0) {
      this.isSubmitting = true;
      var formData = new FormData();
      formData.append("mascota", this.uploadForm.get("mascota").value);
      for (var i = 0; i < this.uploader.files.length; i++) {
        this.uploadForm.get("archivos").setValue(this.uploader.files[i]);
        formData.append("archivos[]", this.uploadForm.get("archivos").value);
      }
      this.archService.guardarImagen(formData).subscribe(
        (resul: Array<string>) => {
          this.mascotaSuccess(
            resul,
            this.mascota,
            `Se ha guardado correctamente la imagen para ${this.mascota.nombre}`
          );
        },
        () =>
          this.mascotaError(
            this.mascota,
            `No se ha podido guardar la imagen de la mascota ${this.mascota.nombre}`
          )
      );
    }
  }

  private mascotaSuccess(
    resul: Array<string>,
    mascota: IMascota,
    strSuccess: string
  ) {
    let path: string = resul.length > 0 ? resul[0] : null;
    mascota.imagen = path;
    this.isSubmitting = false;
    this.showError(strSuccess, "success");
    console.log(`---${strSuccess}---`);
  }

  private mascotaError(mascota: IMascota, strError: string) {
    this.isSubmitting = false;
    this.showError(strError, "error");
    console.log(`---${strError}---`);
  }

  private showError(
    strError: string,
    clase: string = "",
    time: number = 2000,
    pos: MatSnackBarVerticalPosition = "top"
  ) {
    this.snackBar.open(strError, "", {
      duration: time,
      verticalPosition: pos,
      panelClass: clase,
    });
  }
}
