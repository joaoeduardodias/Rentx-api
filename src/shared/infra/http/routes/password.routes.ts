import { Router } from "express";

import { SendForgotPasswordMaiController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMaiController";

const passwordRoutes = Router();
const sendForgotPasswordMailController = new SendForgotPasswordMaiController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRoutes };
