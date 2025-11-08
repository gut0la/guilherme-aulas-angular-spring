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
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  login() {
    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/home']).then(r => r);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.snackBar.open('Erro no login. Por favor, tente novamente.', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }
}
