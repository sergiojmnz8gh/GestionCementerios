import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cementerio } from '../../../../interfaces/cementerio';
import { GeoApi } from '../../../../services/geoApi/geo-api';

@Component({
  selector: 'app-form-cementerio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-cementerio.html',
  styleUrl: './form-cementerio.scss',
})
export class FormCementerio {
  @Input() cementerioParaEditar: Cementerio | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();
  provincias: any[] = [];
  localidades: any[] = [];
  registroForm: FormGroup;
  fotoAerea = signal<string | null>(null);
  fotoAereaArchivo: File | null = null;

  constructor(private cdr: ChangeDetectorRef, private geoApi: GeoApi) {
    this.registroForm = new FormGroup({
      localidadAyuntamiento: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.geoApi.getProvincias().subscribe({
      next: (datos) => {
        this.provincias = datos;
        this.cdr.markForCheck();
      }
    });

    if (this.cementerioParaEditar) {
      this.registroForm.patchValue(this.cementerioParaEditar);
    }
  }

  onProvinciaChange() {
    const codProv = this.registroForm.get('provincia')?.value;
    if (codProv) {
      this.geoApi.getLocalidades(codProv).subscribe({
        next: (datos) => {
          this.localidades = datos;
          this.registroForm.get('localidadAyuntamiento')?.setValue('');
          this.cdr.markForCheck();
        }
      });
    }
  }

  fotoSubida(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fotoAereaArchivo = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.fotoAerea.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  enviar() {
    if (this.registroForm.invalid) return;

    const valores = { ...this.registroForm.value };

    this.guardar.emit({
      datos: valores,
      archivo: this.fotoAereaArchivo
    });
  }
}
