const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/plates.controller');


router.post('/addplate', usersController.addPlate);
router.post('/deletePlate', usersController.deletePlate);
router.post('/getPlates', usersController.getPlates);
module.exports = router;
