import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cementerio } from '../../interfaces/cementerio';

@Injectable({
  providedIn: 'root',
})
export class CementerioService {
  private cementerioApi_URL = 'http://localhost:8080/api/cementerio';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Cementerio[]> {
    return this.http.get<Cementerio[]>(this.cementerioApi_URL);
  }

  listarPorId(id: number): Observable<Cementerio> {
    return this.http.get<Cementerio>(this.cementerioApi_URL + '/' + id);
  }

  listarPorLocalidad(localidad: string): Observable<Cementerio[]> {
    const localidadEscapada = encodeURIComponent(localidad);
    return this.http.get<Cementerio[]>(this.cementerioApi_URL + '/localidad/' + localidadEscapada);
  }
}