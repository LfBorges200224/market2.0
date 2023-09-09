import { AppDataSource } from "../../data-source";
import Movie from "../../entities/movies.entity";
import { iRepoMovie } from "../../interface/movies.interface";

const deleteMovies = async (idMovie: number): Promise<void> =>{
    const repositoryMovie: iRepoMovie = AppDataSource.getRepository(Movie);

    const movie = await repositoryMovie.findOne({
        where: {
            id: idMovie
        }
    });

    await repositoryMovie.remove(movie!);
};

export default deleteMovies;