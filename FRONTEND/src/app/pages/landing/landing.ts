import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CementerioService } from '../../services/cementerioService/cementerio-service';
import { GeoApi } from '../../services/geoApi/geo-api';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit {
  provincias: any[] = [];
  localidades: any[] = [];
  cementerios: any[] = [];
  form: FormGroup;
  form2: FormGroup;
  busquedaDifunto: string = '';
  totalCementerios: number = 33;

  constructor(private geoApi: GeoApi,private cementerioService: CementerioService, private relo: ChangeDetectorRef, private router: Router) {
    this.form = new FormGroup({
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      cementerio: new FormControl('', [Validators.required]),
    });
    this.form2 = new FormGroup({
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  buscarDifunto() {

  }

  irACementerio() {
    
  }

  solicitarAdhesion() {
    
  }

  ngOnInit() {
    this.geoApi.getProvincias().subscribe({
      next: (datos) => {
        this.provincias = datos;
        this.relo.markForCheck();
      }
    });

    this.form.get('localidad')?.valueChanges.subscribe(localidad => {
      if (localidad) {
        this.cargarCementeriosPorLocalidad(localidad);
      } else {
        this.cementerios = [];
      }
    });
  }

  cargarCementeriosPorLocalidad(localidad: string) {
    this.cementerioService.listarPorLocalidad(localidad).subscribe({
      next: (datos) => {
        this.cementerios = datos;
        this.relo.markForCheck();
      },
      error: () => {
        this.cementerios = [];
      }
    });
  }

  onProvinciaChange() {
    const codProv = this.form.get('provincia')?.value;
    if (codProv) {
      this.geoApi.getLocalidades(codProv).subscribe({
        next: (datos) => {
          this.localidades = datos;
          this.form.get('localidad')?.setValue('');
          this.relo.markForCheck();
        }
      });
    }
  }

  onProvinciaChange2() {
    const codProv = this.form2.get('provincia')?.value;
    if (codProv) {
      this.geoApi.getLocalidades(codProv).subscribe({
        next: (datos) => {
          this.localidades = datos;
          this.form2.get('localidad')?.setValue('');
          this.relo.markForCheck();
        }
      });
    }
  }

  getCementerios() {
    const codProv = this.form2.get('provincia')?.value;
    
  }
}