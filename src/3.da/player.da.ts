import { IPlayer, IPlayerUpdateDTO } from "../interfaces/IPlayer";
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

  public async UpdatePlayer(
    id: number,
    data: IPlayerUpdateDTO
  ): Promise<IPlayer> {
    return await db.player.update({
      where: { id },
      data,
    });
  }
}
