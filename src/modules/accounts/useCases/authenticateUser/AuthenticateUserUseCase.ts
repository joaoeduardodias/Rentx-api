import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
   email: string;
   password: string;
}
interface IResponse {
   user: {
      name: string;
      email: string;
   };
   token: string;
}
@injectable()
class AuthenticateUserUseCase {
   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
   ) {}

   async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email);
      if (!user) {
         throw new AppError("Email or password incorrect", 401);
      }
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
         throw new AppError("Email or password incorrect", 401);
      }

      const token = sign({}, "e56a5140110e6ed6549ba6ac973a3286", {
         subject: user.id,
         expiresIn: "1d",
      });
      const tokenReturn: IResponse = {
         token,
         user: {
            name: user.name,
            email: user.email,
         },
      };
      return tokenReturn;
   }
}

export { AuthenticateUserUseCase };
