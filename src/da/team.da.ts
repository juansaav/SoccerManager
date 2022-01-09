import { ITeam } from "../interfaces/ITeam";
import { db } from "./dbconnection";

export class TeamDA {
  public async GetTeamId(id: number): Promise<ITeam> {
    var obj = await db.team.findUnique({
      where: {
        id: id,
      },
      include: {
        players: true,
      },
    });
    return obj;
  }

  public async CreateTeam(newItem: ITeam): Promise<ITeam> {
    return await db.team.create({
      data: newItem,
    });
  }
}
