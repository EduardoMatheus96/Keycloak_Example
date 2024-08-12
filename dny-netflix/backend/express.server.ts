import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { moviesData } from "./database/movies";
import { keycloak } from "./middleware";

const app = express();
const port = 9090;
const protectedRoutes = keycloak.protect();
interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  genre: string[];
  imageUrl: string;
}
const movies: Movie[] = moviesData;

app.use(
  cors({
    origin: true,
  }),
  bodyParser.json(),
  keycloak.middleware(),
  protectedRoutes
);

app.get("/getAllMovies", (req: Request, res: Response) => {
  res.json(movies);
});

app.get("/getMovieByID/:id", (req: Request, res: Response) => {
  const movieId = parseInt(req.params.id, 10);
  const movie = movies.find((m) => m.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Novo endpoint para criar um filme
app.post("/createMovie", (req: Request, res: Response) => {
  const newMovie: Movie = req.body;

  if (!newMovie.title || !newMovie.genre || !newMovie.releaseYear || !newMovie.imageUrl) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Adiciona um ID único ao novo filme
  newMovie.id = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 