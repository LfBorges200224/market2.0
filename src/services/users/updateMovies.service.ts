import { AppDataSource } from "../../data-source";
import Movie from "../../entities/movies.entity";
import { iRepoMovie, iUpdateMovie, iUpdateMovieRequest } from "../../interface/movies.interface";
import { updateMovieSchema } from "../../schemas/movies.schemas";

const movieUpdate = async (
 updateData: iUpdateMovie,
 idParam: number   
): Promise<iUpdateMovieRequest> => {
    const movieRepository: iRepoMovie = AppDataSource.getRepository(Movie);

    const movieUpdate = await movieRepository.findOneBy({
        id: idParam,
    });

    const movie = movieRepository.create({
        ...movieUpdate,
        ...updateData,
    })

    await movieRepository.save(movie);

    const movieUpdated = updateMovieSchema.parse(movie);

    return movieUpdated;
}

export default movieUpdate;