import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Footer } from './pages/footer/footer';
import { Header } from './pages/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FRONTEND');

  
}