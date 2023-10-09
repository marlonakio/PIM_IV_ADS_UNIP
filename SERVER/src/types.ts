export interface EmpresaType {
  nome: string;
  cnpj: number;
  email: string;
  telefone: number;
  id: number ;

}
export interface FuncionarioType {
  nome: string;
  cpf: number;
  email?: string;
  telefone?: number;
  empresa_id: number;
  cargo: string;
  hora_prevista: number;
  salario: number;
  valor_hora: number;
}

export interface PagamentoType {
  funcionario_id: number;
  hora_trabalhada: number;
}
