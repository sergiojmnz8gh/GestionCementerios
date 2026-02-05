import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditarPerfil } from "./components/editar-perfil/editar-perfil";
import { MisCementerios } from "./components/mis-cementerios/mis-cementerios";

@Component({
  selector: 'app-ayuntamiento',
  imports: [MisCementerios, EditarPerfil],
  templateUrl: './ayuntamiento.html',
  styleUrl: './ayuntamiento.scss',
})
export class Ayuntamiento {
  vista: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['vista']) {
        this.vista = data['vista'];
      } else {
        this.vista = 'mis-cementerios';
      }
    });
  }
}
