import { IPlayer } from "../interfaces/IPlayer";
import { db } from "./dbconnection";

export class PlayerDA {
  public async CreatePlayer(newItem: IPlayer): Promise<IPlayer> {
    // Insert player
    return await db.player.create({
      data: newItem,
    });
  }

  public async GetPlayerId(id: number): Promise<IPlayer> {
    var obj = await db.player.findUnique({
      where: {
        id: id,
      },
    });
    return obj;
  }
}
