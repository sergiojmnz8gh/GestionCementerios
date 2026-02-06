import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Footer } from './pages/footer/footer';
import { Header } from './pages/header/header';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('FRONTEND');

  constructor(public themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.initTema();
  }
}