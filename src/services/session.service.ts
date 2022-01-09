import jwt from 'jsonwebtoken'; 
import argon2 from 'argon2';
import { IUser } from '../interfaces'; 
import { UserService } from '../services'; 
import { UserDA } from '../da'; 
import config from '../config';
 
export class SessionService {
  constructor(private userService: UserService) {}

  // Login service
  public async SignIn(
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> {
    console.log("Sign in service email:" + email);

    // User from db
    const user = await this.userService.GetUserEmail(email);

    // Check if exists
    if (!user) {
      throw new Error("User not registered");
    }

    // Verify password using salt
    const validPassword = await argon2.verify(user.password, password);
    if (validPassword) {
      // Valid password
      console.log("Password is valid");

      // Generate token
      console.log("Generate JWT");
      const token = this.generateToken(user);

      // Delete sensible data
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");

      // Return token
      return { token: token, user: user };
    } else {
      throw new Error("Invalid Password");
    }
  }

  public generateToken(user: IUser): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    // Generate signed token and sign it
    return jwt.sign(
      {
        id: user.id, // We are gonna use this in the middleware 'isAuth'
        email: user.email,
      },
      config.JWT_SECRET,
      { expiresIn: "1800s" }
    );
  }
}
