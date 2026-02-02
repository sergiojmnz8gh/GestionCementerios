import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cementerio } from '../../../../interfaces/cementerio';
import { CementerioService } from '../../../../services/cementerioService/cementerio-service';

@Component({
  selector: 'app-lista-cementerios',
  imports: [FormsModule],
  templateUrl: './lista-cementerios.html',
  styleUrl: './lista-cementerios.scss',
})
export class ListaCementerios implements OnInit {
  cementerios: Cementerio[] = [];
  cargando: boolean = true;
  buscando: string = '';

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
      error: (err) => {
        console.error('Error al cargar cementerios', err);
        this.cargando = false;
      }
    });
  }

  get cementeriosFiltrados(): Cementerio[] {
    if (!this.buscando.trim()) return this.cementerios;
    const texto = this.buscando.toLowerCase();
    return this.cementerios.filter(c =>
      c.nombre.toLowerCase().includes(texto) ||
      c.ayuntamiento.toLowerCase().includes(texto)
    );
  }

  eliminarCementerio(id: number): void {
    if (confirm('¿Eliminar este cementerio? Esto borrará sus zonas y nichos.')) {
      this.cementerioService.eliminar(id).subscribe(() => this.cargarCementerios());
    }
  }

  verMapa(c: Cementerio) {
  }
}