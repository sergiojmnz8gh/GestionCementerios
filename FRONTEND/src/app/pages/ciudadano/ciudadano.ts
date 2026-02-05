import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MisConcesiones } from "../ciudadano/components/mis-concesiones/mis-concesiones";
import { EditarPerfil } from "./components/editar-perfil/editar-perfil";

@Component({
  selector: 'app-ciudadano',
  imports: [MisConcesiones, EditarPerfil],
  templateUrl: './ciudadano.html',
  styleUrl: './ciudadano.scss',
})
export class Ciudadano {
  vista: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['vista']) {
        this.vista = data['vista'];
      } else {
        this.vista = 'mis-concesiones';
      }
    });
  }
}
