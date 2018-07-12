let express = require('express');
let router = express.Router();
let DoorCtrl = require('./../controllers/doorCtrl');


//Initialize controller
const doorCtrl = new DoorCtrl();

// (GET http://localhost:8080/api/v1/doors)
router.get('/:id/open', doorCtrl.openDoor.bind(doorCtrl));
router.get('/:username/', doorCtrl.findDoorsById.bind(doorCtrl));

// (POST http://localhost:8080/api/v1/doors)
router.post('/:username', doorCtrl.checkIfDoorExists.bind(doorCtrl));

// (DELETE http://localhost:8080/api/v1/doors)
router.delete('/:id', doorCtrl.delete.bind(doorCtrl));
module.exports = router;