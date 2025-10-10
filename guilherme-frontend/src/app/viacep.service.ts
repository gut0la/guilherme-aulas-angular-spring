import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ViaCepResponse} from './models/via-cep.model';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  public buscarCep(cep: string): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`${this.baseUrl}/${cep}/json/`);
  }
}
