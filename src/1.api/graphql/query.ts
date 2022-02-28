import { PlayerService } from "../../2.services";

function getQuery(playerService: PlayerService) {
  const query = {
    players: async ({ limit }, context) => {
      console.log("GraphQL get players limit: " + limit);
      return await playerService.GetPlayers(limit);
    },
    player: async ({ id }, context) => {
      console.log("GraphQL get player id: " + id);
      return await playerService.GetPlayerId(+id);
    },
  };
  return query;
}

export default getQuery;
