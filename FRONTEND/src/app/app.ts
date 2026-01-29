import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { Auth } from './services/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FRONTEND');

  constructor(public auth: Auth) {
  }

  logout() {
    this.auth.logout();
  }
}