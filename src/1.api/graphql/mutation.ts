import { PlayerService } from "../../2.services";
import { IPlayer, IPlayerUpdateDTO } from "../../interfaces/IPlayer";

function getMutation(playerService: PlayerService) {
  const mutation = {
    addPlayer: async (request: { data: IPlayer }, context) => {
      console.log("GraphQL add player: " + JSON.stringify(request.data));
      return await playerService.CreatePlayer(request.data);
    },

    updatePlayer: async (
      request: { id: number; data: IPlayerUpdateDTO },
      context
    ) => {
      console.log("GraphQL update player: " + JSON.stringify(request.data));
      return await playerService.UpdatePlayer(+request.id, request.data);
    },

    deletePlayer: async ({ id }, context) => {
      console.log("GraphQL delete player id: " + id);
      return await playerService.DeletePlayer(+id);
    },
  };
  return mutation;
}
export default getMutation;
