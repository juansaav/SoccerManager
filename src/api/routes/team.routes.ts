import { TeamService } from "../../services";
import { Router, Response, Request } from "express";
import middlewares from "../middlewares";

const route = Router();

export const TeamRouter = (router: Router, service: TeamService): void => {
  router.use("/team", route);

  // Get team by id
  route.get("/:id", middlewares.isAuth, async (req: any, res: Response) => {
    try {
      const id = req.params.id;
      console.log(`Get team service id: ${id}`);
      // Call service
      const data = await service.GetTeamId(+id);
      res.status(200).send(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  });
};
