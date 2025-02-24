import { Request, Response } from "express";
import { executeQuery } from "../config/db.js";
import { CreateMovieRequest, UpdateMovieRequest, DeleteMovieRequest } from "../models/movie.js";

export const registerMovie = async (
  req: Request<{}, {}, CreateMovieRequest>,
  res: Response
) => {
  const { title, gender, duration, classification } = req.body;
  try {
    await executeQuery(
      `INSERT INTO \`database-kata\`.movies
              (title, gender, duration, classification)
              VALUES (?, ?, ?, ?)`,
      [title, gender, duration, classification]
    );
    res
      .status(201)
      .json({ response: "Película registrada exitosamente", data: req.body });
  } catch (error) {
    res.status(400).json({ response: "No se obtuvieron todos los datos" });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const result = await executeQuery(
      "SELECT id, title, gender, duration, classification FROM `database-kata`.movies"
    );
    res.status(200).json(result.results);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
};

export const updateMovie = async (
  req: Request<{}, {}, UpdateMovieRequest>,
  res: Response
) => {
  const { title, gender, duration, classification, id } = req.body;

  try {
    await executeQuery(
      `UPDATE \`database-kata\`.movies
        SET title = ?, gender = ?, duration = ?, classification = ?
        WHERE id = ?`,
      [title, gender, duration, classification, id]
    );
    res.status(200).json({ message: "Película actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar película" });
  }
};

export const deleteMovie = async (
  req: Request<{}, {}, DeleteMovieRequest>,
  res: Response
) => {
  const { id } = req.body;

  try {
    const deleteResponse = await executeQuery(
      "DELETE FROM `database-kata`.movies WHERE id = ?",
      [id]
    );
    console.log("La respuesta al eliminar la película es: ", deleteResponse);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar película" });
  }
};
