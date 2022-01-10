export interface ITransfer {
  id?: number;
  price: number;
  publishedOn?: Date;
  trenasferedOn?: Date;
  trenasferedTo?: number;
  active?: boolean;

  playerId: number;
}

export interface ITransferUpdateDTO {
  teamId?: number;
  active?: boolean;
  trenasferedOn?: Date;
  trenasferedTo?: number;
}
