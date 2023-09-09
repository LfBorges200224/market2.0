import { iCreateMovie, iCreateReturnMovie, iRepoMovie } from "../../interface/movies.interface";
import { AppDataSource } from "../../data-source";
import Movie from "../../entities/movies.entity";
import { returnCreateSchemaMovie } from "../../schemas/movies.schemas";

const createMovies = async (
    movieData: iCreateMovie
): Promise<iCreateReturnMovie> => {
    const repositoryMovie: iRepoMovie = AppDataSource.getRepository(Movie);

    const movie = repositoryMovie.create(movieData);
    await repositoryMovie.save(movie);

    const newMovie: iCreateReturnMovie = returnCreateSchemaMovie.parse(movie)

    return newMovie;
}

export default createMovies;