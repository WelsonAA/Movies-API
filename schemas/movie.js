const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: false},
    genre: {type: String, required: false}
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie