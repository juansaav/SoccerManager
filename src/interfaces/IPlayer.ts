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
  value?: number;
  teamId: number;
}
