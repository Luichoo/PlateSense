require('dotenv').config({path: `${__dirname}/.env`});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());


const mongostring = process.env.MONGOurl;
if (mongoose.connect(mongostring)) {
    console.log('Connected to MongoDB');
} else {
    console.log('Error connecting to MongoDB');
}

app.listen(port, () => {
    console.log('Server is up and running on http://localhost:' + port);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
})

module.exports = app;