import { UserDA } from "../da"; 
import { IUser, IUserInputDTO } from "../interfaces/IUser"; 
import { SessionService } from '../services'; 
import jwt from 'jsonwebtoken'; 
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto'; 

export class UserService {

    constructor(private userda: UserDA) { }
   
    // Get User by id
    public async GetUserId(id: number) {
        return await this.userda.GetUserId(id); 
    } 

    // Get User by email
    public async GetUserEmail(email: string) {
        return await this.userda.GetUserEmail(email); 
    } 

    // // Get favourite Movies for User
    // public async GetFavouriteMovies(userId: number) { 
    //     console.log('Get favourite movies user:' + userId ); 
    //     return this.userda.GetFauvoriteMovies(userId);         
    // } 

    // // Add favourite Movie 
    // public async AddFavouriteMovie(userId: number, movieId) {     
    //     console.log('Add favourite movie user:' + userId + ' movie:' + movieId);  
    //     return await this.userda.AddFauvoriteMovie(userId, movieId); 
    // } 

    // Create User
    public async CreateUser(userInputDTO: IUserInputDTO) : Promise<IUser>   {

        console.log('Create user service ' + userInputDTO.email);

        const sessionService = new SessionService(this.userda);         

        //Check if email is already in use 
        var exists = await this.GetUserEmail(userInputDTO.email); 
        if ( !exists ) {

            // Hash pwd using salt. This is used to better secure the pwd
            const salt = randomBytes(32);
            const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

            // Create user 
            const user = await this.userda.CreateUser({
                email: userInputDTO.email,
                firstName: userInputDTO.firstName,
                lastName: userInputDTO.lastName,
                salt: salt.toString('hex'),
                password: hashedPassword,
                team: undefined
            });
            if (!user) {
              throw new Error('User cannot be created');
            } 

            // Delete sensible data
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
  
            return user;
  
        } else {  
          // Email already in use.         
          throw new Error('Email already in use.');
        }        
    }
}  
