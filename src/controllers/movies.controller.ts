import { Request, Response } from "express";
import { iCreateMovie, iUpdateMovie, iMultipleReturnMovies } from "../interface/movies.interface";
import { schemaSort } from "../schemas/movies.schemas";
import createMovies from "../services/users/createMovies.service";
import deleteMovies from "../services/users/deleteMovies.service";
import readAllMovies from "../services/users/readMovies.service";
import movieUpdate from "../services/users/updateMovies.service";

const movieCreateController = async (req: Request, res: Response) => {
    const movieData: iCreateMovie = req.body;

    const newMovie = await createMovies(movieData);

    res.status(201).json(newMovie);
};

const movieReadAllController = async (
    req: Request,
    res: Response,
): Promise<Response<iMultipleReturnMovies>> =>{
    const { page, perPage, order, sort } = req.query;
    const newSort = schemaSort.parse(sort);

    const movies = await readAllMovies(page, perPage, order, newSort);

    return res.status(200).json(movies);
};

const movieDeleteController = async (
    req: Request,
    res: Response,
): Promise<Response> =>{
    const idParam = parseInt(req.params.id);

    await deleteMovies(idParam);

    return res.status(204).send();
};

const updateMovieController = async (req: Request, res: Response) =>{
    const requestData: iUpdateMovie = req.body;

    const idParam = parseInt(req.params.id);

    const movie = await movieUpdate(requestData, idParam);

    return res.status(200).json(movie);
};

export {movieCreateController, movieReadAllController, movieDeleteController, updateMovieController}