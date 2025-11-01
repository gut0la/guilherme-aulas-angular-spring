import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', { email, senha });
  }

  cadastrar(usuario: any): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/auth/cadastro', usuario);
  }
}