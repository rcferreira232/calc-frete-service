import express, { type Express, type Request, type Response } from "express";
import { healthRouter } from "./routes/health-check.ts";
import { freteRouter } from "./routes/frete-routes.js";

export const app: Express = express();

app.use(express.json());

app.use("/", healthRouter);
app.use("/frete", freteRouter);
