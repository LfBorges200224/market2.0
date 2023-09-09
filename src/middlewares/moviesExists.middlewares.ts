import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import Movie from "../entities/movies.entity";
import { AppError } from "../erro";
import { iRepoMovie } from "../interface/movies.interface";

const movieExistMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const movieRepository: iRepoMovie = AppDataSource.getRepository(Movie);

    const idParam = parseInt(req.params.id);
    
    const searchMovie = await movieRepository.findOne({where: {id:idParam}});

    if(!searchMovie) {
        throw new AppError("Movie not found", 404);
    }   
    
    return next();
};

export default movieExistMiddleware;