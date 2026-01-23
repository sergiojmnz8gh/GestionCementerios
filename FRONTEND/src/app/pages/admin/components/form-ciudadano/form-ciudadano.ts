import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ciudadano } from '../../../../interfaces/ciudadano';
import { GeoApi } from '../../../../services/geoApi/geo-api';
import { validadores } from '../../../../validadores';

@Component({
  selector: 'app-form-ciudadano',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-ciudadano.html'
})
export class FormCiudadano implements OnInit {
  @Input() ciudadanoParaEditar: Ciudadano | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  registroForm: FormGroup;
  provincias: any[] = [];
  localidades: any[] = [];

  constructor(private geoApi: GeoApi, private relo: ChangeDetectorRef) {
    this.registroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl('', [Validators.required, validadores.dni]),
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
        this.relo.markForCheck();
      }
    });

    if (this.ciudadanoParaEditar) {
      this.registroForm.patchValue(this.ciudadanoParaEditar);
    }
  }

  onProvinciaChange() {
    const codProv = this.registroForm.get('provincia')?.value;
    if (codProv) {
      this.geoApi.getLocalidades(codProv).subscribe({
        next: (datos) => {
          this.localidades = datos;
          this.registroForm.get('localidad')?.setValue(''); 
          this.relo.markForCheck();
        }
      });
    }
  }

  enviar() {
  if (this.registroForm.invalid) return;
  const nombreProv = this.provincias.find(p => p.CPRO === this.registroForm.value.provincia)?.PRO;

  if (nombreProv) {
    this.registroForm.patchValue({ provincia: nombreProv });
  }

  this.guardar.emit(this.registroForm.value);
  }
}