import { Colaborador } from "./Colaborador";

export interface Servico {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  colaboradores: Colaborador[];
  status: string;
}
