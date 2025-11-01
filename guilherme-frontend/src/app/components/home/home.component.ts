import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ObraService } from '../../services/obra.service';
import { Obra } from '../../models/obra.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  obras: Obra[] = [];

  constructor(private obraService: ObraService) {}

  ngOnInit() {
    this.carregarObras();
  }

  carregarObras() {
    this.obraService.listar().subscribe({
      next: (obras) => this.obras = obras,
      error: (error) => console.error('Erro ao carregar obras:', error)
    });
  }
}
