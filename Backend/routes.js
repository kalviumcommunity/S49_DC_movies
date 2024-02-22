const express = require('express');
const router = express.Router();

let dcMovies = [
    { id: 1, name: 'Aquaman', boxOfficeEarnings: '$1.148 billion' },
    { id: 2, name: 'Wonder Woman', boxOfficeEarnings: '$821.8 million' }
];

router.get('/dc-movies', (req, res) => {
    res.json(dcMovies);
});

router.get('/dc-movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = dcMovies.find(movie => movie.id === movieId);
    if (!movie) {
        return res.status(404).json({ message: 'DC movie not found' });
    }
    res.json(movie);
});

router.post('/dc-movies', (req, res) => {
    const { name, boxOfficeEarnings } = req.body;
    const newMovie = {
        id: dcMovies.length + 1,
        name: 'New DC Movie',
        boxOfficeEarnings: '$NewEarnings'
    };
    dcMovies.push(newMovie);
    res.status(201).json(newMovie);
});

router.put('/dc-movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movieIndex = dcMovies.findIndex(movie => movie.id === movieId);
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'DC movie not found' });
    }
    const { name, boxOfficeEarnings } = req.body;
    dcMovies[movieIndex].name = name;
    dcMovies[movieIndex].boxOfficeEarnings = boxOfficeEarnings;
    res.json(dcMovies[movieIndex]);
});

router.delete('/dc-movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    dcMovies = dcMovies.filter(movie => movie.id !== movieId);
    res.json({ message: 'DC movie deleted successfully' });
});

module.exports = router;
