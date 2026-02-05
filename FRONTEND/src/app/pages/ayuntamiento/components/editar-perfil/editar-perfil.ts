import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ayuntamiento } from '../../../../interfaces/ayuntamiento';
import { AyuntamientoService } from '../../../../services/ayuntamientoService/ayuntamiento-service';

@Component({
  selector: 'app-editar-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.scss',
})
export class EditarPerfil implements OnInit {
  ayuntamientoParaEditar: Ayuntamiento | null = null;
  perfilForm: FormGroup;
  logo = signal<string | null>(null);
  logoArchivo: File | null = null;

  constructor(private relo: ChangeDetectorRef, private ayuntamientoService: AyuntamientoService) {
    this.perfilForm = new FormGroup({
      logo: new FormControl(''),
      telefono: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.ayuntamientoService.obtenerPerfilActual().subscribe({
      next: (ayuntamiento: Ayuntamiento) => {
        this.ayuntamientoParaEditar = ayuntamiento;
        this.perfilForm.patchValue(ayuntamiento);

        if (ayuntamiento.logoUrl) {
          this.logo.set("logos/" + ayuntamiento.logoUrl);
        }

      },
      error: (err: any) => console.error('No se pudo cargar el perfil', err)
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

  actualizar() {
    if (this.perfilForm.invalid || !this.ayuntamientoParaEditar) return;

    const datosFinales = {
      ...this.perfilForm.value
    };

    this.ayuntamientoService.actualizar(this.ayuntamientoParaEditar.id, datosFinales).subscribe({
      next: () => alert('Perfil actualizado con éxito'),
      error: (err: any) => console.error(err)
    });
  }
}
