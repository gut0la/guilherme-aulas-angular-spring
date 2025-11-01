import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ObraService } from '../../services/obra.service';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { Obra } from '../../models/obra.model';
import { Avaliacao } from '../../models/avaliacao.model';

@Component({
  selector: 'app-obra-detalhes',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './obra-detalhes.component.html',
  styleUrl: './obra-detalhes.component.scss'
})
export class ObraDetalhesComponent implements OnInit {
  obra: Obra | null = null;
  avaliacoes: Avaliacao[] = [];

  constructor(
    private route: ActivatedRoute,
    private obraService: ObraService,
    private avaliacaoService: AvaliacaoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarObra(id);
    this.carregarAvaliacoes(id);
  }

  carregarObra(id: number) {
    this.obraService.buscarPorId(id).subscribe({
      next: (obra) => this.obra = obra,
      error: (error) => console.error('Erro ao carregar obra:', error)
    });
  }

  carregarAvaliacoes(id: number) {
    this.avaliacaoService.listarPorObra(id).subscribe({
      next: (avaliacoes) => this.avaliacoes = avaliacoes,
      error: (error) => console.error('Erro ao carregar avaliações:', error)
    });
  }
}
