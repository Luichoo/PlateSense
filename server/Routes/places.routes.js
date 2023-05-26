const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/user.controller');


router.post('/register', usersController.postUser);
router.post('/login', usersController.postUserLogin);
router.get('/access', usersController.validateJwt ,usersController.getUserAccess);


module.exports = router;