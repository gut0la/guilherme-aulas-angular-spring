import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ObraService, Obra } from '../../services/obra.service';
import { AvaliacaoService, Avaliacao } from '../../services/avaliacao.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-obra-detalhes',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './obra-detalhes.component.html',
  styleUrl: './obra-detalhes.component.scss'
})
export class ObraDetalhesComponent implements OnInit {
  obra: Obra | null = null;
  avaliacoes: Avaliacao[] = [];
  novaAvaliacao = { nota: 5, comentario: '' };
  loading = true;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private obraService: ObraService,
    private avaliacaoService: AvaliacaoService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.carregarObra(id);
      this.carregarAvaliacoes(id);
    }
  }

  carregarObra(id: number) {
    this.obraService.buscarPorId(id).subscribe({
      next: (obra) => {
        this.obra = obra;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar obra:', error);
        this.loading = false;
        this.snackBar.open('Erro ao carregar obra', 'Fechar', { duration: 3000 });
      }
    });
  }

  carregarAvaliacoes(id: number) {
    this.avaliacaoService.listarPorObra(id).subscribe({
      next: (avaliacoes) => this.avaliacoes = avaliacoes,
      error: (error) => console.error('Erro ao carregar avaliações:', error)
    });
  }

  adicionarAvaliacao() {
    if (!this.obra || this.novaAvaliacao.nota < 1 || this.novaAvaliacao.nota > 10) {
      this.snackBar.open('Nota deve estar entre 1 e 10', 'Fechar', { duration: 3000 });
      return;
    }

    this.submitting = true;
    const usuario = this.authService.getUsuario();
    const avaliacao: Avaliacao = {
      nota: this.novaAvaliacao.nota,
      comentario: this.novaAvaliacao.comentario,
      obraId: this.obra.id!,
      usuarioId: usuario?.id || 1
    };

    this.avaliacaoService.criar(avaliacao).subscribe({
      next: () => {
        this.carregarAvaliacoes(this.obra!.id!);
        this.novaAvaliacao = { nota: 5, comentario: '' };
        this.submitting = false;
        this.snackBar.open('Avaliação adicionada com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Erro ao criar avaliação:', error);
        this.submitting = false;
        this.snackBar.open('Erro ao adicionar avaliação', 'Fechar', { duration: 3000 });
      }
    });
  }

  voltar() {
    this.router.navigate(['/home']);
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
