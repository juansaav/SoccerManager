import { Utils } from "../common/utils";
import { IPlayer } from "./IPlayer";

export interface ITeam {
  id?: number;
  name: string;
  countryCode: string;
  budget: number;
  userId: number;
  players?: IPlayer[];
  value?: number;
}

export function Team(obj: ITeam): ITeam {
  obj.value = obj?.players.map((x) => x.value).reduce((a, b) => a + b, 0) || 0;
  return Utils.cleanObj(obj);
}

export interface ITeamUpdateDTO {
  name?: string;
  countryCode?: string;
  budget?: number;
}
