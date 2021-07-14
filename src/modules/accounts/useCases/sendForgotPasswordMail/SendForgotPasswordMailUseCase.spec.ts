import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
describe("Send Forgot Mail", () => {
   beforeEach(() => {
      usersRepositoryInMemory = new UsersRepositoryInMemory();
      usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
      mailProvider = new MailProviderInMemory();
      dateProvider = new DayjsDateProvider();
      sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
         usersRepositoryInMemory,
         usersTokensRepositoryInMemory,
         dateProvider,
         mailProvider
      );
   });

   it("should be able to send forgot password mail to user", async () => {
      const sendMail = spyOn(mailProvider, "sendMail");

      await usersRepositoryInMemory.create({
         driver_license: "2772082515",
         email: "ahjakkim@tesigi.tz",
         name: "Joseph Schmidt",
         password: "1234",
      });
      await sendForgotPasswordMailUseCase.execute("ahjakkim@tesigi.tz");

      expect(sendMail).toHaveBeenCalled();
   });
   it("should not de able to send an email if user does not exists", async () => {
      await expect(
         sendForgotPasswordMailUseCase.execute("suivpup@tu.ni")
      ).rejects.toEqual(new AppError("User does not exists!"));
   });
   it("should be able to create  new an users token", async () => {
      const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
      await usersRepositoryInMemory.create({
         driver_license: "424110",
         email: "vomuvvo@soeja.ee",
         name: "Vera Carpenter",
         password: "1212",
      });
      await sendForgotPasswordMailUseCase.execute("vomuvvo@soeja.ee");
      expect(generateTokenMail).toHaveBeenCalled();
   });
});
