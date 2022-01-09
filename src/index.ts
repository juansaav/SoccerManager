
// Imports

import express from 'express';
import dotenv from 'dotenv';
import config from './config'; 
import { UserDA, ConfigurationDA, TeamDA, PlayerDA } from "./3.da";
import {
  UserService,
  ConfigurationService,
  SessionService,
} from "./2.services";
import {
  UserRouter,
  SessionRouter,
  TeamRouter,
  PlayerRouter,
} from "./1.api/routes";
import { TeamService } from "./2.services/team.service";
import { PlayerService } from "./2.services/player.service";

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

// Service layer
const playerService = new PlayerService(playerDa);
const teamService = new TeamService(teamDa, playerService);
const userService = new UserService(userDa, teamService);
const sessionService = new SessionService(userService);

// Routers
PlayerRouter(router, playerService);
TeamRouter(router, teamService);
UserRouter(router, userService);
SessionRouter(router, sessionService);

// -------------------------------------------------------------
// Start app

app.listen(config.PORT, function() {  
   console.log("##############################\n"+
   	           "Server is running on port " + config.PORT + "\n" + 
   	           "##############################");

   // Import movies if required
   // let configService = new ConfigurationService(new ConfigurationDA(), new MovieDA());
   // configService.importMovies();

});

/**
 * Handle 401 thrown by express-jwt library
 */
app.use((err, req, res, next) => {  
if (err.name === 'UnauthorizedError') {    
	res.status(401).json({"error" : err.name + ": " + err.message})  
}})

// For tests
export default app