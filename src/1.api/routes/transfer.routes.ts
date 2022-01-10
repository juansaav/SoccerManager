import { PlayerService } from "../../2.services";
import { Router, Response } from "express";
import middlewares from "../middlewares";
import { body } from "express-validator";
import { Utils } from "../../common/utils";
import { ErrorHandler } from "../../common/errors";
import { TransferService } from "../../2.services/transfer.service";

const route = Router();

export const TransferRouter = (
  router: Router,
  service: TransferService
): void => {
  router.use("/transfer", route);

  // Adds player to transfer list
  route.post(
    "/:id",
    middlewares.isAuth,
    // price is numeric
    body("price").isFloat({ min: 0 }),
    middlewares.checkValidations,
    async (req: any, res: Response) => {
      try {
        const playerId = req.params.id;
        const userId = req.user.id;
        const price = req.body.price;
        console.log(`Add player to transfer list playerId: ${playerId}`);
        // Call service
        const data = await service.CreateTransfer(userId, +playerId, price);
        res.status(200).send(data);
      } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
      }
    }
  );
};
