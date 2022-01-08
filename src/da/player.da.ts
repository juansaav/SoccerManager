import { IPlayer } from "../interfaces/IPlayer";
import { db } from "./dbconnection";

export class PlayerDA {
  public async CreatePlayer(newItem: IPlayer): Promise<IPlayer> {
    // Insert player
    return await db.player.create({
      data: newItem,
    });
  }
}
