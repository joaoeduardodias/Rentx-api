import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarcontroller = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpacificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

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

carsRoutes.post(
   "/images/:id",
   ensureAuthenticated,
   ensureAdmin,
   upload.array("images"),
   uploadCarImagesController.handle
);

export { carsRoutes };
