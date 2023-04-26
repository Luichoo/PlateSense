require('dotenv').config({path: `${__dirname}/.env`});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

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