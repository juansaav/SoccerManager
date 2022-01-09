import { SessionService } from "../../2.services";
import { Router, Response, Request } from "express";
import middlewares from "../middlewares";
import { body, validationResult, param } from "express-validator";
import { BlockedTokens } from "../middlewares/blockedTokens";

const route = Router();

export const SessionRouter = (
  router: Router,
  service: SessionService
): void => {
  router.use("/session", route);

  // Login
  route.post(
    "/",
    // Validations
    // email is not empty
    body("email").notEmpty(),
    // password is not empty
    body("password").notEmpty(),
    middlewares.checkValidations,

    async (req: Request, res: Response) => {
      try {
        // Call service
        const { email, password } = req.body;
        const data = await service.SignIn(email, password);
        res.status(200).send(data);
      } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
      }
    }
  );

  // Logout
  route.delete("/", middlewares.isAuth, async (req: any, res: Response) => {
    try {
      const userId = req.user.id;

      // Add token to blocked lists
      console.log("Log out service, userId= " + req.user.id);
      BlockedTokens.getInstance().addTokenBlocked(+userId, req.user.token);
      res.status(200).end();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  });
};
