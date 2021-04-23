import { Router } from "express";

import { CreateSpacificationController } from "../../../../modules/cars/useCases/createSpacification/CreateSpacificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpacificationController = new CreateSpacificationController();

specificationRoutes.post(
   "/",
   ensureAuthenticated,
   ensureAdmin,
   createSpacificationController.handle
);

export { specificationRoutes };
