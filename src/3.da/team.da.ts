import { ITeam, ITeamUpdateDTO } from "../interfaces/ITeam";
import { db } from "./dbconnection";

export class TeamDA {
  public async GetTeamId(id: number, includePlayers?: boolean): Promise<ITeam> {
    var obj = await db.team.findUnique({
      where: {
        id: id,
      },
      include: {
        players: includePlayers,
      },
    });
    return obj;
  }

  public async CreateTeam(obj: ITeam): Promise<ITeam> {
    return await db.team.create({
      data: obj,
    });
  }

  public async UpdateTeam(id: number, data: ITeamUpdateDTO): Promise<ITeam> {
    return await db.team.update({
      where: { id },
      data,
    });
  }
}
