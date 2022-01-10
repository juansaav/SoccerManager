import { TeamService, UserService } from ".";
import { TransferDA } from "../3.da";
import { ITransfer, ITransferUpdateDTO } from "../interfaces/ITransfer";
import { PlayerService } from "./player.service";

export class TransferService {
  constructor(
    private transferda: TransferDA,
    private playerService: PlayerService,
    private userService: UserService,
    private teamService: TeamService
  ) {}

  public async GetTransferPlayer(playerId: number) {
    return await this.transferda.GetTransferPlayer(playerId);
  }

  public async CreateTransfer(
    userId,
    playerId: number,
    price: number
  ): Promise<ITransfer> {
    const a = 1;
    // Validations
    const [user, player] = await Promise.all([
      this.userService.GetUserId(userId, true),
      this.playerService.GetPlayerId(playerId),
    ]);
    if (!player) {
      throw { code: 404, message: "Player not found" };
    }
    if (player.teamId !== user.team.id) {
      throw {
        code: 401,
        message: "User is not the owner of the team " + player.teamId,
      };
    }

    // Create transfer
    const transfer = await this.transferda.CreateTransfer({
      price: price,
      playerId: playerId,
    });
    if (!transfer) {
      throw new Error("Transfer cannot be created");
    }
    return transfer;
  }

  public async UpdateTransfer(
    userId,
    playerId: number,
    update: ITransferUpdateDTO
  ): Promise<ITransfer> {
    const a = 1;
    // Validations
    const [user, player, transferObj] = await Promise.all([
      this.userService.GetUserId(userId, true),
      this.playerService.GetPlayerId(playerId),
      this.GetTransferPlayer(playerId),
    ]);
    if (!player) {
      throw { code: 404, message: "Player not found" };
    }
    if (!transferObj) {
      throw { code: 404, message: "Transfer player not found" };
    }
    if (player.teamId === user.team.id) {
      throw {
        code: 400,
        message:
          "User is already the owner of that player teamId: " + player.teamId,
      };
    }
    if (user.team.budget < transferObj.price) {
      throw {
        code: 400,
        message: "Insuficient fonds teamId: " + user.team.id,
      };
    }

    // Update transfer and disable it
    const transfer = await this.transferda.UpdateTransfer(transferObj.id, {
      active: false,
      trenasferedOn: new Date(),
      trenasferedTo: user.team.id,
    });
    if (!transfer) {
      throw new Error("Transfer cannot be created");
    }

    // Update team budget
    const teamU = await this.teamService.UpdateTeam(user.team.id, {
      budget: user.team.budget - transferObj.price,
    });

    return transfer;
  }

  // public async UpdateTransfer(
  //   id: number,
  //   userId: number,
  //   obj: ITransferUpdateDTO
  // ) {
  //   const transfer = await this.transferda.GetTransferId(id);
  //   if (!transfer) {
  //     throw { code: 404, message: "Transfer not found" };
  //   }
  //   if (transfer.userId !== userId) {
  //     throw { code: 401 };
  //   }

  //   await this.transferda.UpdateTransfer(id, obj);
  // }
}
