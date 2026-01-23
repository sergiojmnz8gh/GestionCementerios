import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ciudadano } from '../../../../interfaces/ciudadano';
import { CiudadanoService } from '../../../../services/ciudadanoService/ciudadano-service';
import { FormCiudadano } from '../form-ciudadano/form-ciudadano';

@Component({
  selector: 'app-lista-ciudadanos',
  imports: [CommonModule, FormsModule, FormCiudadano],
  templateUrl: './lista-ciudadanos.html',
  styleUrl: './lista-ciudadanos.scss',
})
export class ListaCiudadanos implements OnInit {
  ciudadanos: Ciudadano[] = [];
  cargando: boolean = true;
  buscando: string = '';
  mostrarModal = false;
  ciudadanoSeleccionado: Ciudadano | null = null;

  constructor(
    private ciudadanoService: CiudadanoService, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarCiudadanos();
  }

  cargarCiudadanos(): void {
    this.cargando = true;
    this.ciudadanoService.listarTodos().subscribe({
      next: (data) => {
        this.ciudadanos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar ciudadanos', err);
        this.cargando = false;
      }
    });
  }

  get ciudadanosFiltrados(): Ciudadano[] {
    if (!this.buscando.trim()) {
      return this.ciudadanos;
    }
    const texto = this.buscando.toLowerCase();
    return this.ciudadanos.filter(c => 
      c.nombre.toLowerCase().includes(texto) ||
      c.apellidos.toLowerCase().includes(texto) ||
      c.dni.toLowerCase().includes(texto) ||
      c.email.toLowerCase().includes(texto)
    );
  }

  verDetalles(ciudadano: Ciudadano): void {
    
  }

  abrirModal() {
    this.ciudadanoSeleccionado = null;
    this.mostrarModal = true;
  }

  editarCiudadano(c: Ciudadano) {
    this.ciudadanoSeleccionado = c;
    this.mostrarModal = true;
  }

  procesarGuardado(datos: any) {
    if (this.ciudadanoSeleccionado) {
      this.ciudadanoService.actualizar(this.ciudadanoSeleccionado.id, datos).subscribe({
        next: () => this.finalizarAccion('Ciudadano actualizado'),
        error: (err: any) => console.error(err)
      });
    } else {
      this.ciudadanoService.crear(datos).subscribe({
        next: () => this.finalizarAccion('Ciudadano creado'),
        error: (err: any) => console.error(err)
      });
    }
  }

  private finalizarAccion(mensaje: string) {
    this.mostrarModal = false;
    this.cargarCiudadanos();
  }

  eliminarCiudadano(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ciudadano?')) {
      this.ciudadanoService.eliminar(id).subscribe({
        next: () => {
          this.cargarCiudadanos();
        },
        error: (err) => {
          console.error('Error al eliminar ciudadano', err);
        }
      });
    }
  }
}