
// Imports

import express from 'express';
import dotenv from 'dotenv';
import config from './config'; 
import { UserDA, TeamDA, PlayerDA, TransferDA } from "./3.da";
import { UserService, SessionService } from "./2.services";
import {
  UserRouter,
  SessionRouter,
  TeamRouter,
  PlayerRouter,
} from "./1.api/routes";
import { TeamService } from "./2.services/team.service";
import { PlayerService } from "./2.services/player.service";
import { TransferService } from "./2.services/transfer.service";
import { TransferRouter } from "./1.api/routes/transfer.routes";
import { graphqlHTTP } from "express-graphql";
import graphql from "./1.api/graphql/index";
import getGraphQLSchema from "./1.api/graphql/index";

// Initial configuration
dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// -------------------------------------------------------------
// Dependency Injection

// Data Access
const userDa = new UserDA();
const teamDa = new TeamDA();
const playerDa = new PlayerDA();
const transferDa = new TransferDA();

// Service layer
const playerService = new PlayerService(playerDa, teamDa, userDa);
const teamService = new TeamService(teamDa, playerService);
const userService = new UserService(userDa, teamService);
const sessionService = new SessionService(userService);
const transferService = new TransferService(
  transferDa,
  playerService,
  userService,
  teamService
);

// Routers
PlayerRouter(router, playerService);
TeamRouter(router, teamService);
UserRouter(router, userService);
SessionRouter(router, sessionService);
TransferRouter(router, transferService);

/**
 * GraphQL
 */
// Get schema
const { schema, resolver } = getGraphQLSchema(playerService);
app.use(
  config.GRAPHQL_PATH,
  graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    rootValue: resolver,
    graphiql: true,
    context: {
      request,
      response,
    },
  }))
);

// -------------------------------------------------------------
// Start app

app.listen(config.PORT, function () {
  console.log(
    "##############################\n" +
      "Server is running on port " +
      config.PORT +
      "\n" +
      "##############################"
  );
});

/**
 * Handle 401 thrown by express-jwt library
 */
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});






// For tests
export default app