import { TeamDA } from "../3.da";
import { Team, ITeamUpdateDTO, ITeam } from "../interfaces/ITeam";
import { PlayerService } from "./player.service";

export class TeamService {
  constructor(private teamda: TeamDA, private playerService: PlayerService) {}

  public async GetTeamId(id: number) {
    return Team(await this.teamda.GetTeamId(id));
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

    return Team(team);
  }

  // Chacks if the user is the owner of the team
  public async ValidateUpdateTeam(
    id: number,
    userId: number,
    obj: ITeamUpdateDTO
  ) {
    const team = await this.teamda.GetTeamId(id);
    if (!team) {
      throw { code: 404, message: "Team not found" };
    }
    if (team.userId !== userId) {
      throw { code: 401 };
    }

    await this.UpdateTeam(id, obj);
  }

  // Updates the team
  public async UpdateTeam(id: number, obj: ITeamUpdateDTO) {
    await this.teamda.UpdateTeam(id, obj);
  }
}
