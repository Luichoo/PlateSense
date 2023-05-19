const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/user.controller');


router.post('/create', usersController.postUser);
router.post('/login', usersController.postUserLogin);
router.get('/access', usersController.validateJwt ,usersController.getUserAccess);
router.get('/', (req, res, next) => {
    res.send('Hello World!');
}
);

module.exports = router;