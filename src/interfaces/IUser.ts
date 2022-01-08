import { ITeam } from "./ITeam"; 

export interface IUser {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  salt: string;
  team?: ITeam;
}

export interface IUserInputDTO {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}
