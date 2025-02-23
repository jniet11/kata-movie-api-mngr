// controllers/reservationController.ts
import { Request, Response } from "express";
import { executeQuery } from "../config/db.js";
import { sendEmail } from "../services/emailService.js";

// Crear reserva
export const createReservation = async (req: Request, res: Response) => {
  const { email, movie_id, room_id, show_time, seats } = req.body;
  try {
    console.log('El correo ingresado es: ', email);
    const result = await executeQuery(
      `INSERT INTO \`database-kata\`.reservations
      (movie_id, room_id, show_time, seats)
      VALUES (?, ?, ?, ?)`,
      [movie_id, room_id, new Date(show_time), JSON.stringify(seats)]
    );
    const movieResult = await executeQuery(
      "SELECT title FROM `database-kata`.movies WHERE id = ?",
      [movie_id]
    );
    const roomResult = await executeQuery(
      "SELECT name FROM `database-kata`.rooms WHERE id = ?",
      [room_id]
    );
    const movieTitle = (movieResult.results as any)[0]?.title || "Sin título";
    const roomName = (roomResult.results as any)[0]?.name || "Sin nombre";
    sendEmail(email, movieTitle, roomName, show_time, JSON.stringify(seats));
    const viewReserve = await executeQuery(
      "SELECT movie_id, room_id, show_time, seats FROM `database-kata`.reservations"
    );
    console.log('Los datos de la reserva son los siguentes: ', viewReserve.results);
    res.status(201).json({
      success: true,
      reservationId: (result.results as any).insertId,
    });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ success: false, error: "Error al crear reserva" });
  }
};
