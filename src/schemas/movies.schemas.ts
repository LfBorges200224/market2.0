import { z } from "zod";

const createSchemaMovie = z.object({
    name: z.string().max(50),
    description:z.string().nullable().optional(),
    duration: z.number().positive(),
    price: z.number().positive().int()
});

const returnCreateSchemaMovie = createSchemaMovie.extend({
    id: z.number(),
});

const multipleReturnSchemaMovies = returnCreateSchemaMovie.array(); 

const updateMovieSchema = returnCreateSchemaMovie.partial();

const schemaSort = z.enum(["id","duration","price"]).default("id");

const paginationSchemaMovie = z.object({
    prevPage:z.string().nullable(),
    nextPage:z.string().nullable(),
    count: z.number().min(0),
    data: multipleReturnSchemaMovies,
})

export {createSchemaMovie, returnCreateSchemaMovie, multipleReturnSchemaMovies, updateMovieSchema, schemaSort, paginationSchemaMovie}