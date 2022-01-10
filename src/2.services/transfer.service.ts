import { TeamService, UserService } from ".";
import { TransferDA } from "../3.da";
import { Utils } from "../common/utils";
import config from "../config";
import { ITransfer, ITransferUpdateDTO } from "../interfaces/ITransfer";
import { PlayerService } from "./player.service";

export class TransferService {
  constructor(
    private transferda: TransferDA,
    private playerService: PlayerService,
    private userService: UserService,
    private teamService: TeamService
  ) {}

  public async GetTransfers() {
    return await this.transferda.GetTransfers();
  }

  public async GetTransferId(id: number) {
    return await this.transferda.GetTransferId(id);
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
      active: true,
    });
    if (!transfer) {
      throw new Error("Transfer cannot be created");
    }
    return transfer;
  }

  public async UpdateTransfer(userId, transferId: number): Promise<ITransfer> {
    const a = 1;
    // Validations
    const [user, transferObj] = await Promise.all([
      this.userService.GetUserId(userId, true),
      this.GetTransferId(transferId),
    ]);
    if (!transferObj) {
      throw { code: 404, message: "Transfer player not found" };
    }
    // Get player
    const player = await this.playerService.GetPlayerId(transferObj.playerId);
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

    // Update old team budget
    await this.teamService.UpdateTeam(user.team.id, {
      budget: user.team.budget - transferObj.price,
    });

    // Update new team budget
    await this.teamService.UpdateTeam(player.teamId, {
      budget: user.team.budget + transferObj.price,
    });

    // Update player value
    const { min, max } = config.INCREASE_PLAYER_VALUE;
    const playerU = await this.playerService.UpdatePlayer(player.id, {
      value: player.value + (player.value * Utils.randomInt(min, max)) / 100,
      teamId: user.team.id,
    });

    return transfer;
  }
}
