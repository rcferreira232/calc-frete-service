import { CalcFreteRequest, CalcFreteResponse } from "../interfaces/frete.ts";
import { MelhorEnvioService } from "./external/melhor-envio-service.ts";
import {
  MelhorEnvioRequest,
  MelhorEnvioResponse,
} from "../interfaces/melhor-envio.ts";

export class FreteService {
  async calcFrete(data: CalcFreteRequest): Promise<CalcFreteResponse> {
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

    const melhorEnvioRequest: MelhorEnvioRequest = {
      from: {
        postal_code: cep_origem,
      },
      to: {
        postal_code: cep_destino,
      },
      products: [
        {
          id: "1",
          width: largura,
          height: altura,
          length: comprimento,
          weight: peso,
          insurance_value: valor_seguro,
          quantity: quantidade,
        },
      ],
    };

    const melhorEnvioResponse: MelhorEnvioResponse[] =
      await MelhorEnvioService.calcFrete(melhorEnvioRequest);

    if (!melhorEnvioResponse[0]) {
      throw new Error("No shipping options available");
    }

    return {
      valor: parseFloat(melhorEnvioResponse[0].price),
      prazoEntrega: melhorEnvioResponse[0].delivery_time,
    };
  }
}
