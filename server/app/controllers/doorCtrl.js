const five = require("johnny-five");
const Door = require('./../models/door.js');
const sleep = require('sleep');
class DoorCtrl {

  constructor(app){
    this.app = app;
  }

  openDoor(req, res) {
    Door.find({
      "_id": req.params.id
    }, function (err, door) {
      if (err) throw err;

      const board = new five.Board();
      board.on("ready", function() {
        // Create an Led on pin 13
        const led = new five.Led(13);

        // Strobe the pin on/off, defaults to 100ms phases
        led.strobe(100);
        function stop() {
          led.stop().off();
        }
        global.setTimeout(stop, 5000);
        // global.clearTimeout(timer);
        // led.stop().off();
        res.send('Door opened');
      });
    });
  }

  findDoorsById(req, res) {
    Door.find({
      username: req.params.username
    },
    function (err, doors) {
      if (err) throw err;

      if (!doors) {
          res.json({success: false, message: 'No door found.'});
      } else if (doors) {
        // return the information as JSON
        res.json({
            success: true,
            message: 'Doors found !',
            doors: doors
        });
      }
    });
  }

  checkIfDoorExists(req, res) {
    Door.find({
      username: req.params.username,
      name: req.body._name,
      description: req.body._description
    }, function (err, doors) {
        if (err) {
        return console.log("error: " + err);
      }
      if (doors.length === 0) {
          res.json({success: true, message: 'Door does not exists'});
          var newDoor = new Door({
            name: req.body._name,
            description: req.body._description,
            address: req.body._address,
            startDate: req.body._startDate,
            endDate: req.body._endDate,
            username: req.params.username
          });
          newDoor.save(function(err) {
            if (err) throw err;
            console.log('Door saved successfully');
        });
      } else if (doors.length > 0) {
        res.json({success: false, message: 'Door already exists...'});
      }
    });
  }

  delete(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    const id = req.params.id;
    const details = { '_id': id };
    Door.remove(details, (err, item) => {
        if (err) {
          res.json({
            success: false,
            error: 'An error has occurred'
          });
        } else {
          res.json({
            success: true,
            message: 'door ' + id + ' deleted!'
          });
        }
    });
  }
}

module.exports = DoorCtrl;
