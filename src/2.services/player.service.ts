import { PlayerDA } from "../3.da";
import { IPlayer } from "../interfaces/IPlayer";
import { Utils } from "../common/utils";
import { PlayerType } from "../3.da/playerType.enum";
import randomName from "random-name";
import * as _ from "lodash";

export class PlayerService {
  constructor(private playerda: PlayerDA) {}

  public async GetPlayerId(id: number) {
    return await this.playerda.GetPlayerId(id);
  }

  // Generates initial random players
  public async GenerateRandomPlayers(
    teamId: number,
    countryCode: string
  ): Promise<IPlayer[]> {
    console.log("Generate random players teamId: " + teamId);

    // TODO: move to config
    const config = {
      Goalkeeper: 3,
      Defender: 6,
      Midfielder: 6,
      Attacker: 5,
    };
    // Create players and return
    const players = [];
    for (const key in config) {
      for (let i = 0; i < config[key]; i++) {
        const add = await this.CreateRandomPlayer(
          teamId,
          <PlayerType>key,
          countryCode
        );
        players.push(add);
      }
    }
    return players;
  }

  // Create Player
  private async CreateRandomPlayer(
    teamId: number,
    type: PlayerType,
    countryCode: string
  ): Promise<IPlayer> {
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
