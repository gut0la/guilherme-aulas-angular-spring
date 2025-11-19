import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AvaliacaoService, Avaliacao } from '../../services/avaliacao.service';

@Component({
  selector: 'app-minhas-avaliacoes',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './minhas-avaliacoes.component.html',
  styleUrl: './minhas-avaliacoes.component.scss'
})
export class MinhasAvaliacoesComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];

  constructor(private avaliacaoService: AvaliacaoService) {}

  ngOnInit() {
    this.carregarMinhasAvaliacoes();
  }

  carregarMinhasAvaliacoes() {
    this.avaliacaoService.listarMinhasAvaliacoes().subscribe({
      next: (avaliacoes) => this.avaliacoes = avaliacoes,
      error: (error) => console.error('Erro ao carregar avaliações:', error)
    });
  }
}