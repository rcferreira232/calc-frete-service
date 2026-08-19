import { CalcFreteRequest, CalcFreteResponse } from "../interfaces/frete.ts";
import { MelhorEnvioService } from "./external/melhor-envio-service.ts";
import {
  MelhorEnvioRequest,
  MelhorEnvioResponse,
  MelhorEnvioSuccessEntry,
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

    const melhorEnvioResponse: MelhorEnvioResponse =
      await MelhorEnvioService.calcFrete(melhorEnvioRequest);
    const melhorEnvioSuccesses = melhorEnvioResponse
      .filter((e) => !("error" in e))
      .map((e) => e as MelhorEnvioSuccessEntry);

    if (!melhorEnvioSuccesses[0]) {
      throw new Error("No shipping options available");
    }

    // Array is small, two sorts is fine
    const cheapest = melhorEnvioSuccesses.sort(
      (a, b) => Number(a.price) - Number(b.price),
    )[0]!;
    const fastest = melhorEnvioSuccesses.sort(
      (a, b) => a.delivery_time - b.delivery_time,
    )[0]!;

    return {
      barato: {
        empresa: cheapest.company.name,
        valor: parseFloat(cheapest.price),
        prazoEntrega: cheapest.delivery_time,
      },
      rapido: {
        empresa: fastest.company.name,
        valor: parseFloat(fastest.price),
        prazoEntrega: fastest.delivery_time,
      },
    };
  }
}
