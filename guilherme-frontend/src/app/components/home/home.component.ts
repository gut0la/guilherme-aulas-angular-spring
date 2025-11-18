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
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  obras: Obra[] = [];
  loading = true;

  constructor(
    private obraService: ObraService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarObras();
  }

  carregarObras() {
    this.loading = true;
    this.obraService.listarTodas().subscribe({
      next: (obras) => {
        this.obras = obras;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar obras:', error);
        this.loading = false;
      }
    });
  }

  verDetalhes(obraId: number) {
    this.router.navigate(['/obra', obraId]);
  }

  getTipoIcon(tipo: string | undefined): string {
    switch(tipo?.toLowerCase()) {
      case 'filme': return 'movie';
      case 'serie': return 'tv';
      case 'anime': return 'animation';
      default: return 'library_books';
    }
  }
}
