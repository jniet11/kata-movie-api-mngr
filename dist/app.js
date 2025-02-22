import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes.js';
import { initDB } from './scripts/initDB.js';
// Crear aplicación Express
const app = express();
initDB();
// Configurar middlewares básicos
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parsea JSON en las solicitudes
// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('API funcionando correctamente 🚀');
});
app.use('/cinema', movieRoutes);
export default app;
