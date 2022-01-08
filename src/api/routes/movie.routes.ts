// // import { MovieService } from '../../services';
// import { Router, Response, Request } from 'express';
// import middlewares from '../middlewares';

// const route = Router()

// export const MovieRouter = (router: Router, service: MovieService): void => {
 
//     router.use('/movie', route);

//     // Return moveis
//     route.get('/', middlewares.isAuth, async (req, res: Response) => {
//         try { 
//             var data; 
//             console.log(req.query)
//             if (req.query.keyWord){
//                 // Return filtered movies
//                  data = await service.GetMoviesFiltered((req.query as any).keyWord);
//             } else {                
//                 // Return all movies
//                  data = await service.GetAllMovies();
//             }
//             res.status(200).send(data);
//         }
//         catch (err) { 
//             console.log(err.message);            
//             res.status(500).send(err.message)
//         }
//     })
// }