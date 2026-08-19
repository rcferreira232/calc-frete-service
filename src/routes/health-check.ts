import { Router } from "express";

// Cria uma nova instância de roteador Express
const router = Router();

// Define a rota GET para a raiz "/"
router.get("/", async (_req, res) => {
  // Retorna uma resposta HTTP 200 (OK) com status e timestamp atual em formato ISO
  return res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Exporta o roteador renomeado como healthRouter
export { router as healthRouter };

