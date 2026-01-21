import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Ciudadano } from '../../../../interfaces/ciudadano';
import { CiudadanoService } from '../../../../services/ciudadanoService/ciudadano-service';

@Component({
  selector: 'app-lista-ciudadanos',
  imports: [CommonModule],
  templateUrl: './lista-ciudadanos.html',
  styleUrl: './lista-ciudadanos.scss',
})
export class ListaCiudadanos implements OnInit {
  ciudadanos: Ciudadano[] = [];
  cargando: boolean = true;

  constructor(private ciudadanoService: CiudadanoService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarCiudadanos();
  }

  cargarCiudadanos(): void {
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
}
