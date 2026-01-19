import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeoApi } from '../../services/geo-api';

@Component({
  selector: 'app-registro-ciudadano',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-ciudadano.html',
  styleUrl: './registro-ciudadano.scss',
})
export class RegistroCiudadano implements OnInit {
  provinciaSeleccionada: string = "";
  localidadSeleccionada: string = "";
  provincias: any[] = [];
  localidades: any[] = [];

  constructor(private geoApi: GeoApi, private relo: ChangeDetectorRef) {}

  ngOnInit() {
    this.geoApi.getProvincias().subscribe({
      next: (datos) => {
        this.provincias = datos;
        this.relo.markForCheck();
      },
      error: (error) => console.log(error)
    });
  }

  cambioProvincia() {
    if (this.provinciaSeleccionada) {
      this.geoApi.getLocalidades(this.provinciaSeleccionada).subscribe({
        next: (datos) => {
          this.localidades = datos;
          this.localidadSeleccionada = "";
          this.relo.markForCheck();
        },
        error: (error) => console.log(error),
      });
    } else {
      this.localidades = [];
    }
  }
}