import { TeamService } from "../../2.services";
import { Router, Response, Request } from "express";
import middlewares from "../middlewares";
import { body } from "express-validator";
import { Utils } from "../../common/utils";
import { ErrorHandler } from "../../common/errors";

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
      data ? res.status(200).send(data) : res.sendStatus(404);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  });

  // Edit team
  route.put(
    "/:id",
    middlewares.isAuth,
    // valid country code
    body("countryCode")
      .optional()
      .custom((val) => {
        return Utils.validCountry(val);
      }),
    // name is string
    body("name").optional().isString(),
    middlewares.checkValidations,

    async (req: any, res: Response) => {
      try {
        const id = req.params.id;
        const obj = req.body;
        const userId = req.user.id;
        console.log(`Update team teamId: ${id}`);
        // Call service
        await service.UpdateTeam(+id, +userId, obj);
        res.sendStatus(200);
      } catch (err) {
        ErrorHandler.update(res, err);
      }
    }
  );
};
