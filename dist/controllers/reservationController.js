export const reserveChair = (req, res) => {
    var isMovie = false;
    var isRoom = false;
    var isTime = false;
    var isChair = false;
    const movieParameters = req.body;
    if (movieParameters.movie) {
        isMovie = true;
    }
    if (movieParameters.room) {
        isRoom = true;
    }
    if (movieParameters.time) {
        isTime = true;
    }
    if (movieParameters.chair) {
        isChair = true;
    }
    if (isMovie && isRoom && isTime && isChair) {
        res.status(201).json({ response: 'Se obtuvieron todos los datos', data: req.body });
    }
    else {
        res.status(400).json({ response: 'No se obtuvieron todos los datos' });
    }
};
