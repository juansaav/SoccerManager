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

export function ITeam(obj: ITeam): ITeam {
  obj.value = obj?.players.map((x) => x.value).reduce((a, b) => a + b, 0) || 0;
  return obj;
}

 
