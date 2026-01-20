import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = "";
  password: string = "";

  acceder () {
    console.log("Email:", this.email);
    console.log("Password:", this.password);
  }
}