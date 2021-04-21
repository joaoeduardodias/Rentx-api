import { Router } from "express";

import { CreateSpacificationController } from "../../../../modules/cars/useCases/createSpacification/CreateSpacificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpacificationController = new CreateSpacificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/", createSpacificationController.handle);

export { specificationRoutes };
