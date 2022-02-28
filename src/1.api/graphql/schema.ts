import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        players(limit: Int): [Player]
        player(id: ID!): Player
    }
    type Mutation {
        addPlayer(data: IPlayerAddDTO): PlayerResponse
        updatePlayer(id: ID!, data: IPlayerUpdateDTO): PlayerResponse
        deletePlayer(id: ID!): PlayerResponse
    }
    type Player {
        id: ID
        firstName: String!
        lastName: String!
        countryCode: String
        type: String!
        age: Int!
        value: Int!
        teamId: Int
    }
    type Players {
        players: [Player]
    }
    type PlayerResponse {
        data: Player
        error: String
        ok: Boolean
    }
    input IPlayerUpdateDTO {
        firstName: String
        lastName: String
        countryCode: String
        value: Int
        teamId: Int
    }
    input IPlayerAddDTO {
        id: ID
        firstName: String!
        lastName: String!
        countryCode: String
        type: String!
        age: Int!
        value: Int!
        teamId: Int
    }
`);

export default schema;
