import express, { type Express, type Request, type Response } from "express";
import { healthRouter } from "./routes/health-check.ts";
import { freteRouter } from "./routes/frete-routes.js";

// Instancia e exporta a aplicação Express com tipo anotado
export const app: Express = express();

// Configura o middleware para converter requisições com corpo em JSON
app.use(express.json());

// Registra o roteador de health check na rota raiz "/"
app.use("/", healthRouter);
// Registra o roteador de cálculo de frete no prefixo "/frete"
app.use("/frete", freteRouter);

