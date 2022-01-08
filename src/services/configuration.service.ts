import { ConfigurationDA } from "../da";     
// import { MovieService } from '../services/index';  
 
let MOVIES_MIGRATION_KEY = "movies_imported"; 

export class ConfigurationService {

    constructor(private configda: ConfigurationDA) { } 
    
    // // Check import movies
    // public async importMovies() {
    //     try {
    //         const movieService = new MovieService(this.movieda);
            
    //         // Check previous import
    //         const data = await this.configda.GetConfiguration(MOVIES_MIGRATION_KEY);

    //         if ( !data ) {
              
    //             // Movies not imported, import them  
    //             movieService.ImportMovies();

    //             // Movies imported insert config
    //             const insert: IConfigurationInputDTO = {
    //                 key: MOVIES_MIGRATION_KEY, 
    //                 value: "" + new Date()
    //             }; 
    //             this.configda.CreateConfiguration(insert); 

    //         } else {
    //             console.log("Movies already imported on " + data.value + ".")
    //         }
    //     } catch (error) { 
    //         throw error;
    //     }
    // }
}