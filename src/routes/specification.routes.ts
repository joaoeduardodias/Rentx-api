import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpacificationController } from "../modules/cars/useCases/createSpacification/CreateSpacificationController";

const specificationRoutes = Router();

const createSpacificationController = new CreateSpacificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/", createSpacificationController.handle);

export { specificationRoutes };
