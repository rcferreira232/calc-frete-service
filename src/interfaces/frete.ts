export type CalcFreteRequest = {
  cep_origem: string;
  cep_destino: string;
  peso: number;
  comprimento: number;
  altura: number;
  largura: number;
  valor_seguro: number;
  quantidade: number;
};

export type CalcFreteResponse = {
  valor: number;
  prazoEntrega: number;
};
