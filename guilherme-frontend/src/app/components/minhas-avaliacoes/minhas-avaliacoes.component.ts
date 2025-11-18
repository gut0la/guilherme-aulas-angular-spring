import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AvaliacaoService, Avaliacao } from '../../services/avaliacao.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-minhas-avaliacoes',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './minhas-avaliacoes.component.html',
  styleUrl: './minhas-avaliacoes.component.scss'
})
export class MinhasAvaliacoesComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];
  loading = true;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarMinhasAvaliacoes();
  }

  carregarMinhasAvaliacoes() {
    this.loading = true;
    const usuario = this.authService.getUsuario();
    if (usuario?.id) {
      this.avaliacaoService.listarPorUsuario(usuario.id).subscribe({
        next: (avaliacoes) => {
          this.avaliacoes = avaliacoes;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar avaliações:', error);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  verObra(obraId: number) {
    this.router.navigate(['/obra', obraId]);
  }

  getStars(nota: number): string[] {
    const stars = [];
    const fullStars = Math.floor(nota / 2);
    const hasHalfStar = nota % 2 >= 1;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    
    if (hasHalfStar) {
      stars.push('star_half');
    }
    
    while (stars.length < 5) {
      stars.push('star_border');
    }
    
    return stars;
  }
}