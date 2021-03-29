import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpacificationController } from "./CreateSpacificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = new SpecificationsRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
   specificationsRepository
);
const createSpacificationController = new CreateSpacificationController(
   createSpecificationUseCase
);

export { createSpacificationController };
