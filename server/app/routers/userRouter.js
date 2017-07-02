let express = require('express');
let router = express.Router();
let corser      = require('corser');
let UserCtrl = require('./../controllers/userCtrl');

router.use(corser.create());

//Initialize controller
const userCtrl = new UserCtrl();

// route to register a user (POST http://localhost:8080/api/v1/register)
router.post('/api/v1/register', userCtrl.registerUser.bind(userCtrl));

// route to authenticate a user (POST http://localhost:8080/api/v1/login)
router.post('/api/v1/login', userCtrl.checkIfUserExists.bind(userCtrl));

module.exports = router;