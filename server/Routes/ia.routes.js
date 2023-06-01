const express = require('express');
const router = express.Router();
const iaController = require('../Controllers/ia.controller');

router.post('/upload', iaController.uploadImage);

module.exports = router;