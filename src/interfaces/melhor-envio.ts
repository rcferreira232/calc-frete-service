// Define o formato da requisição enviada para a API do Melhor Envio
export type MelhorEnvioRequest = {
  // Dados de origem do envio
  from: {
    // CEP de origem
    postal_code: string;
  };
  // Dados de destino do envio
  to: {
    // CEP de destino
    postal_code: string;
  };
  // Lista de produtos a serem cotados
  products: {
    // Identificador do produto
    id: string;
    // Largura em cm
    width: number;
    // Altura em cm
    height: number;
    // Comprimento em cm
    length: number;
    // Peso em kg
    weight: number;
    // Valor assegurado
    insurance_value: number;
    // Quantidade de unidades
    quantity: number;
  }[];
};

// Define a estrutura de um retorno com sucesso para uma opção de frete no Melhor Envio
export type MelhorEnvioSuccessEntry = {
  // ID do serviço/opção de frete
  id: number;
  // Nome do serviço (ex: SEDEX, PAC)
  name: string;
  // Preço padrão do frete
  price: string;
  // Preço customizado/com desconto oferecido
  custom_price: string;
  // Valor do desconto aplicado
  discount: string;
  // Moeda utilizada (ex: BRL)
  currency: string;
  // Prazo estimado de entrega em dias
  delivery_time: number;
  // Intervalo min e max de dias para entrega
  delivery_range: {
    min: number;
    max: number;
  };
  // Prazo customizado de entrega
  custom_delivery_time: number;
  // Intervalo customizado de entrega
  custom_delivery_range: {
    min: number;
    max: number;
  };
  // Detalhes dos pacotes calculados
  packages: {
    price: string;
    discount: string;
    format: string;
    dimensions: {
      height: number;
      width: number;
      length: number;
    };
    weight: string;
    insurance_value: string;
    products: {
      id: string;
      quantity: number;
    }[];
  }[];
  // Serviços adicionais incluídos (aviso de recebimento, mão própria, coleta)
  additional_services: {
    receipt: boolean;
    own_hand: boolean;
    collect: boolean;
  };
  // Dados da empresa transportadora responsável
  company: {
    // ID da empresa
    id: number;
    // Nome da transportadora
    name: string;
    // URL da logomarca da transportadora
    picture: string;
  };
};

// Define a estrutura de um retorno com erro para uma opção de frete no Melhor Envio
export type MelhorEnvioErrorEntry = {
  // ID da opção ou serviço que falhou
  id: number;
  // Nome da opção ou serviço
  name: string;
  // Mensagem descrevendo o motivo do erro
  error: string;
  // Dados da empresa transportadora relacionada ao erro
  company: {
    id: number;
    name: string;
    picture: string;
  };
};

// A resposta da API é um array contendo opções com sucesso ou entradas de erro
export type MelhorEnvioResponse = Array<MelhorEnvioSuccessEntry | MelhorEnvioErrorEntry>;

