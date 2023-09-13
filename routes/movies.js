const express = require('express')
const Movie = require("../schemas/movie")

const router = express.Router()

router.get('/', async (req, res) => {
    const movies =await Movie.find({})
    res.send(movies);
});

router.post('/', (req, res) => {
    const body = req.body
    const newMovie = new Movie({
        name: body.name,
        rating: body.rating,
        genre: body.genre
    })
    newMovie.save()
    res.send(newMovie)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    const movie =await Movie.findById({_id: id})
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    await Movie.findByIdAndDelete(id)
    res.send("Deleted")
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    const body = req.body
    const movie = await Movie.findOneAndUpdate({_id: id}, {...body}, {new: true})
    res.send(movie)

})

module.exports = router;
