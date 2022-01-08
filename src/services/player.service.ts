import { PlayerDA } from "../da";
import { IPlayer } from "../interfaces/IPlayer";
import { Utils } from "../utils/utils";
import { PlayerType } from "../da/playerType.enum";
import randomName from "random-name";

export class PlayerService {
  constructor(private playerda: PlayerDA) {}

  // Create Player
  public async CreatePlayer(
    teamId: number,
    type: PlayerType,
    countryCode: string
  ): Promise<IPlayer> {
    console.log("Create player service teamId " + teamId);

    // Create player
    const player = await this.playerda.CreatePlayer({
      firstName: randomName.first(),
      lastName: randomName.last(),
      countryCode: countryCode,
      type: type,
      //TODO SEND TO CONFIG
      age: Utils.randomInt(18, 40),
      value: 1000000,
      teamId,
    });
    if (!player) {
      throw new Error("Player cannot be created");
    }
    return player;
  }
}
