import { IPlayer } from "./IPlayer";

export interface ITeam {
  id?: number;
  name: string;
  countryCode: string;
  budget: number;
  userId: number;
  players?: IPlayer[];
}

 
