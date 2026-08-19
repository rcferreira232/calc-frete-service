import { type Request, type Response } from "express";
import {
  type CalcFreteRequest,
  type CalcFreteResponse,
} from "../interfaces/frete.js";
import { type FreteService } from "../services/frete-service.js";

export class FreteController {
  private freteService: FreteService;

  constructor(freteService: FreteService) {
    this.freteService = freteService;
  }

  async calcFrete(req: Request, res: Response): Promise<Response> {
    const data: CalcFreteRequest = req.body;

    try {
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
        return res.status(400).json({ error: "Missing required fields" });
      }
      const result: CalcFreteResponse = await this.freteService.calcFrete(data);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "No shipping options available" });
    }
  }
}
