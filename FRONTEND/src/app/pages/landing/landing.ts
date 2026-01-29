import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GeoApi } from '../../services/geoApi/geo-api';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
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
  totalCementerios: number = 10;

  constructor(private geoApi: GeoApi, private relo: ChangeDetectorRef) { 
    this.form = new FormGroup({
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
    });
    this.form2 = new FormGroup({
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
    });
  }

  buscarDifunto() {

  }

  irACementerio() {
    
  }

  ngOnInit() {
    this.geoApi.getProvincias().subscribe({
      next: (datos) => {
        this.provincias = datos;
        this.relo.markForCheck();
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
}