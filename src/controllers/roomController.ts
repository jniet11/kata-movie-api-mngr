import { Request, Response } from 'express';
import { executeQuery } from '../config/db.js';

export const registerRoom  = async (req: Request, res: Response) => {
    var isName = false;
    var isCapacity = false;
    const roomParameters = req.body;
    if (roomParameters.name) {
        isName = true;
    }
    if (roomParameters.capacity) {
        isCapacity = true;
    }
    if (isName && isCapacity) {
        await executeQuery(
            `INSERT INTO \`database-kata\`.rooms
            (name, capacity)
            VALUES (?, ?)`,
            [
                roomParameters.name,
                roomParameters.capacity
            ]
        );
        res.status(201).json({ response: 'Se obtuvieron todos los datos', data: req.body });
    } else {
        res.status(400).json({ response: 'No se obtuvieron todos los datos'});
    }
};

export const getAll = async () => {
    try {
        const resultMovies = await executeQuery(`
            SELECT * FROM \`database-kata\`.movies
        `);
        const resultRooms = await executeQuery(`
            SELECT * FROM \`database-kata\`.rooms
        `);
        console.log("Películas registradas:", resultMovies.results);
        console.log("Salas registradas:", resultRooms.results);
    } catch (error) {
        console.error("Error al obtener películas o salas:", error);
    }
};

getAll();