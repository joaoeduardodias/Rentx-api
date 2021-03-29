import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRepository = new CategoriesRepository();
const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
   return createCategoryController.handle(request, response);
});
categoriesRoutes.get("/", (request, response) => {
   const all = categoriesRepository.list();
   return response.json(all);
});

export { categoriesRoutes };
