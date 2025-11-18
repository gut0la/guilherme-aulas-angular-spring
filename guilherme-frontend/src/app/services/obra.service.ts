import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Genero {
  id?: number;
  nome: string;
}

export interface Obra {
  id?: number;
  titulo: string;
  autor: string;
  genero?: string;
  generos?: Genero[];
  anoLancamento: number;
  anoPublicacao?: number; // Manter compatibilidade
  descricao: string;
  tipo?: string;
  notaMedia?: number;
}

@Injectable({ providedIn: 'root' })
export class ObraService {
  private apiUrl = 'http://localhost:8080/obras';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Obra[]> {
    return this.http.get<Obra[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Obra> {
    return this.http.get<Obra>(`${this.apiUrl}/${id}`);
  }

  salvar(obra: Obra): Observable<Obra> {
    return this.http.post<Obra>(this.apiUrl, obra);
  }

  atualizar(id: number, obra: Obra): Observable<Obra> {
    return this.http.put<Obra>(`${this.apiUrl}/${id}`, obra);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarPorGenero(genero: string): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${this.apiUrl}/genero/${genero}`);
  }

  buscarPorTipo(tipo: string): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${this.apiUrl}/tipo/${tipo}`);
  }
}