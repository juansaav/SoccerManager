import { PlayerService } from "../../2.services";
import { Router, Response } from "express";
import middlewares from "../middlewares";

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
};
