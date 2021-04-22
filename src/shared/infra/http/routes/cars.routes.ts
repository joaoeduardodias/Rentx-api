import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";

const carsRoutes = Router();

const createCarcontroller = new CreateCarController();

carsRoutes.post("/", createCarcontroller.handle);

export { carsRoutes };
