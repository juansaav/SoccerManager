import { UserDA } from "../da"; 
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import { TeamService } from "./team.service";
import { PlayerService } from "./player.service";

export class UserService {
  constructor(
    private userda: UserDA,
    private teamService: TeamService,
    private playerService: PlayerService
  ) {}

  // TODO: move to config
  private defaultCountryCode = "US";

  // Get User by id
  public async GetUserId(id: number) {
    return await this.userda.GetUserId(id);
  }

  // Get User by email
  public async GetUserEmail(email: string) {
    return await this.userda.GetUserEmail(email);
  }

  // // Get favourite Movies for User
  // public async GetFavouriteMovies(userId: number) {
  //     console.log('Get favourite movies user:' + userId );
  //     return this.userda.GetFauvoriteMovies(userId);
  // }

  // // Add favourite Movie
  // public async AddFavouriteMovie(userId: number, movieId) {
  //     console.log('Add favourite movie user:' + userId + ' movie:' + movieId);
  //     return await this.userda.AddFauvoriteMovie(userId, movieId);
  // }

  // Create User
  public async CreateUser(userInputDTO: IUserInputDTO): Promise<IUser> {
    console.log("Create user service email: " + userInputDTO.email);

    //Check if email is already in use
    var exists = await this.GetUserEmail(userInputDTO.email);
    if (exists) {
      throw new Error("Email already in use.");
    }

    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // Create team & players
    // Obs: This code could be moved to a separate service and called after sign up.
    const team = await this.teamService.CreateTeam(user.id, user.countryCode);
    const players = await this.playerService.GenerateRandomPlayers(
      team.id,
      user.countryCode
    );

    // Clean and return entire object
    // TODO: user render schema
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");

    return { ...user, team: { ...team, players: players } };
  }
}  
