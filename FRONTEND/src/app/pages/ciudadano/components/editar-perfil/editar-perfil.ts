import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ciudadano } from '../../../../interfaces/ciudadano';
import { CiudadanoService } from '../../../../services/ciudadanoService/ciudadano-service';
import { GeoApi } from '../../../../services/geoApi/geo-api';

@Component({
  selector: 'app-editar-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.scss',
})
export class EditarPerfil implements OnInit {
  ciudadanoParaEditar: Ciudadano | null = null;
  perfilForm: FormGroup;
  provincias: any[] = [];
  localidades: any[] = [];

  constructor(private geoApi: GeoApi, private relo: ChangeDetectorRef, private ciudadanoService: CiudadanoService) {
    this.perfilForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.geoApi.getProvincias().subscribe({
      next: (datos) => {
        this.provincias = datos;
        this.cargarUsuario();
      }
    });
  }

  cargarUsuario() {
    this.ciudadanoService.obtenerPerfilActual().subscribe({
    next: (ciudadano: Ciudadano) => {
      this.ciudadanoParaEditar = ciudadano;
      
      this.perfilForm.patchValue(ciudadano);

      const provEncontrada = this.provincias.find(p => p.PRO == ciudadano.provincia);
      if (provEncontrada) {
        this.perfilForm.get('provincia')?.setValue(provEncontrada.CPRO);
        
        this.geoApi.getLocalidades(provEncontrada.CPRO).subscribe(locs => {
          this.localidades = locs;
          this.perfilForm.get('localidad')?.setValue(ciudadano.localidad);
          this.relo.markForCheck();
        });
      }
    },
  });
  }

  onProvinciaChange() {
    const codProv = this.perfilForm.get('provincia')?.value;
    if (codProv) {
      this.geoApi.getLocalidades(codProv).subscribe({
        next: (datos) => {
          this.localidades = datos;
          this.perfilForm.get('localidad')?.setValue('');
          this.relo.markForCheck();
        }
      });
    }
  }

  actualizar() {
    if (this.perfilForm.invalid || !this.ciudadanoParaEditar) return;

  const nombreProv = this.provincias.find(p => p.CPRO == this.perfilForm.value.provincia)?.PRO;
  const datosFinales = {
    ...this.perfilForm.value,
    provincia: nombreProv
  };

  this.ciudadanoService.actualizar(this.ciudadanoParaEditar.id, datosFinales);
  }
}
