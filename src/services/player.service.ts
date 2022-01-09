import { PlayerDA } from "../da";
import { IPlayer } from "../interfaces/IPlayer";
import { Utils } from "../utils/utils";
import { PlayerType } from "../da/playerType.enum";
import randomName from "random-name";
import * as _ from "lodash";

export class PlayerService {
  constructor(private playerda: PlayerDA) {}

  // Generates initial random players
  public async GenerateRandomPlayers(
    teamId: number,
    countryCode: string
  ): Promise<IPlayer[]> {
    console.log("Create player service teamId: " + teamId);

    // TODO: move to config
    const config = {
      Goalkeepers: 3,
      Defenders: 6,
      Midfielders: 6,
      Attackers: 5,
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
    console.log(`Created ${players.length} players teamId: ${teamId}.`);
    return players;
  }

  // Create Player
  public async CreateRandomPlayer(
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
