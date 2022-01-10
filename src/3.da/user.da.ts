import { IUser } from "../interfaces";
import { db } from "./dbconnection";

export class UserDA {
  public async GetUserId(
    id: number,
    includeTeam: boolean = false
  ): Promise<IUser> {
    // Get user by Id
    var user = await db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        team: includeTeam,
      },
    });
    return user;
  }

  public async GetUserEmail(email: string): Promise<IUser> {
    // Get user by email
    return await db.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async CreateUser(newUser: IUser): Promise<IUser> {
    // Insert user
    return await db.user.create({
      data: newUser,
    });
  }
}
