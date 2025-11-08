import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  cadastrar() {
    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.authService.cadastrar(usuario).subscribe({
      next: () => {
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro no cadastro:', error);
        this.snackBar.open('Erro no cadastro. Por favor, tente novamente.', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }
}
