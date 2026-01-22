import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ayuntamiento } from '../../../../interfaces/ayuntamiento';
import { AyuntamientoService } from '../../../../services/ayuntamientoService/ayuntamiento-service';

@Component({
  selector: 'app-lista-ayuntamientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-ayuntamientos.html',
  styleUrl: './lista-ayuntamientos.scss',
})
export class ListaAyuntamientos implements OnInit {
  ayuntamientos: Ayuntamiento[] = [];
  cargando: boolean = true;
  buscando: string = '';

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

  abrirModalCrear(): void {

  }

  verDetalles(ayto: Ayuntamiento): void {

  }

  eliminarAyuntamiento(id: number): void {

  }
}