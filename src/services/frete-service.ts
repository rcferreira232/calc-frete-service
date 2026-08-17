import { CalcFreteRequest, CalcFreteResponse } from "../interfaces/frete.ts";

export class FreteService {
  async calcFrete(data: CalcFreteRequest): Promise<CalcFreteResponse> {
    const { cep, peso, comprimento, altura, largura } = data;

    // Not Implemented
    const valor = 1;
    const prazoEntrega = 1;

    return {
      valor,
      prazoEntrega,
    };
  }
}
