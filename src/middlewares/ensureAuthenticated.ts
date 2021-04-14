import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
   sub: string;
}

export async function ensureAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction
): Promise<void> {
   const authHeader = request.headers.authorization;

   if (!authHeader) {
      throw new Error("Token missing");
   }
   const [, token] = authHeader.split(" ");
   // verifica se um token é valido
   try {
      const { sub: user_id } = verify(
         token,
         "e56a5140110e6ed6549ba6ac973a3286"
      ) as IPayload;
      const usersRepository = new UsersRepository();
      const user = await usersRepository.findById(user_id);
      if (!user) {
         throw new Error("User does not exist");
      }

      next();
   } catch {
      throw new Error("Invalid token !");
   }
}
