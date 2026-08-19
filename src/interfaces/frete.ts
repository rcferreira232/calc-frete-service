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

type Frete = {
  empresa: string;
  valor: number;
  prazoEntrega: number;
}

export type CalcFreteResponse = {
  barato: Frete;
  rapido: Frete;
};
