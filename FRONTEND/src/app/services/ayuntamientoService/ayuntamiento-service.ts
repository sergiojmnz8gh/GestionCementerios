import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ayuntamiento } from '../../interfaces/ayuntamiento';

@Injectable({
  providedIn: 'root',
})
export class AyuntamientoService {
  private ayuntamientoApi_URL = 'http://localhost:8080/api/ayuntamiento';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Ayuntamiento[]> {
    return this.http.get<Ayuntamiento[]>(this.ayuntamientoApi_URL);
  }

  listarPorId(id: number): Observable<Ayuntamiento> {
    return this.http.get<Ayuntamiento>(this.ayuntamientoApi_URL + '/' + id);
  }

  actualizar(id: number, datos: any): Observable<Ayuntamiento> {
    return this.http.put<Ayuntamiento>(this.ayuntamientoApi_URL + '/actualizar/' + id, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.ayuntamientoApi_URL + '/eliminar/' + id);
  }
}