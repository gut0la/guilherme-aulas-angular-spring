import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  cadastrar() {
    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.usuarioService.cadastrar(usuario).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro no cadastro:', error);
        alert('Erro ao cadastrar usuário');
      }
    });
  }
}
