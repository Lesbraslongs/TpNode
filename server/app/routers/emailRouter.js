let express = require('express');
let router = express.Router();
let EmailCtrl = require('./../controllers/emailCtrl');


//Initialize controller
const emailCtrl = new EmailCtrl();

//route to get emails informations (GET http://localhost:8080/api/v1/display)
router.get('/display', emailCtrl.getEmailList.bind(emailCtrl));

//route to post email informations (POST http://localhost:8080/api/v1/display)
router.post('/display', emailCtrl.checkIfEmailExists.bind(emailCtrl));

module.exports = router;