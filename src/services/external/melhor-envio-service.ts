import {
  MelhorEnvioRequest,
  MelhorEnvioResponse,
} from "../../interfaces/melhor-envio.ts";

// Obtém o token de autenticação das variáveis de ambiente
const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN;
// Obtém a URL base da API do Melhor Envio das variáveis de ambiente
const MELHOR_ENVIO_URL = process.env.MELHOR_ENVIO_URL;

// Classe responsável por realizar chamadas HTTP para o serviço externo do Melhor Envio
export class MelhorEnvioService {
  // Método privado estático para montar o cabeçalho padrão das requisições HTTP
  private static getHeaders() {
    return {
      // Define o tipo de conteúdo trafegado como JSON
      "Content-Type": "application/json",
      // Adiciona o token de autorização no formato Bearer
      Authorization: `Bearer ${MELHOR_ENVIO_TOKEN}`,
    };
  }

  // Método público estático que realiza a chamada de cálculo de frete na API do Melhor Envio
  public static async calcFrete(
    data: MelhorEnvioRequest,
  ): Promise<MelhorEnvioResponse> {
    // Executa a requisição POST para o endpoint de cálculo de frete
    const response = await fetch(
      `${MELHOR_ENVIO_URL}/api/v2/me/shipment/calculate`,
      {
        method: "POST", // Define o método HTTP como POST
        headers: this.getHeaders(), // Define os cabeçalhos de autorização e tipo de conteúdo
        body: JSON.stringify(data), // Converte o objeto de dados de requisição para string JSON
      },
    );

    // Verifica se a resposta da requisição foi bem-sucedida (status 2xx)
    if (!response.ok) {
      // Lança um erro com o texto da resposta HTTP caso ocorra uma falha
      throw new Error(`Error calculating shipping: ${response.statusText}`);
    }

    // Converte o corpo da resposta em JSON e faz o cast para a tipagem MelhorEnvioResponse
    return response.json() as Promise<MelhorEnvioResponse>;
  }
}

