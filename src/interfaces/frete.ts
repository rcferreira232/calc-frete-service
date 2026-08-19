// Define o tipo para os dados da requisição de cálculo de frete
export type CalcFreteRequest = {
  // CEP de origem do envio
  cep_origem: string;
  // CEP de destino da entrega
  cep_destino: string;
  // Peso total do pacote em quilos
  peso: number;
  // Comprimento do pacote em centímetros
  comprimento: number;
  // Altura do pacote em centímetros
  altura: number;
  // Largura do pacote em centímetros
  largura: number;
  // Valor declarado para o seguro da carga
  valor_seguro: number;
  // Quantidade de itens/pacotes
  quantidade: number;
};

// Define o tipo auxiliar para as informações resumidas de uma opção de frete
type Frete = {
  // Nome da empresa transportadora
  empresa: string;
  // Valor total do frete
  valor: number;
  // Prazo estimado de entrega em dias úteis
  prazoEntrega: number;
};

// Define o tipo para a resposta do cálculo de frete (opções mais barata e mais rápida)
export type CalcFreteResponse = {
  // Opção de frete de menor custo
  barato: Frete;
  // Opção de frete de menor prazo de entrega
  rapido: Frete;
};

