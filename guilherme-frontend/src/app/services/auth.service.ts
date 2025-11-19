import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  public cadastrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, usuario);
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.isLoggedInSubject.next(false);
    await this.router.navigate(['/login']);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
