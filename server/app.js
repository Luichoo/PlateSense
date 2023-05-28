require("dotenv").config({ path: `${__dirname}/.env` });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const placesRoutes = require("./Routes/places.routes");
const platesRoutes = require("./Routes/plates.routes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [
    process.env.REACT_APP_API_URL,
    'http://localhost:3000',
    // Agrega más dominios permitidos aquí
  ];
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use("/api/auth", placesRoutes);
app.use("/api/plates", platesRoutes);

const mongostring = process.env.MONGOurl;
mongoose.set('strictQuery', true);
mongoose
	.connect(mongostring)
	.then(() => {
		console.log("Connected to mongoDB!");
		app.listen(port, () => {
			console.log("Server is up and running on http://localhost:" + port);
		});
	})
	.catch((err) => {
		console.log(err);
	});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occurred!" });
});

module.exports = app;
