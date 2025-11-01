import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obra.model';

@Injectable({ providedIn: 'root' })
export class ObraService {
  private apiUrl = 'http://localhost:8080/obras';

  constructor(private http: HttpClient) {}

  listar(): Observable<Obra[]> {
    return this.http.get<Obra[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Obra> {
    return this.http.get<Obra>(`${this.apiUrl}/${id}`);
  }

  salvar(obra: Obra): Observable<Obra> {
    return this.http.post<Obra>(this.apiUrl, obra);
  }
}