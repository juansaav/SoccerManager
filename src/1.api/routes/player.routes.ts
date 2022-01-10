import { PlayerService } from "../../2.services";
import { Router, Response } from "express";
import middlewares from "../middlewares";
import { body } from "express-validator";
import { Utils } from "../../common/utils";
import { ErrorHandler } from "../../common/errors";

const route = Router();

export const PlayerRouter = (router: Router, service: PlayerService): void => {
  router.use("/player", route);

  // Get player by id
  route.get("/:id", middlewares.isAuth, async (req: any, res: Response) => {
    try {
      const id = req.params.id;
      console.log(`Get player service id: ${id}`);
      // Call service
      const data = await service.GetPlayerId(+id);
      data ? res.status(200).send(data) : res.sendStatus(404);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  });

  // Edit player
  route.put(
    "/:id",
    middlewares.isAuth,
    // valid country code
    body("countryCode")
      .optional()
      .custom((val) => {
        return Utils.validCountry(val);
      }),
    // first name is string
    body("firstName").optional().isString(),
    // last name is string
    body("lastName").optional().isString(),
    middlewares.checkValidations,

    async (req: any, res: Response) => {
      try {
        const playerId = req.params.id;
        const obj = req.body;
        const userId = req.user.id;
        console.log(`Update player playerId: ${playerId}`);
        // Call service
        await service.ValidateUpdatePlayer(+playerId, +userId, obj);
        res.sendStatus(200);
      } catch (err) {
        ErrorHandler.update(res, err);
      }
    }
  );
};
