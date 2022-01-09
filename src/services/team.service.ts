import { TeamDA } from "../da";
import { ITeam } from "../interfaces/ITeam";
import { PlayerService } from "./player.service";

export class TeamService {
  constructor(private teamda: TeamDA, private playerService: PlayerService) {}

  public async GetTeamId(id: number) {
    return ITeam(await this.teamda.GetTeamId(id));
  }

  public async CreateTeam(userId: number, countryCode: string): Promise<ITeam> {
    // Create team
    const team = await this.teamda.CreateTeam({
      name: `Team of user ${userId}`,
      countryCode,
      // TODO send to config
      budget: 5000000,
      userId,
    });
    if (!team) {
      throw new Error("Team cannot be created");
    }

    // Create players
    const players = await this.playerService.GenerateRandomPlayers(
      team.id,
      countryCode
    );
    team.players = players;

    return ITeam(team);
  }
}
