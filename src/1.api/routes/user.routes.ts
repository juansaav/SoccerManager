import { UserService } from "../../2.services";
import { Router, Response, Request } from "express";
import middlewares from "../middlewares";
import { body } from "express-validator";

const route = Router();

export const UserRouter = (router: Router, service: UserService): void => {
  router.use("/user", route);

  // Create user
  route.post(
    "/",
    // email must be an email
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
    middlewares.checkValidations,

    async (req: Request, res: Response) => {
      try {
        // Call service
        const newUser = req.body;
        console.log(`New user service email: ${newUser.email}`);
        const data = await service.CreateUser(newUser);
        res.status(200).send(data);
      } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
      }
    }
  );
};
