import { Router } from 'express';
import { registerMovie } from '../controllers/movieController.js';
import { registerRoom } from '../controllers/roomController.js';
import { reserveChair } from '../controllers/reservationController.js';

const router = Router();

router.post('/register-movie', registerMovie);
router.post('/register-room', registerRoom);
router.post('/reservation', reserveChair);
router.post('/view-cinema')

export default router;