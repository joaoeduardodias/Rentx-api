import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarcontroller = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpacificationController = new CreateCarSpecificationController();
carsRoutes.post(
   "/",
   ensureAuthenticated,
   ensureAdmin,
   createCarcontroller.handle
);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
   "/spacifications/:id",
   ensureAuthenticated,
   ensureAdmin,
   createCarSpacificationController.handle
);

export { carsRoutes };
