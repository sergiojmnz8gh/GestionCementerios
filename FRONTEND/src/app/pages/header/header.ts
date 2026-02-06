import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { animate, stagger } from 'animejs';
import { Auth } from '../../services/auth/auth';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(public auth: Auth, public router: Router, public themeService: ThemeService) {
  }

  ngAfterViewInit() {
    animate('.nombre-animado .letra', {
      translateY: [-20, 0],
      opacity: [0, 1],
      rotateX: [-90, 0],

      delay: stagger(100, { start: 500 }),
      duration: 1200,
      easing: 'out-elastic(1, .6)'
    });
  }

  esInicio(): boolean {
    return this.router.url == '/' || this.router.url == '/inicio';
  }

  logout() {
    this.auth.logout();
  }
}
