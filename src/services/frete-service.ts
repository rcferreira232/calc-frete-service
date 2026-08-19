import { CalcFreteRequest, CalcFreteResponse } from "../interfaces/frete.ts";
import { MelhorEnvioService } from "./external/melhor-envio-service.ts";
import {
  MelhorEnvioRequest,
  MelhorEnvioResponse,
  MelhorEnvioSuccessEntry,
} from "../interfaces/melhor-envio.ts";

// Classe de serviço responsável pelas regras de negócio do cálculo de frete
export class FreteService {
  // Método assíncrono para calcular as opções de frete (mais barata e mais rápida)
  async calcFrete(data: CalcFreteRequest): Promise<CalcFreteResponse> {
    // Desestrutura todos os parâmetros da requisição recebida
    const {
      cep_origem,
      cep_destino,
      peso,
      comprimento,
      altura,
      largura,
      valor_seguro,
      quantidade,
    } = data;

    // Monta o objeto no formato esperado pela API do Melhor Envio
    const melhorEnvioRequest: MelhorEnvioRequest = {
      from: {
        postal_code: cep_origem, // CEP de origem
      },
      to: {
        postal_code: cep_destino, // CEP de destino
      },
      products: [
        {
          id: "1", // ID genérico do produto
          width: largura, // Largura em cm
          height: altura, // Altura em cm
          length: comprimento, // Comprimento em cm
          weight: peso, // Peso em kg
          insurance_value: valor_seguro, // Valor declarado para seguro
          quantity: quantidade, // Quantidade do item
        },
      ],
    };

    // Executa a chamada à API externa do Melhor Envio enviando o objeto montado
    const melhorEnvioResponse: MelhorEnvioResponse =
      await MelhorEnvioService.calcFrete(melhorEnvioRequest);

    // Filtra as opções retornadas ignorando as que contêm erro e mapeando para o tipo de sucesso
    const melhorEnvioSuccesses = melhorEnvioResponse
      .filter((e) => !("error" in e))
      .map((e) => e as MelhorEnvioSuccessEntry);

    // Se nenhuma opção válida de envio for retornada, lança um erro
    if (!melhorEnvioSuccesses[0]) {
      throw new Error("No shipping options available");
    }

    // Ordena o array por preço crescente para encontrar a opção de frete mais barata
    const cheapest = melhorEnvioSuccesses.sort(
      (a, b) => Number(a.price) - Number(b.price),
    )[0]!;

    // Ordena o array por tempo de entrega crescente para encontrar a opção de frete mais rápida
    const fastest = melhorEnvioSuccesses.sort(
      (a, b) => a.delivery_time - b.delivery_time,
    )[0]!;

    // Retorna o resultado formatado no padrão esperado pela aplicação
    return {
      barato: {
        empresa: cheapest.company.name, // Nome da transportadora mais barata
        valor: parseFloat(cheapest.price), // Preço convertido em número
        prazoEntrega: cheapest.delivery_time, // Prazo em dias
      },
      rapido: {
        empresa: fastest.company.name, // Nome da transportadora mais rápida
        valor: parseFloat(fastest.price), // Preço convertido em número
        prazoEntrega: fastest.delivery_time, // Prazo em dias
      },
    };
  }
}
