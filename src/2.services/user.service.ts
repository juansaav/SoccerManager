import { UserDA } from "../3.da";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import { TeamService } from "./team.service";
import { PlayerService } from "./player.service";
import config from "../config";
import sendWelcomeEmail from "./bee-queue/client";

export class UserService {
  constructor(private userda: UserDA, private teamService: TeamService) {}

  private defaultCountryCode = config.DEFAULT_COUNTRY;

  // Get User by id
  public async GetUserId(id: number, includeTeam: boolean = false) {
    return await this.userda.GetUserId(id, includeTeam);
  }

  // Get User by email
  public async GetUserEmail(email: string) {
    return await this.userda.GetUserEmail(email);
  }

  // Create User
  public async CreateUser(userInputDTO: IUserInputDTO): Promise<IUser> {
    console.log("Create user service email: " + userInputDTO.email);

    //Check if email is already in use
    var exists = await this.GetUserEmail(userInputDTO.email);
    if (exists) {
      throw new Error("Email already in use.");
    }

    // Create user

    // Hash pwd using salt. This is used to better secure the pwd
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(userInputDTO.password, {
      salt,
    });
    const user = await this.userda.CreateUser({
      email: userInputDTO.email,
      firstName: userInputDTO.firstName,
      lastName: userInputDTO.lastName,
      salt: salt.toString("hex"),
      password: hashedPassword,
      countryCode: userInputDTO.countryCode || this.defaultCountryCode,
    });
    if (!user) {
      throw new Error("User cannot be created");
    }

    // Create team
    // Obs: This code could be moved to a separate service and called after sign up.
    const team = await this.teamService.CreateTeam(user.id, user.countryCode);
    user.team = team;

    // send welcome email
    sendWelcomeEmail(user.email);

    return IUser(user);
  }
}
