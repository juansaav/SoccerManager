// import { MovieDA } from "../da"; 
// import { IMovie, IMovieInputDTO } from "../interfaces/ITeam"; 
// import config from '../config'; 
// import * as request from "request-promise-native";

// export class MovieService {

//     constructor(private movieda: MovieDA) { }

//     // Get movies filtered by keyWord
//     public async GetMoviesFiltered(keyWord: string): Promise<IMovie[]> {
//         console.log("Get movies keyword: " + keyWord)
//         return await this.movieda.GetMoviesByKey(keyWord);          
//     } 

//     // Get all movies
//     public async GetAllMovies(): Promise<IMovie[]> {
//         console.log("Get all movies ")
//         return await this.movieda.GetAllMovies();          
//     } 

//     // Insert list of movies
//     public async InsertMovies(movies : [IMovieInputDTO]) {
//         console.log("Insert movies")
//         for (var newM of movies) {
//             newM.suggestionScoreforToday = Math.floor(Math.random() * 100);
//             this.movieda.CreateMovie(newM);
//         }
//     }   

//     // Import movies from themoviedb
//     public async ImportMovies() { 
//         console.log("Importing movies from themoviedb.org...")
        
//         const baseUrl = process.env.THEMOVIEDB_URL;
//         const queryString = '?api_key=' + config.THEMOVIEDB_KEY;  
//         var options = {
//             uri: baseUrl + queryString,
//         };

//         const resp = <string> await request.get(options);
//         const movies = JSON.parse(resp).results; 

//         this.InsertMovies(movies);
//         console.log("Finished importing.")
//     }   
// }