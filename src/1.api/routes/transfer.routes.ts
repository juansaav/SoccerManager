import { PlayerService } from "../../2.services";
import { Router, Response } from "express";
import middlewares from "../middlewares";
import { body } from "express-validator";
import { TransferService } from "../../2.services/transfer.service";

const route = Router();

export const TransferRouter = (
  router: Router,
  service: TransferService
): void => {
  router.use("/transfer", route);

  // Return all active transfers
  route.get("/", middlewares.isAuth, async (req: any, res: Response) => {
    try {
      // Call service
      const data = await service.GetTransfers();
      res.status(200).send(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  });

  // Adds player to transfer list
  route.post(
    "/",
    middlewares.isAuth,
    // price is numeric
    body("price").isFloat({ min: 0 }),
    middlewares.checkValidations,
    async (req: any, res: Response) => {
      try {
        const userId = req.user.id;
        const playerId = req.body.playerId;
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

  // Buys a player
  route.put(
    "/:id",
    middlewares.isAuth,
    middlewares.checkValidations,
    async (req: any, res: Response) => {
      try {
        const transferId = req.params.id;
        const userId = req.user.id;
        console.log(`Add player to transfer list transferId: ${transferId}`);
        // Call service
        const data = await service.UpdateTransfer(+userId, +transferId);
        res.status(200).send(data);
      } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
      }
    }
  );
};
