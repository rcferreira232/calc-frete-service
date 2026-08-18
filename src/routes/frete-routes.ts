import { Router } from "express";
import { FreteController } from "../controllers/frete-controller.js";
import { FreteService } from "../services/frete-service.js";

const router = Router();

const freteService = new FreteService();
const freteController = new FreteController(freteService);

router.post("/", async (req, res) => {
  return freteController.calcFrete(req, res);
});

export { router as freteRouter };
