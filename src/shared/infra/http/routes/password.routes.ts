import { Router } from "express";

import { ResetPasswordUserController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMaiController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMaiController";

const passwordRoutes = Router();
const sendForgotPasswordMailController = new SendForgotPasswordMaiController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
