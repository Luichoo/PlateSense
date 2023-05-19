require('dotenv').config({path: `${__dirname}/.env`});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const placesRoutes = require('./Routes/places.routes');
const cors = require('cors');




const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // * = any domain
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // * = any headers
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // * = any methods
// })
app.use(express.json());
app.use('/api/auth',placesRoutes);

// const mongostring = process.env.MONGOurl;
// if (mongoose.connect(mongostring)) {
//     console.log('Connected to MongoDB');
// } else {
//     console.log('Error connecting to MongoDB');
// }

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