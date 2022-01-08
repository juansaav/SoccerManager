import { PlayerType } from "../da/playerType.enum";

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
