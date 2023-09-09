import { Router } from "express";
import { 
    movieCreateController, 
    movieDeleteController, 
    movieReadAllController, 
    updateMovieController 
} from "../controllers/movies.controller";
import { createSchemaMovie, updateMovieSchema } from "../schemas/movies.schemas";
import dataValidMiddleware from "../middlewares/dataIsValid.middleware";
import nameDontExistMiddleware from "../middlewares/nameDontExist.middleware";
import movieExistMiddleware from "../middlewares/moviesExists.middlewares";

const moviesRouter = Router();

moviesRouter.post("", dataValidMiddleware(createSchemaMovie), nameDontExistMiddleware, movieCreateController)

moviesRouter.get("", movieReadAllController)

moviesRouter.patch("/:id", dataValidMiddleware(updateMovieSchema), movieExistMiddleware, nameDontExistMiddleware, updateMovieController)

moviesRouter.delete("/:id", movieExistMiddleware, movieDeleteController)

export default moviesRouter;