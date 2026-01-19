import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoApi {
  constructor(private http: HttpClient) {}

  getProvincias(): Observable<any[]> {
    return this.http.get<any>('https://apiv1.geoapi.es/provincias?type=JSON&version=2025.07&key=afa1e198020ea7da2ae882fa98583b16ea8f5883b2a0c8ad8be5f4d681a4adb1')
    .pipe(map(resp => resp.data));
  }

  getLocalidades(cprov: string): Observable<any[]> {
    return this.http.get<any>(`https://apiv1.geoapi.es/municipios?CPRO=${cprov}&type=JSON&version=2025.07&key=afa1e198020ea7da2ae882fa98583b16ea8f5883b2a0c8ad8be5f4d681a4adb1`)
    .pipe(map(resp => resp.data));
  }
}
