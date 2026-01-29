import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ayuntamiento } from '../../../../interfaces/ayuntamiento';
import { GeoApi } from '../../../../services/geoApi/geo-api';

@Component({
  selector: 'app-form-ayuntamiento',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-ayuntamiento.html',
  styleUrl: './form-ayuntamiento.scss'
})
export class FormAyuntamiento implements OnInit {
  @Input() ayuntamientoParaEditar: Ayuntamiento | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  registroForm: FormGroup;
  provincias: any[] = [];
  localidades: any[] = [];
  logo = signal<string | null>(null);
  logoArchivo: File | null = null;

  constructor(private geoApi: GeoApi, private relo: ChangeDetectorRef) {
    this.registroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      logo: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.geoApi.getProvincias().subscribe({
      next: (datos) => {
        this.provincias = datos;

        if (this.ayuntamientoParaEditar) {
        const provEncontrada = this.provincias.find(p => p.PRO == this.ayuntamientoParaEditar?.provincia);
        
        if (provEncontrada) {
          this.registroForm.patchValue({ provincia: provEncontrada.CPRO });
          this.cargarLocalidades(provEncontrada.CPRO);
        }
      }

        this.relo.markForCheck();
      }
    });

    if (this.ayuntamientoParaEditar) {
      this.registroForm.patchValue(this.ayuntamientoParaEditar);
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

  private cargarLocalidades(codProv: string) {
    this.geoApi.getLocalidades(codProv).subscribe({
      next: (datos) => {
        this.localidades = datos;
        this.relo.markForCheck();
      }
    });
  }

  fotoSubida(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.logoArchivo = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.logo.set(reader.result as string);
      };
      reader.readAsDataURL(file);
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