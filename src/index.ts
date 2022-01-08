
// Imports

import express from 'express';
import dotenv from 'dotenv';
import config from './config'; 
import { UserDA, ConfigurationDA } from './DA'; 
import { UserService, ConfigurationService, SessionService } from './services'; 
import { UserRouter, SessionRouter } from "./api/routes";

// Initial configuration

dotenv.config(); 

const app = express();
const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router);


// Define Routers

UserRouter(router, new UserService(new UserDA()));
// MovieRouter(router, new MovieService(new MovieDA()));
SessionRouter(router, new SessionService(new UserDA()));

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