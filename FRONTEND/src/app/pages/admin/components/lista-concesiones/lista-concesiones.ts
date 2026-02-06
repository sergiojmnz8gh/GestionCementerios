import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Concesion } from '../../../../interfaces/concesion';
import { ConcesionService } from '../../../../services/concesionService/concesion-service';

@Component({
  selector: 'app-lista-concesiones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-concesiones.html',
  styleUrl: './lista-concesiones.scss',
})
export class ListaConcesiones implements OnInit {
  concesiones: Concesion[] = [];
  cargando: boolean = true;
  buscando: string = '';

  constructor(
    private concesionService: ConcesionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarConcesiones();
  }

  cargarConcesiones(): void {
    this.cargando = true;
    this.concesionService.listarTodas().subscribe({
      next: (data) => {
        this.concesiones = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
      }
    });
  }

  get concesionesFiltradas(): Concesion[] {
    if (!this.buscando.trim()) return this.concesiones;
    const texto = this.buscando.toLowerCase();
    return this.concesiones.filter(c =>
      c.ciudadano.toLowerCase().includes(texto) ||
      c.id.toString().includes(texto)
    );
  }

  esExpiracionCercana(fechaFin: Date): boolean {
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const mesesDiferencia = (fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return mesesDiferencia > 0 && mesesDiferencia <= 3;
  }

  renovarConcesion(id: number): void {
    
  }

  eliminarConcesion(id: number): void {
    if (confirm('¿Desea anular esta concesión? Esta acción liberará las parcelas asociadas.')) {
      this.concesionService.eliminar(id).subscribe(() => this.cargarConcesiones());
    }
  }
}