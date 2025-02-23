import { Router } from 'express';
import { registerMovie, getMovies, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { registerRoom, getRooms, updateRoom, deleteRoom} from '../controllers/roomController.js';
import { createReservation } from '../controllers/reservationController.js';

const router = Router();

router.post('/register-movie', registerMovie);
router.post('/get-movies', getMovies);
router.post('/update-movie', updateMovie);
router.post('/delete-movie', deleteMovie);

router.post('/register-room', registerRoom);
router.post('/get-rooms', getRooms);
router.post('/update-room', updateRoom);
router.post('/delete-room', deleteRoom);


router.post('/reservation', createReservation);

router.post('/view-cinema')

export default router;