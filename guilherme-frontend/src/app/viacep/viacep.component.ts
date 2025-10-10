import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ViacepService} from '../viacep.service';
import {ViaCepResponse} from '../models/via-cep.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs';

// ISSO É UM COMPONENTE STANDALONE
// SERVE PARA CRIAR COMPONENTES QUE NÃO DEPENDEM DE MÓDULOS
// PODEM SER USADOS EM QUALQUER LUGAR DA APLICAÇÃO
@Component({
  // O SELETOR SERVE PARA USAR O COMPONENTE EM OUTROS LUGARES
  // EXEMPLO: <app-viacep></app-viacep>
  selector: 'app-viacep',
  // Indica que o componente é standalone
  // Isso significa que ele não depende de um módulo pai
  // E pode ser usado em qualquer lugar da aplicação
  // IMPORTANTE: É NECESSÁRIO IMPORTAR OS MÓDULOS QUE O COMPONENTE USA
  // EXEMPLO: CommonModule, FormsModule, etc.
  standalone: true,
  // Os módulos que o componente usa
  // CONSEGUIR USAR NG MODEL, POR EXEMPLO, PRECISA IMPORTAR FormsModule
  imports: [CommonModule, FormsModule],
  // O template do componente
  // O HTML KK QUE FICA DENTRO DO COMPONENTE
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
        <!--   MÉTODOS.      -->
        <button (click)="buscarCep()" [disabled]="!cep || cep.length !== 8" class="btn">
          Buscar
        </button>
      </div>
<!--      NG IF SERVE PARA MOSTRAR OU ESCONDER ELEMENTOS NO TEMPLATE-->
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
  /// O CSS do componente
  // O ESTILO KK QUE FICA DENTRO DO COMPONENTE
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

// A CLASSE DO COMPONENTE
// AQUI FICA A LÓGICA DO COMPONENTE
// EXEMPLO: VARIÁVEIS, MÉTODOS, ETC.
export class ViacepComponent {
  // VARIÁVEIS QUE O COMPONENTE USA
  // ESSAS VARIÁVEIS SÃO USADAS NO TEMPLATE
  // EXEMPLO: [(ngModel)]="cep" USA A VARIÁVEL CEP
  public cep = '';
  public endereco: ViaCepResponse | null = null;
  public erro = '';
  public loading = false;

  // O CONSTRUTOR DO COMPONENTE
  // AQUI SÃO INJETADOS OS SERVIÇOS QUE O COMPONENTE USA
  // EXEMPLO: ViacepService, MatSnackBar, ETC.
  constructor(
    private readonly viacepService: ViacepService,
    private readonly snackBar: MatSnackBar
  ) {}

  // MÉTODO QUE O COMPONENTE USA
  // ESSE MÉTODO É CHAMADO QUANDO O USUÁRIO CLICA NO BOTÃO "BUSCAR"
  // EXEMPLO: (click)="buscarCep()" CHAMA ESSE MÉTODO
  public buscarCep() {
    // VALIDAÇÃO SIMPLES DO CEP
    // SE O CEP ESTIVER VAZIO OU COM TAMANHO DIFERENTE DE 8, NÃO FAZ NADA
    if (!this.cep || this.cep.length !== 8)
      return;

    // INICIA A BUSCA DO CEP
    this.loading = true;

    // RESETA AS VARIÁVEIS DE ERRO E ENDEREÇO
    this.erro = '';

    this.endereco = null;

    // CHAMA O SERVIÇO PARA BUSCAR O CEP
    // O SERVIÇO RETORNA UM OBSERVABLE, ENTÃO É NECESSÁRIO DAR UM SUBSCRIBE
    this.viacepService.buscarCep(this.cep).pipe().subscribe(res => {
      // QUANDO A RESPOSTA CHEGA, PARA O LOADING
      // E TRATA A RESPOSTA
      // SE TIVER ERRO, MOSTRA A MENSAGEM DE ERRO
      this.loading = false;
      // TRATA A RESPOSTA
      // SE TIVER ERRO, MOSTRA A MENSAGEM DE ERRO
      if ((res as any).erro) {
        // SE O CEP NÃO FOR ENCONTRADO, MOSTRA A MENSAGEM DE ERRO
        this.erro = 'CEP não encontrado.';
        // MOSTRA A MENSAGEM DE ERRO USANDO O SNACKBAR
        this.snackBar.open(this.erro, 'Fechar', {duration: 3000});
      } else {
        // SE TIVER SUCESSO, ATRIBUI A RESPOSTA À VARIÁVEL ENDEREÇO
        this.endereco = res;
      }
      // CATCHERROR SERVE PARA TRATAR ERROS DE REDE, ETC.
      // SE DER ALGUM ERRO, MOSTRA A MENSAGEM DE ERRO
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
