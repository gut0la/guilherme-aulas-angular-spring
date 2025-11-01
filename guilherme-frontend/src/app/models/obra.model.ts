import { Genero } from './genero.model';

export interface Obra {
  id: number;
  titulo: string;
  descricao: string;
  anoLancamento: number;
  tipo: 'FILME' | 'SERIE' | 'ANIME';
  generos: Genero[];
  notaMedia?: number;
}