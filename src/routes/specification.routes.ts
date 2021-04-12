import { Router } from "express";

import { CreateSpacificationController } from "../modules/cars/useCases/createSpacification/CreateSpacificationController";

const specificationRoutes = Router();

const createSpacificationController = new CreateSpacificationController();

specificationRoutes.post("/", createSpacificationController.handle);

export { specificationRoutes };
