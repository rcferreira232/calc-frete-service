import {
  MelhorEnvioRequest,
  MelhorEnvioResponse,
} from "../../interfaces/melhor-envio.ts";

const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN;
const MELHOR_ENVIO_URL = process.env.MELHOR_ENVIO_URL;

export class MelhorEnvioService {
  private static getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MELHOR_ENVIO_TOKEN}`,
    };
  }

  public static async calcFrete(
    data: MelhorEnvioRequest,
  ): Promise<MelhorEnvioResponse> {
    const response = await fetch(
      `${MELHOR_ENVIO_URL}/api/v2/me/shipment/calculate`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`Error calculating shipping: ${response.statusText}`);
    }

    return response.json() as Promise<MelhorEnvioResponse>;
  }
}
