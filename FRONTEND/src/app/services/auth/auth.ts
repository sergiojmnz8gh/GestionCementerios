import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private authApi_URL = 'http://localhost:8080/api/auth/registrar/ciudadano';

  constructor(private http: HttpClient) {}

  registrarCiudadano(ciudadano: any): Observable<any> {
    return this.http.post(this.authApi_URL, ciudadano);
  }
}