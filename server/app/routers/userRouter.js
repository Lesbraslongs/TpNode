let express = require('express');
let router = express.Router();
let UserCtrl = require('./../controllers/userCtrl');


//Initialize controller
const userCtrl = new UserCtrl();

// route to register a user (POST http://localhost:8080/api/v1/register)
router.post('/register', userCtrl.registerUser.bind(userCtrl));

// route to authenticate a user (POST http://localhost:8080/api/v1/login)
router.post('/login', userCtrl.checkIfUserExists.bind(userCtrl));

module.exports = router;