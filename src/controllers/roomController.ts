import { Request, Response } from 'express';

export const registerRoom  = (req: Request, res: Response) => {
    var isName = false;
    var isCapacity = false;
    const movieParameters = req.body;
    if (movieParameters.name) {
        isName = true;
    }
    if (movieParameters.capacity) {
        isCapacity = true;
    }
    if (isName && isCapacity) {
        res.status(201).json({ response: 'Se obtuvieron todos los datos', data: req.body });
    } else {
        res.status(400).json({ response: 'No se obtuvieron todos los datos'});
    }
};