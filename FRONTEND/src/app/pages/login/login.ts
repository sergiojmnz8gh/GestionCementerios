import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = "";
  password: string = "";

  constructor(private usuario: Auth) {}

  acceder () {
    const credenciales = { email: this.email, password: this.password };

    this.usuario.login(credenciales).subscribe({
      next: (res) => {
        console.log("Login exitoso", res);
      },
      error: (err) => {
        console.error("Error en el login", err);
      }
    });
  }
}