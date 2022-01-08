import { IUser } from "../interfaces"; 
import { db } from "../da/dbconnection"; 

export class UserDA { 

    public async GetUserId(id: number): Promise<IUser>  { 

        // Get user by Id
        var user = await db.user.findUnique({
          where: {
            id: id,
          },
        })
        return user;

    }

    public async GetUserEmail(email: string): Promise<IUser>  { 

        // Get user by email
        return await db.user.findUnique({
          where: {
            email: email,
          },
        }) 

    }

    public async CreateUser(newUser: IUser): Promise<IUser>   {

        // Insert user
        return await db.user.create({
          data: newUser       
        }) 

    }

    // public async GetFauvoriteMovies(userId: number):Promise<IMovie[]>  {

    //     // Get favourites movies
    //     const user = await db.user.findUnique({
    //       where: {
    //         id: userId,
    //       },
    //       include: {
    //         movies: { include: { movie: true } }, 
    //       },
    //     }); 
    //     // Return only movies 
    //     const result = user.movies.map(movie => {
    //       var movieRet = <IMovie> movie.movie
    //       movieRet.addedAt = movie.createdAt;
    //       return movieRet;
    //     })
    //     return result;

    // }s

    // public async AddFauvoriteMovie(userId: number, movieId: number): Promise<void>  {

    //     // Add favourite movie to user
    //     await db.favouriteMovies.create({
    //       data : { userId: userId, movieId: movieId }
    //     })
        
    // }
 
} 