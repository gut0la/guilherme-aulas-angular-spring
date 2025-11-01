import { Usuario } from './usuario.model';
import { Obra } from './obra.model';

export interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  dataAvaliacao: string;
  usuario: Usuario;
  obra: Obra;
}