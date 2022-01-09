import { PlayerType } from "../3.da/playerType.enum";

export interface IPlayer {
  id?: number;
  firstName: string;
  lastName: string;
  countryCode: string;
  type: string;
  age: number;
  value: number;
  teamId: number;
}


export interface IPlayerUpdateDTO {
  firstName?: string;
  lastName?: string;
  countryCode?: string;
}