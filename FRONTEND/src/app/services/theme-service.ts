import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public modoOscuro= signal<boolean>(localStorage.getItem('tema') == 'oscuro');

  toggleOscuro() {
    this.modoOscuro.set(!this.modoOscuro());
    const tema = this.modoOscuro() ? 'oscuro' : 'claro';
    localStorage.setItem('tema', tema);
    document.documentElement.setAttribute('data-tema', tema);
  }

  initTema() {
    const tema = this.modoOscuro() ? 'oscuro' : 'claro';
    document.documentElement.setAttribute('data-tema', tema);
  }
}