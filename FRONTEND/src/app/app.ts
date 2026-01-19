import { Component, signal } from '@angular/core';
import { Login } from './components/login/login';
import { RegistroCiudadano } from './components/registro-ciudadano/registro-ciudadano';

@Component({
  selector: 'app-root',
  imports: [Login, RegistroCiudadano],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FRONTEND');
}