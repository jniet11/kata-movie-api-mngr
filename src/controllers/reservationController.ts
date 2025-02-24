import { Request, Response } from "express";
import { executeQuery } from "../config/db.js";
import { sendEmail } from "../services/emailService.js";
import { CreateReservationRequest, UpdateReservationRequest, DeleteReservationRequest } from "../models/reservation.js";

export const createReservation = async (
  req: Request<{}, {}, CreateReservationRequest>,
  res: Response
) => {
  const {
    movie_id,
    room_id,
    show_time,
    seats,
    email,
    customer_name,
    doc_number,
  } = req.body;
  try {
    const result = await executeQuery(
      `INSERT INTO \`database-kata\`.reservations
      (movie_id, room_id, show_time, seats, email, customer_name, doc_number)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        movie_id,
        room_id,
        new Date(show_time),
        JSON.stringify(seats),
        email,
        customer_name,
        doc_number,
      ]
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
    sendEmail(
      customer_name,
      email,
      movieTitle,
      roomName,
      show_time,
      JSON.stringify(seats)
    );
    const viewReserve = await executeQuery(
      "SELECT movie_id, room_id, show_time, seats FROM `database-kata`.reservations"
    );
    res.status(201).json({
      success: true,
      reservationId: (result.results as any).insertId,
    });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ success: false, error: "Error al crear reserva" });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const result = await executeQuery(
      `SELECT r.*, m.title AS movie_title, rm.name AS room_name
       FROM \`database-kata\`.reservations r
       JOIN \`database-kata\`.movies m ON r.movie_id = m.id
       JOIN \`database-kata\`.rooms rm ON r.room_id = rm.id`
    );
    res.status(200).json(result.results);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

export const updateReservation = async (
  req: Request<{}, {}, UpdateReservationRequest>,
  res: Response
) => {
  const {
    movie_id,
    room_id,
    show_time,
    seats,
    id,
    email,
    customer_name,
    doc_number,
  } = req.body;
  try {
    await executeQuery(
      `UPDATE \`database-kata\`.reservations
        SET movie_id = ?, room_id = ?, show_time = ?, seats = ?, email = ?, customer_name = ?, doc_number = ?
        WHERE id = ?`,
      [
        movie_id,
        room_id,
        show_time,
        JSON.stringify(seats),
        email,
        customer_name,
        doc_number,
        id,
      ]
    );
    res.status(200).json({ message: "Reserva actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    res.status(500).json({ error: "Error al actualizar reserva" });
  }
};

export const deleteReservation = async (
  req: Request<{}, {}, DeleteReservationRequest>,
  res: Response
) => {
  const { id } = req.body;
  try {
    await executeQuery(
      "DELETE FROM `database-kata`.reservations WHERE id = ?",
      [id]
    );
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    res.status(500).json({ error: "Error al eliminar reserva" });
  }
};
