import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { GeoApi } from '../../services/geoApi/geo-api';
import { validadores } from '../../validadores';

@Component({
  selector: 'app-registro-ciudadano',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-ciudadano.html',
  styleUrl: './registro-ciudadano.scss',
})
export class RegistroCiudadano implements OnInit {
  
  registroForm: FormGroup;
  provincias: any[] = [];
  localidades: any[] = [];

  constructor(private geoApi: GeoApi,private ciudadano: Auth, private relo: ChangeDetectorRef) {
    this.registroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl('', [Validators.required, validadores.dni]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repetirPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      telefono: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required, validadores.fechaEsAnterior(new Date())]),
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

  enviarRegistro() {
    if (this.registroForm.valid) {
      const nombreProvincia = this.provincias.find(p => p.CPRO === this.registroForm.value.provincia)?.PRO;
      this.registroForm.get('provincia')?.setValue(nombreProvincia);
      const datos = this.registroForm.value;

      this.ciudadano.registrarCiudadano(datos).subscribe({
        next: (respuesta) => {
          console.log('¡Guardado en el Backend!', respuesta);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
        }
      });
      console.log(datos);
    }
  }
}