import { type Request, type Response } from "express";
import {
  type CalcFreteRequest,
  type CalcFreteResponse,
} from "../interfaces/frete.js";
import { type FreteService } from "../services/frete-service.js";

// Classe responsável por controlar as requisições relacionadas ao cálculo de frete
export class FreteController {
  // Propriedade privada para armazenar a instância do serviço de frete
  private freteService: FreteService;

  // Construtor que recebe e inicializa o serviço de frete (injeção de dependência)
  constructor(freteService: FreteService) {
    this.freteService = freteService;
  }

  // Método assíncrono que lida com a requisição de cálculo de frete
  async calcFrete(req: Request, res: Response): Promise<Response> {
    // Extrai o corpo da requisição e atribui a tipagem CalcFreteRequest
    const data: CalcFreteRequest = req.body;

    try {
      // Valida se todos os campos obrigatórios estão presentes no corpo da requisição
      if (
        !data.cep_origem ||
        !data.cep_destino ||
        !data.peso ||
        !data.comprimento ||
        !data.altura ||
        !data.largura ||
        !data.valor_seguro ||
        !data.quantidade
      ) {
        // Retorna erro HTTP 400 (Bad Request) caso algum campo esteja ausente
        return res.status(400).json({ error: "Missing required fields" });
      }
      // Chama o serviço de frete para calcular as opções de envio
      const result: CalcFreteResponse = await this.freteService.calcFrete(data);
      // Retorna a resposta HTTP 200 (OK) com os dados do frete calculados
      return res.status(200).json(result);
    } catch (error) {
      // Exibe o erro no console em caso de exceção
      console.error(error);
      // Retorna resposta HTTP 500 (Internal Server Error) informando indisponibilidade de frete
      return res.status(500).json({ error: "No shipping options available" });
    }
  }
}

