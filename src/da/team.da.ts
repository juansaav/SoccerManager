import { ITeam } from "../interfaces/ITeam";
import { db } from "./dbconnection"; 

export class TeamDA {
  public async CreateTeam(newItem: ITeam): Promise<ITeam> {
    // Insert team
    return await db.team.create({
      data: newItem,
    });
  }
} 