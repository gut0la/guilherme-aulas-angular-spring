import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from './obra.service';
import {AvaliacaoAbstract} from '../abstracts/avaliacao.abstract';

export interface Avaliacao {
  id?: number;
  nota: number;
  comentario: string;
  obraId: number;
  usuarioId: number;
  dataAvaliacao?: string;
  obra?: Obra;
}

@Injectable({ providedIn: 'root' })
export class AvaliacaoService implements AvaliacaoAbstract {
  private apiUrl = 'http://localhost:8080/avaliacoes';

  constructor(private http: HttpClient) {}

  listarPorObra(obraId: number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/obra/${obraId}`);
  }

  listarMinhasAvaliacoes(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/minhas`);
  }

  criar(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiUrl, avaliacao);
  }

  listarPorUsuario(usuarioId: number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  atualizar(id: number, avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.put<Avaliacao>(`${this.apiUrl}/${id}`, avaliacao);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
