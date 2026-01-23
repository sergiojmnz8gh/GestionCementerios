import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudadano } from '../../interfaces/ciudadano';

@Injectable({
  providedIn: 'root',
})
export class CiudadanoService {
  private ciudadanoApi_URL = 'http://localhost:8080/api/ciudadano';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Ciudadano[]> {
    return this.http.get<Ciudadano[]>(this.ciudadanoApi_URL);
  }

  listarPorId(id: number): Observable<Ciudadano> {
    return this.http.get<Ciudadano>(this.ciudadanoApi_URL + '/' + id);
  }

  crear(datos: any): Observable<Ciudadano> {
    return this.http.post<Ciudadano>(this.ciudadanoApi_URL + '/crear', datos);
  }

  actualizar(id: number, datos: any): Observable<Ciudadano> {
    return this.http.put<Ciudadano>(this.ciudadanoApi_URL + '/actualizar/' + id, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.ciudadanoApi_URL + '/eliminar/' + id);
  }
}
