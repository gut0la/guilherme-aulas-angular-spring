import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmaSenha = '';
  loading = false;
  errors: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  validarFormulario(): boolean {
    this.errors = {};
    let valido = true;

    if (!this.nome.trim()) {
      this.errors.nome = 'Nome é obrigatório';
      valido = false;
    }

    if (!this.email.trim()) {
      this.errors.email = 'Email é obrigatório';
      valido = false;
    } else if (!this.isValidEmail(this.email)) {
      this.errors.email = 'Email inválido';
      valido = false;
    }

    if (!this.senha) {
      this.errors.senha = 'Senha é obrigatória';
      valido = false;
    } else if (this.senha.length < 6) {
      this.errors.senha = 'Senha deve ter pelo menos 6 caracteres';
      valido = false;
    }

    if (this.senha !== this.confirmaSenha) {
      this.errors.confirmaSenha = 'Senhas não coincidem';
      valido = false;
    }

    return valido;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  cadastrar() {
    if (!this.validarFormulario()) {
      return;
    }

    this.loading = true;
    const usuario = {
      nome: this.nome.trim(),
      email: this.email.trim().toLowerCase(),
      senha: this.senha
    };

    this.authService.cadastrar(usuario).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro no cadastro:', error);
        const message = error.error?.message || 'Erro no cadastro. Por favor, tente novamente.';
        this.snackBar.open(message, 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
