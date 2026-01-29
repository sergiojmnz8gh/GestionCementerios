import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ayuntamiento } from '../../../../interfaces/ayuntamiento';
import { AyuntamientoService } from '../../../../services/ayuntamientoService/ayuntamiento-service';
import { FormAyuntamiento } from "../form-ayuntamiento/form-ayuntamiento";

@Component({
  selector: 'app-lista-ayuntamientos',
  imports: [CommonModule, FormsModule, FormAyuntamiento],
  templateUrl: './lista-ayuntamientos.html',
  styleUrl: './lista-ayuntamientos.scss',
})
export class ListaAyuntamientos implements OnInit {
  ayuntamientos: Ayuntamiento[] = [];
  cargando: boolean = true;
  buscando: string = '';
  mostrarModal = false;
  ayuntamientoSeleccionado: Ayuntamiento | null = null;

  constructor(
    private ayuntamientoService: AyuntamientoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarAyuntamientos();
  }

  cargarAyuntamientos(): void {
    this.cargando = true;
    this.ayuntamientoService.listarTodos().subscribe({
      next: (data) => {
        this.ayuntamientos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar ayuntamientos', err);
        this.cargando = false;
      }
    });
  }

  get ayuntamientosFiltrados(): Ayuntamiento[] {
    if (!this.buscando.trim()) {
      return this.ayuntamientos;
    }
    const texto = this.buscando.toLowerCase();
    return this.ayuntamientos.filter(a =>
      a.localidad?.toLowerCase().includes(texto) ||
      a.provincia?.toLowerCase().includes(texto) ||
      a.email?.toLowerCase().includes(texto)
    );
  }

  verDetalles(ayto: Ayuntamiento): void {

  }

  abrirModal() {
      this.ayuntamientoSeleccionado = null;
      this.mostrarModal = true;
    }
  
    editarAyuntamiento(a: Ayuntamiento) {
      this.ayuntamientoSeleccionado = a;
      this.mostrarModal = true;
    }

  procesarGuardado(datos: any) {
    if (this.ayuntamientoSeleccionado) {
      this.ayuntamientoService.actualizar(this.ayuntamientoSeleccionado.id, datos).subscribe({
        next: () => this.finalizarAccion('Ayuntamiento actualizado'),
        error: (err: any) => console.error(err)
      });
    } else {
      this.ayuntamientoService.crear(datos).subscribe({
        next: () => this.finalizarAccion('Ayuntamiento creado'),
        error: (err: any) => console.error(err)
      });
    }
  }

  private finalizarAccion(mensaje: string) {
    this.mostrarModal = false;
    this.cargarAyuntamientos();
  }

  eliminarAyuntamiento(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ayuntamiento?')) {
      this.ayuntamientoService.eliminar(id).subscribe({
        next: () => {
          this.cargarAyuntamientos();
        },
        error: (err) => {
          console.error('Error al eliminar ayuntamiento', err);
        }
      });
    }
  }
}