import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ViaCepResponse} from './models/via-cep.model';

// INJECTABLE SERVE PARA INJETAR SERVIÇOS EM COMPONENTES OU OUTROS SERVIÇOS
@Injectable({
  // PROVIDEDIN SERVE PARA INDICAR ONDE O SERVIÇO SERÁ DISPONIBILIZADO
  // ROOT SIGNIFICA QUE O SERVIÇO SERÁ DISPONIBILIZADO EM TODA A APLICAÇÃO
  providedIn: 'root'
})
// O SERVIÇO QUE FAZ A REQUISIÇÃO PARA A API DO VIA CEP
export class ViacepService {
  // A BASE URL DA API DO VIA CEP
  private baseUrl = 'https://viacep.com.br/ws';

  // INJECTA O HTTPCLIENT PARA FAZER REQUISIÇÕES HTTP
  // HTTPCLIENT SERVE PARA FAZER REQUISIÇÕES HTTP
  // PENSA COMO SE FOSSE O FETCH DO JAVASCRIPT
  constructor(private http: HttpClient) {}

  // O MÉTODO QUE FAZ A REQUISIÇÃO PARA A API DO VIA CEP
  // E RETORNA UM OBSERVABLE COM A RESPOSTA TIPADA
  // REPASSA O CEP PARA A URL DA API
  // PARA UTILIZAR NO COMPONENTE, BASTA INJETAR ESSE SERVIÇO E CHAMAR ESSE MÉTODO
  public buscarCep(cep: string): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`${this.baseUrl}/${cep}/json/`);
  }
}
