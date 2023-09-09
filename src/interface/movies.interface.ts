import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import Movie  from "../entities/movies.entity";
import { 
    createSchemaMovie, 
    returnCreateSchemaMovie, 
    multipleReturnSchemaMovies, 
    updateMovieSchema, 
    schemaSort, 
    paginationSchemaMovie 
} from "../schemas/movies.schemas";

type iCreateMovie = z.infer<typeof createSchemaMovie>;
type iUpdateMovie = DeepPartial<Movie>;
type iUpdateMovieRequest = z.infer<typeof updateMovieSchema>
type iRepoMovie = Repository<Movie>;
type iCreateReturnMovie = z.infer<typeof returnCreateSchemaMovie>
type iMultipleReturnMovies = z.infer<typeof multipleReturnSchemaMovies> 
type iSort = z.infer<typeof schemaSort>
type iPaginationMovie = z.infer<typeof paginationSchemaMovie>

export {
    iCreateMovie, 
    iUpdateMovie, 
    iRepoMovie, 
    iCreateReturnMovie,
    iMultipleReturnMovies, 
    iUpdateMovieRequest, 
    iSort, 
    iPaginationMovie
};