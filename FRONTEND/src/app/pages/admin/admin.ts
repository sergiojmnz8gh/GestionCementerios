import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { ListaAyuntamientos } from './components/lista-ayuntamientos/lista-ayuntamientos';
import { ListaCementerios } from './components/lista-cementerios/lista-cementerios';
import { ListaCiudadanos } from './components/lista-ciudadanos/lista-ciudadanos';
import { ListaConcesiones } from './components/lista-concesiones/lista-concesiones';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ListaCiudadanos, ListaAyuntamientos, ListaCementerios, ListaConcesiones],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  vista: string = 'ciudadanos';

  constructor(private auth: Auth) {}

  logout() {
    this.auth.logout();
  }
}
