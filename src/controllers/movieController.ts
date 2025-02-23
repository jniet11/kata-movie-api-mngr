import { Request, Response } from "express";
import { executeQuery } from "../config/db.js";

export const registerMovie = async (req: Request, res: Response) => {
  var isTitle = false;
  var isGender = false;
  var isDuration = false;
  var isClassification = false;
  const movieParameters = req.body;
  if (movieParameters.title) {
    isTitle = true;
  }
  if (movieParameters.gender) {
    isGender = true;
  }
  if (movieParameters.duration) {
    isDuration = true;
  }
  if (movieParameters.classification) {
    isClassification = true;
  }
  if (isTitle && isGender && isDuration && isClassification) {
    console.log("La data que llega es: ", {
      title: movieParameters.title,
      gender: movieParameters.gender,
      duration: movieParameters.duration,
      classification: movieParameters.classification,
    });
    await executeQuery(
      `INSERT INTO \`database-kata\`.movies
            (title, gender, duration, classification)
            VALUES (?, ?, ?, ?)`,
      [
        movieParameters.title,
        movieParameters.gender,
        movieParameters.duration,
        movieParameters.classification,
      ]
    );
    res
      .status(201)
      .json({ response: "Película registrada exitosamente", data: req.body });
  } else {
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

export const updateMovie = async (req: Request, res: Response ) => {
  const { title, gender, duration, classification, id } = req.body;

  try {
    // Actualizar
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

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    // Eliminar
    const deleteResponse = await executeQuery("DELETE FROM `database-kata`.movies WHERE id = ?", [id]);
    console.log('La respuesta el aliminar la pelicual es: ', deleteResponse);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar película" });
  }
};
