import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import Movie from "../entities/movies.entity"
import { AppError } from "../erro"
import { iRepoMovie } from "../interface/movies.interface"

const nameDontExistMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const movieRepository: iRepoMovie = AppDataSource.getRepository(Movie);
    const movieName = req.body.name;

    if(movieName){
        const findName = await movieRepository.exist({
            where: {name: movieName},
        });

        if(findName){
            throw new AppError("Movie already exists.", 409);
        }

    }

    return next();
};

export default nameDontExistMiddleware;