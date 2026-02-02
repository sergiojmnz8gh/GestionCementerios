import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concesion } from '../../interfaces/concesion';

@Injectable({
  providedIn: 'root',
})
export class ConcesionService {
  private concesionApi_URL = 'http://localhost:8080/api/concesion';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Concesion[]> {
    return this.http.get<Concesion[]>(this.concesionApi_URL);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.concesionApi_URL + '/eliminar/' + id);
  }
}
