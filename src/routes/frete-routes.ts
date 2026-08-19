import { Router } from "express";
import { FreteController } from "../controllers/frete-controller.js";
import { FreteService } from "../services/frete-service.js";

// Instancia um novo roteador Express
const router = Router();

// Instancia o serviço de frete
const freteService = new FreteService();
// Instancia o controller injetando a dependência do serviço de frete
const freteController = new FreteController(freteService);

// Define a rota POST para a raiz do módulo ("/frete") chamando a função calcFrete do controller
router.post("/", async (req, res) => {
  return freteController.calcFrete(req, res);
});

// Exporta o roteador renomeado como freteRouter
export { router as freteRouter };

