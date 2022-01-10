import { PlayerDA, TeamDA, UserDA } from "../3.da";
import { IPlayer, IPlayerUpdateDTO } from "../interfaces/IPlayer";
import { Utils } from "../common/utils";
import { PlayerType } from "../3.da/playerType.enum";
import randomName from "random-name";
import * as _ from "lodash";
import { TeamService, UserService } from ".";
import config from "../config";

export class PlayerService {
  private teamService;
  private userService;

  constructor(private playerda: PlayerDA, teamDa: TeamDA, userDa: UserDA) {
    // TODO: improve this part, circular dependency
    this.teamService = new TeamService(teamDa, this);
    this.userService = new UserService(userDa, this.teamService);
  }

  public async GetPlayerId(id: number) {
    return await this.playerda.GetPlayerId(id);
  }

  // Generates initial random players
  public async GenerateRandomPlayers(
    teamId: number,
    countryCode: string
  ): Promise<IPlayer[]> {
    console.log("Generate random players teamId: " + teamId);

    const configObj = config.TEAM_CONFIG;
    // Create players and return
    const players = [];
    for (const key in configObj) {
      for (let i = 0; i < configObj[key]; i++) {
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

  public async ValidateUpdatePlayer(
    id: number,
    userId: number,
    obj: IPlayerUpdateDTO
  ) {
    const [user, player] = await Promise.all([
      this.userService.GetUserId(userId, true),
      this.GetPlayerId(id),
    ]);
    if (!player) {
      throw { code: 404, message: "Player not found" };
    }
    if (player.teamId !== user.team.id) {
      throw {
        code: 401,
        message: "User is not the owner of the team " + player.teamId,
      };
    }
    await this.playerda.UpdatePlayer(id, obj);
  }

  public async UpdatePlayer(id: number, obj: IPlayerUpdateDTO) {
    await this.playerda.UpdatePlayer(id, obj);
  }
}
