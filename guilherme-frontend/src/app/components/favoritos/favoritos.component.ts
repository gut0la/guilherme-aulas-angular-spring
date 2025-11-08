import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ObraService } from '../../services/obra.service';
import { Obra } from '../../models/obra.model';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit {
  favoritos: Obra[] = [];

  constructor(private obraService: ObraService) {}

  ngOnInit() {
    this.carregarFavoritos();
  }

  carregarFavoritos() {
    this.obraService.listarFavoritos().subscribe({
      next: (obras) => this.favoritos = obras,
      error: (error) => console.error('Erro ao carregar favoritos:', error)
    });
  }
}