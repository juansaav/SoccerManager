import { UserService } from '../../services';
import { Router, Response, Request } from 'express';
import middlewares from '../middlewares';
import { body } from "express-validator";

const route = Router();

export const UserRouter = (router: Router, service: UserService): void => {
  router.use("/user", route);

  // Create user
  route.post(
    "/",
    // email must be an email
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
    middlewares.checkValidations,

    async (req: Request, res: Response) => {
      try {
        // Call service
        const newUser = req.body;
        console.log(`New user service email: ${newUser.email}`);
        const data = await service.CreateUser(newUser);
        res.status(200).send(data);
      } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
      }
    }
  );

  // Add favourite movie
  // route.post(
  //   "/:userId/movie/:movieId",
  //   middlewares.isAuth,
  //   async (req: any, res: Response) => {
  //     try {
  //       const { userId } = req.params;
  //       const { movieId } = req.params;

  //       // Call service
  //       // const data = await service.AddFavouriteMovie(+userId, +movieId);
  //       const data = [];
  //       res.status(200).send(data);
  //     } catch (err) {
  //       console.log(err.message);
  //       res.status(500).send(err.message);
  //     }
  //   }
  // );

  // // Get user favourite movies
  // route.get(
  //   "/:userId/movie",
  //   middlewares.isAuth,
  //   async (req: any, res: Response) => {
  //     try {
  //       const userId = req.params.userId;

  //       // Call service
  //       // const data = await service.GetFavouriteMovies(+userId);
  //       const data = [];
  //       res.status(200).send(data);
  //     } catch (err) {
  //       console.log(err.message);
  //       res.status(500).send(err.message);
  //     }
  //   }
  // );
};