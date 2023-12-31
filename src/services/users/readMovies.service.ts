import { AppDataSource } from "../../data-source";
import Movie from "../../entities/movies.entity";
import { iRepoMovie, iPaginationMovie, iSort } from "../../interface/movies.interface";
import { multipleReturnSchemaMovies } from "../../schemas/movies.schemas";

const readAllMovies = async (
    page:any,
    perPage:any,
    order:any,
    sort:iSort
): Promise<iPaginationMovie> =>{
    const movieRepository: iRepoMovie = AppDataSource.getRepository(Movie);

    if(perPage > 5 || perPage < 0 || !perPage)perPage = 5;

    if(page < 0 || !page) page = 1;

    if(!order)order = "asc";

    const take = Number(perPage) || 5;
    const skip = Number(page) || 1;

    const params = {
        take,
        skip: take * (skip - 1),
        order: {},
    };

    if(sort != "id"){
        params.order ={
            [sort]: order,
        };
    }else{
        params.order = {
            id: 'asc',
        }
    };

    const [findMovies, totalMovies] = await movieRepository.findAndCount(params);
    
    const movies = multipleReturnSchemaMovies.parse(findMovies);
    
    const count: number = totalMovies;
    
    const baseUrl: string = `http://localhost:3000/movies`;
    
    let prevPage: string | null = `${baseUrl}?page=${skip - 1}&perPage=${take}`;
    
    if (skip - 1 <= 0) prevPage = null;
    
    let nextPage: string | null = `${baseUrl}?page=${skip + 1}&perPage=${take}`;

    if (movies.length < take) nextPage = null;

    const pagination: iPaginationMovie = {
        prevPage: prevPage,
        nextPage: nextPage,
        count,
        data: movies,
    }

    return pagination;
}

export default readAllMovies;