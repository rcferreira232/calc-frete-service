export type CalcFreteRequest = {
  cep: string;
  peso: number;
  comprimento: number;
  altura: number;
  largura: number;
};

export type CalcFreteResponse = {
  valor: number;
  prazoEntrega: number;
};
