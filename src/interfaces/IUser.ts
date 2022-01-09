import { Utils } from "../utils/utils";
import { ITeam } from "./ITeam";

export interface IUser {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  password: string;
  salt: string;
  team?: ITeam;
}

export function IUser(obj: IUser): IUser {
  // Remove properties
  Reflect.deleteProperty(obj, "password");
  Reflect.deleteProperty(obj, "salt");
  return Utils.cleanObj(obj);
}

export interface IUserInputDTO {
  email: string;
  firstName?: string;
  lastName?: string;
  countryCode: string;
  password: string;
}
