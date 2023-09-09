import "reflect-metadata";
import "express-async-errors";
import express,{Application} from "express";
import { handlerError } from "./erro";
import moviesRouter from "./router/movies.routes";

const app:Application = express();

app.use(express.json());

app.use("/movies", moviesRouter);

app.use(handlerError)

export default app;