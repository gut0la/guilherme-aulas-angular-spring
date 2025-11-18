import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ObraService, Obra } from '../../services/obra.service';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit {
  favoritos: Obra[] = [];
  loading = true;

  constructor(
    private obraService: ObraService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarFavoritos();
  }

  carregarFavoritos() {
    this.loading = true;
    // Simulando carregamento de favoritos
    setTimeout(() => {
      this.favoritos = [];
      this.loading = false;
    }, 1000);
  }

  verDetalhes(obraId: number) {
    this.router.navigate(['/obra', obraId]);
  }

  removerFavorito(obra: Obra) {
    this.favoritos = this.favoritos.filter(f => f.id !== obra.id);
  }

  getTipoIcon(tipo: string | undefined): string {
    switch(tipo?.toLowerCase()) {
      case 'livro': return 'book';
      case 'filme': return 'movie';
      case 'serie': return 'tv';
      case 'jogo': return 'sports_esports';
      default: return 'library_books';
    }
  }
}