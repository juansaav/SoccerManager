// import { IMovie, IMovieInputDTO } from "../interfaces/ITeam"; 
// import { db } from "../da/dbconnection"; 

// export class MovieDA { 

//     // Create movie
//     public async CreateMovie(newMovie: IMovieInputDTO) {

//         // Insert movies
//         delete newMovie['genre_ids']; // TODO, NO ELIMINARLO 
//         const movie = await db.movie.create({
//           data: newMovie       
//         })
//         return movie;

//     }
    
//     // Return all movies
//     public async GetAllMovies(): Promise<IMovie[]> { 
//         var movies = await  await db.movie.findMany({
//           orderBy: [
//             {
//               suggestionScoreforToday: 'desc',
//             }
//           ],
//         })
//         return movies;
//     }

//     // Return all movies filtered by keyword
//     public async GetMoviesByKey(keyWord: string ): Promise<IMovie[]> { 

//         var movies = await  await db.movie.findMany({
//             where: {
//               OR: [
//               {
//                 backdrop_path: {
//                   contains: keyWord,
//                 },
//               },  
//               {
//                 original_language: {
//                   contains: keyWord,
//                 },
//               }, 
//               {
//                 original_title: {
//                   contains: keyWord,
//                 },
//               }, 
//               {
//                 overview: {
//                   contains: keyWord,
//                 },
//               }, 
//               {
//                 poster_path: {
//                   contains: keyWord,
//                 },
//               }, 
//               {
//                 release_date: {
//                   contains: keyWord,
//                 },
//               }, 
//               {
//                 title: {
//                   contains: keyWord,
//                 },
//               }, 
//             ],
//           },
//           orderBy: [
//             {
//               suggestionScoreforToday: 'desc',
//             }
//           ],
//         })
//         return movies;
        
//     }
 
// }