import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ciudadano } from '../../../../interfaces/ciudadano';
import { CiudadanoService } from '../../../../services/ciudadanoService/ciudadano-service';

@Component({
  selector: 'app-lista-ciudadanos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-ciudadanos.html',
  styleUrl: './lista-ciudadanos.scss',
})
export class ListaCiudadanos implements OnInit {
  ciudadanos: Ciudadano[] = [];
  cargando: boolean = true;
  buscando: string = '';

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

  abrirModalCrear(): void {
  }

  verDetalles(ciudadano: Ciudadano): void {
  }

  editarCiudadano(ciudadano: Ciudadano): void {
  }

  eliminarCiudadano(id: number): void {
    
  }
}