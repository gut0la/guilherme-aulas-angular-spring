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
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  senha = '';
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

    if (!this.email.trim()) {
      this.errors.email = 'Email é obrigatório';
      valido = false;
    }

    if (!this.senha) {
      this.errors.senha = 'Senha é obrigatória';
      valido = false;
    }

    return valido;
  }

  login() {
    if (!this.validarFormulario()) {
      return;
    }

    this.loading = true;
    this.authService.login(this.email.trim(), this.senha).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro no login:', error);
        const message = error.error?.message || 'Erro no login. Por favor, tente novamente.';
        this.snackBar.open(message, 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
