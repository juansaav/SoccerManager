import schema from "./schema";
import { PlayerService } from "../../2.services";
import getQuery from "./query";
import getMutation from "./mutation";

export default function getGraphQLSchema(playerService: PlayerService) {
  const query = getQuery(playerService);
  const mutation = getMutation(playerService);

  const resolvers = {
    ...query,
    ...mutation,
  };

  return {
    schema,
    resolver: resolvers,
  };
}
