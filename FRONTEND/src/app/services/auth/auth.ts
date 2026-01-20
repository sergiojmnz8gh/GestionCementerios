import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private authApi_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  registrarCiudadano(ciudadano: any): Observable<any> {
    return this.http.post(this.authApi_URL + '/registrar/ciudadano', ciudadano);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(this.authApi_URL + '/login', credenciales)
    .pipe(tap((res: any) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
    }));
  }
}