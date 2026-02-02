import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private authApi_URL = 'http://localhost:8080/api/auth';
  public rol = signal<string>("");  
  router = inject(Router);

  constructor(private http: HttpClient) {
    this.setRol();
  }

  registrarCiudadano(ciudadano: any): Observable<any> {
    return this.http.post(this.authApi_URL + '/registrar/ciudadano', ciudadano);
  }

  registrarAyuntamiento(ayuntamiento: any): Observable<any> {
    return this.http.post(this.authApi_URL + '/registrar/ayuntamiento', ayuntamiento);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(this.authApi_URL + '/login', credenciales)
    .pipe(tap((res: any) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.setRol();
      }
    }));
  }

  setRol() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.rol.set(decoded.rol);
      } catch (error) {
        this.logout();
      }
    }
  }

  getRol() {
    return this.rol;
  }

  redireccionarPorRol() {
    this.setRol();
    switch (this.rol()) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'CIUDADANO':
        this.router.navigate(['/ciudadano']);
        break;
      case 'AYUNTAMIENTO':
        this.router.navigate(['/ayuntamiento']);
        break;
      default:
      this.router.navigate(['/login']);
      break;
    }
  }


  logout() {
    localStorage.removeItem('token');
    this.rol.set("");
    this.router.navigate(['/login']);
  }
}