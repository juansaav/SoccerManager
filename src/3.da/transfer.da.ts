import { ITransfer, ITransferUpdateDTO } from "../interfaces/ITransfer";
import { db } from "./dbconnection";

export class TransferDA {
  public async GetTransfers(): Promise<ITransfer[]> {
    var obj = await db.transferPlayer.findMany({
      where: {
        active: true,
      },
    });
    return obj;
  }
  public async GetTransferId(transferId: number): Promise<ITransfer> {
    var obj = await db.transferPlayer.findFirst({
      where: {
        id: transferId,
      },
    });
    return obj;
  }
  public async CreateTransfer(obj: ITransfer): Promise<ITransfer> {
    return await db.transferPlayer.create({
      data: obj,
    });
  }

  public async UpdateTransfer(
    id: number,
    data: ITransferUpdateDTO
  ): Promise<ITransfer> {
    return await db.transferPlayer.update({
      where: { id },
      data,
    });
  }
}
