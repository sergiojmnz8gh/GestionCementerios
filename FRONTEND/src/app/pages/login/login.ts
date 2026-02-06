import { ChangeDetectorRef, Component } from '@angular/core';
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
  errorLogin: boolean = false;

  constructor(private usuario: Auth, private cdr: ChangeDetectorRef) {}

  acceder () {
    this.errorLogin = false;
    const credenciales = { email: this.email, password: this.password };

    this.usuario.login(credenciales).subscribe({
      next: () => {
        this.usuario.redireccionarPorRol();
      },
      error: (err) => {
        this.errorLogin = true;
        this.cdr.detectChanges();
      }
    });
  }
}