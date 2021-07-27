import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
   car_id: string;
   images_name: string[];
}
@injectable()
class UploadCarImagesUseCase {
   constructor(
      @inject("CarsImagesRepository")
      private carsImagesRepository: ICarsImagesRepository,
      @inject("CarsRepository")
      private carsRepository: ICarsRepository,
      @inject("StorageProvider")
      private storageProvider: IStorageProvider
   ) {}
   async execute({ car_id, images_name }: IRequest): Promise<void> {
      const car = await this.carsRepository.findById(car_id);
      if (!car) {
         throw new AppError("Car nonexistent");
      }
      images_name.map(async (image) => {
         await this.storageProvider.save(image, "cars");

         await this.carsImagesRepository.create(car_id, image);
      });
   }
}

export { UploadCarImagesUseCase };
