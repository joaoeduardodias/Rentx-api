import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
   private repository: Repository<Rental>;

   constructor() {
      this.repository = getRepository(Rental);
   }

   async findOpenRentalByCar(car_id: string): Promise<Rental> {
      const openCar = await this.repository.findOne({
         where: { car_id, end_date: null },
      });
      return openCar;
   }
   async findOpenRentalByUser(user_id: string): Promise<Rental> {
      const openUser = await this.repository.findOne({
         where: { user_id, end_date: null },
      });
      return openUser;
   }
   async create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
   }: ICreateRentalDTO): Promise<Rental> {
      const rental = this.repository.create({
         car_id,
         user_id,
         expected_return_date,
         end_date,
         id,
         total,
      });
      await this.repository.save(rental);
      return rental;
   }
   async findById(id: string): Promise<Rental> {
      const rental = await this.repository.findOne(id);
      return rental;
   }
   async findByUser(user_id: string): Promise<Rental[]> {
      const rentals = await this.repository.find({
         where: { user_id },
         relations: ["car"],
      });
      return rentals;
   }
}

export { RentalsRepository };
