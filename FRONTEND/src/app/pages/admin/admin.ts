import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListaCiudadanos } from './components/lista-ciudadanos/lista-ciudadanos';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ListaCiudadanos],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  vista: string = 'ciudadanos';

  
}
