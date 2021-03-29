import { Router } from "express";

import { createSpacificationController } from "../modules/cars/useCases/createSpacification";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
   return createSpacificationController.handle(request, response);
});

export { specificationRoutes };
