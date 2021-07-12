import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-menory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-menory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create Car Specification", () => {
   beforeEach(() => {
      specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
         carsRepositoryInMemory,
         specificationRepositoryInMemory
      );
   });
   it("should be able to add a new specification to a now-existent car", async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];

      await expect(
         createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
         })
      ).rejects.toEqual(new AppError("Car does not exists!"));
   });

   it("should be able to add a new specification to the car", async () => {
      const car = await carsRepositoryInMemory.create({
         name: "Name Car",
         description: "description car",
         daily_rate: 100,
         license_plate: "ABC-123",
         fine_amount: 60,
         brand: "Brand",
         category_id: "category",
      });
      const specification = await specificationRepositoryInMemory.create({
         description: "Test",
         name: "Test",
      });

      const specifications_id = [specification.id];
      const spacificationsCars = await createCarSpecificationUseCase.execute({
         car_id: car.id,
         specifications_id,
      });
      expect(spacificationsCars).toHaveProperty("specifications");
      expect(spacificationsCars.specifications.length).toBe(1);
   });
});
