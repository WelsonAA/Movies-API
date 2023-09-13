require("dotenv").config()
const express = require('express');
const mongoose = require("mongoose")
const movieRouter = require("./routes/movies")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT =process.env.PORT || 3001
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Middleware for request logging
app.use(morgan('combined', { stream: fs.createWriteStream('log.txt', { flags: 'a' }) }));
app.use(bodyParser.json());

mongoose.connect(process.env.CONNECTION_STRING, {})
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        console.log("Error connecting to MongoDB", err)
    })
app.use("/movies", movieRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});
