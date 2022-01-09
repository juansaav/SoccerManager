import { TeamDA } from "../da"; 
import { ITeam } from "../interfaces/ITeam"; 
import { SessionService } from '.'; 
import argon2 from 'argon2';
import { randomBytes } from 'crypto'; 

export class TeamService {
  constructor(private teamda: TeamDA) {}

  // Create Team
  public async CreateTeam(userId: number, countryCode: string): Promise<ITeam> {
    console.log("Create team service user: " + userId);

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
    return team;
  }
}  