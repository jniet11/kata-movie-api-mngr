import { Request, Response } from "express";
import { executeQuery } from "../config/db.js";
import { CreateRoomRequest, UpdateRoomRequest, DeleteRoomRequest } from "../models/room.js";

export const registerRoom = async (
  req: Request<{}, {}, CreateRoomRequest>,
  res: Response
) => {
  const { name, capacity } = req.body;
  try {
    await executeQuery(
      `INSERT INTO \`database-kata\`.rooms
              (name, capacity)
              VALUES (?, ?)`,
      [name, capacity]
    );
    res
      .status(201)
      .json({ response: "Se obtuvieron todos los datos", data: req.body });
  } catch (error) {
    res.status(400).json({ response: "No se obtuvieron todos los datos" });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const result = await executeQuery(
      "SELECT id, name, capacity FROM `database-kata`.rooms"
    );
    res.status(200).json(result.results);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener salas" });
  }
};

export const updateRoom = async (
  req: Request<{}, {}, UpdateRoomRequest>,
  res: Response
) => {
  const { name, capacity, id } = req.body;

  try {
    await executeQuery(
      `UPDATE \`database-kata\`.rooms
          SET name = ?, capacity = ?
          WHERE id = ?`,
      [name, capacity, id]
    );
    res.status(200).json({ message: "Sala actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar sala" });
  }
};

export const deleteRoom = async (
  req: Request<{}, {}, DeleteRoomRequest>,
  res: Response
) => {
  const { id } = req.body;
  try {
    const deleteResponse = await executeQuery(
      "DELETE FROM `database-kata`.rooms WHERE id = ?",
      [id]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar sala" });
  }
};
