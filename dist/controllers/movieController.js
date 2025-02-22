import { executeQuery } from '../config/db.js';
export const registerMovie = async (req, res) => {
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
        const result = await executeQuery("SELECT 1 AS result");
        console.log(result);
        res.status(201).json({ response: 'Se obtuvieron todos los datos', data: req.body });
    }
    else {
        res.status(400).json({ response: 'No se obtuvieron todos los datos' });
    }
};
