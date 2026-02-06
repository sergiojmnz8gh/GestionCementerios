import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cementerio } from '../../../../interfaces/cementerio';
import { CementerioService } from '../../../../services/cementerioService/cementerio-service';
import { FormCementerio } from "../form-cementerio/form-cementerio";

@Component({
  selector: 'app-lista-cementerios',
  imports: [FormsModule, FormCementerio],
  templateUrl: './lista-cementerios.html',
  styleUrl: './lista-cementerios.scss',
})
export class ListaCementerios implements OnInit {
  cementerios: Cementerio[] = [];
  cargando: boolean = true;
  buscando: string = '';
  mostrarModal = false;
  cementerioSeleccionado: Cementerio | null = null;


  constructor(
    private cementerioService: CementerioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarCementerios();
  }

  cargarCementerios(): void {
    this.cargando = true;
    this.cementerioService.listarTodos().subscribe({
      next: (data) => {
        this.cementerios = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  get cementeriosFiltrados(): Cementerio[] {
    if (!this.buscando.trim()) return this.cementerios;
    const texto = this.buscando.toLowerCase();
    return this.cementerios.filter(c =>
      c.nombre.toLowerCase().includes(texto) ||
      c.localidadAyuntamiento.toLowerCase().includes(texto)
    );
  }

  eliminarCementerio(id: number): void {
    if (confirm('¿Eliminar este cementerio? Esto borrará sus zonas y nichos.')) {
      this.cementerioService.eliminar(id).subscribe(() => this.cargarCementerios());
    }
  }

  verMapa(id: number) {
  }

  abrirModal() {
      this.cementerioSeleccionado = null;
      this.mostrarModal = true;
    }
  
    editarCementerio(c: Cementerio) {
      this.cementerioSeleccionado = c;
      this.mostrarModal = true;
    }
  
    procesarGuardado(event: { datos: any, archivo: File | null }) {
      const formData = new FormData();
      formData.append('nombre', event.datos.nombre);
      formData.append('direccion', event.datos.direccion);
      if (event.archivo) {
        formData.append('fotoAerea', event.archivo);
      }
      if (this.cementerioSeleccionado) {
        this.cementerioService.actualizar(this.cementerioSeleccionado.id, formData).subscribe({
          next: () => this.finalizarAccion('Cementerio actualizado'),
        });
      } else {
        this.cementerioService.registrar(formData).subscribe({
          next: () => this.finalizarAccion('Cementerio creado'),
        });
      }
    }
  
    private finalizarAccion(mensaje: string) {
      this.mostrarModal = false;
      this.cargarCementerios();
    }
}