import { Router } from "express";
import {
  registerMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import {
  registerRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";

const router = Router();

router.post("/register-movie", registerMovie);
router.post("/get-movies", getMovies);
router.post("/update-movie", updateMovie);
router.post("/delete-movie", deleteMovie);

router.post("/register-room", registerRoom);
router.post("/get-rooms", getRooms);
router.post("/update-room", updateRoom);
router.post("/delete-room", deleteRoom);

router.post("/reservation", createReservation);
router.post("/get-reservations", getReservations);
router.post("/update-reservation", updateReservation);
router.post("/delete-reservation", deleteReservation);

export default router;
