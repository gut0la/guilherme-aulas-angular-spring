import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ViacepService} from '../viacep.service';
import {ViaCepResponse} from '../models/via-cep.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs';

@Component({
  selector: 'app-viacep',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Consulta CEP</h2>
      <div class="form-group">
        <label for="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          [(ngModel)]="cep"
          placeholder="Digite o CEP (ex: 01001000)"
          maxlength="8"
          class="form-control">
        <button (click)="buscarCep()" [disabled]="!cep || cep.length !== 8" class="btn">
          Buscar
        </button>
      </div>
      <div *ngIf="loading" class="loading">Carregando...</div>
      <div *ngIf="endereco" class="result">
        <h3>Endereço encontrado:</h3>
        <p><strong>CEP:</strong>
          {{endereco.cep}}
        </p>
        <p><strong>Logradouro:</strong>
          {{endereco.logradouro}}
        </p>
        <p><strong>Bairro:</strong>
          {{endereco.bairro}}
        </p>
        <p><strong>Cidade:</strong>
          {{endereco.localidade}}
        </p>
        <p><strong>UF:</strong>
          {{endereco.uf}}
        </p>
      </div>
      <div *ngIf="erro" class="error">
        {{erro}}
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 500px; margin: 20px auto; padding: 20px; }
    .form-group { margin-bottom: 20px; }
    .form-control { width: 200px; padding: 8px; margin-right: 10px; }
    .btn { padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; }
    .btn:disabled { background: #ccc; cursor: not-allowed; }
    .result { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
    .error { color: red; margin-top: 10px; }
    .loading { color: #007bff; margin-top: 10px; }
  `]
})
export class ViacepComponent {
  public cep = '';
  public endereco: ViaCepResponse | null = null;
  public erro = '';
  public loading = false;

  constructor(
    private readonly viacepService: ViacepService,
    private readonly snackBar: MatSnackBar
  ) {}

  public buscarCep() {
    if (!this.cep || this.cep.length !== 8)
      return;

    this.loading = true;
    this.erro = '';
    this.endereco = null;

    this.viacepService.buscarCep(this.cep).pipe().subscribe(res => {
      this.loading = false;
      if ((res as any).erro) {
        this.erro = 'CEP não encontrado.';
        this.snackBar.open(this.erro, 'Fechar', {duration: 3000});
      } else {
        this.endereco = res;
      }
      catchError(
        err => {
          this.loading = false;
          this.erro = 'Erro ao buscar o CEP. Tente novamente.';
          this.snackBar.open(this.erro, 'Fechar', {duration: 3000});
          throw err;
        }
      )
    })
  }
}
