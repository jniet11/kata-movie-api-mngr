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
        console.log('La data que llega es: ', {
            title: movieParameters.title,
            gender: movieParameters.gender,
            duration: movieParameters.duration,
            classification: movieParameters.classification
        });
        await executeQuery(`INSERT INTO \`database-kata\`.movies
            (title, gender, duration, classification)
            VALUES (?, ?, ?, ?)`, [
            movieParameters.title,
            movieParameters.gender,
            movieParameters.duration,
            movieParameters.classification
        ]);
        res.status(201).json({ response: 'Película registrada exitosamente', data: req.body });
    }
    else {
        res.status(400).json({ response: 'No se obtuvieron todos los datos' });
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
    }
    catch (error) {
        console.error("Error al obtener películas o salas:", error);
    }
};
getAll();
