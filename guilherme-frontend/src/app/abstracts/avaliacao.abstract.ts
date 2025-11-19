import {Avaliacao} from '../services/avaliacao.service';
import {Observable} from 'rxjs';


export abstract class AvaliacaoAbstract {
  abstract listarPorObra(obraId: number): Observable<Avaliacao[]>

  abstract listarMinhasAvaliacoes(): Observable<Avaliacao[]>

  abstract criar(avaliacao: Avaliacao): Observable<Avaliacao>
}
