import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-menory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
describe("Create Rental", () => {
   const dayAdd24Hours = dayjs().add(1, "day").toDate();
   beforeEach(() => {
      rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      dayJsDateProvider = new DayjsDateProvider();
      createRentalUseCase = new CreateRentalUseCase(
         rentalsRepositoryInMemory,
         dayJsDateProvider,
         carsRepositoryInMemory
      );
   });
   it("should be able to create a new rental", async () => {
      const car = await carsRepositoryInMemory.create({
         name: "Name Car",
         description: "description car",
         daily_rate: 100,
         license_plate: "ABC-123",
         fine_amount: 60,
         brand: "Brand",
         category_id: "category",
      });

      const rental = await createRentalUseCase.execute({
         user_id: "12345",
         car_id: car.id,
         expected_return_date: dayAdd24Hours,
      });

      expect(rental).toHaveProperty("id");
      expect(rental).toHaveProperty("start_date");
   });

   it("should not be able to create a new rental if there is another open to the same user", async () => {
      expect(async () => {
         const car = await carsRepositoryInMemory.create({
            name: "Name Car 2",
            description: "description car",
            daily_rate: 100,
            license_plate: "ABC-1232",
            fine_amount: 60,
            brand: "Brandd",
            category_id: "categorye",
         });
         await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
         });
         await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
         });
      }).rejects.toBeInstanceOf(AppError);
   });

   it("should not be able to create a new rental if there is another open to the same car", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "123",
            car_id: "test",
            expected_return_date: dayAdd24Hours,
         });
         await createRentalUseCase.execute({
            user_id: "321",
            car_id: "test",
            expected_return_date: dayAdd24Hours,
         });
      }).rejects.toBeInstanceOf(AppError);
   });

   it("should not be able to create a new rental with invalid return time", async () => {
      expect(async () => {
         await createRentalUseCase.execute({
            user_id: "123",
            car_id: "test",
            expected_return_date: dayjs().toDate(),
         });
      }).rejects.toBeInstanceOf(AppError);
   });
});
