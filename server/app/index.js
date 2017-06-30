var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('localhost/nodeapp', ['user']);
var bodyParser = require("body-parser");
app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index.html');
// });

/* GET All login */
router.get('/api/v1/login', function(req, res, next) {
    db.user.find(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            console.log(user);
            console.log(req.body);
        }
    });
});

//CHECK login/pwd
app.post('/api/v1/login',function(req,res){
  var login=req.body.login;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  if (user.login == login && user.password == password) {
    router.get('/display', function(req,res) {

    });
  }else {
    router.get('/api/v1/login', function(req, res) {
    var string = encodeURIComponent('something that would break');
    res.redirect('/api/v1/login');
    });
  }
  console.log(req.body);
  res.end("yes");
});

/* POST/SAVE a Login */
router.put('/login', function(req, res, next) {
    var user = req.body;
    if (!user.text || !(user.isCompleted + '')) {
        res.status(400);
        res.json({"error": "Invalid Data"});
    } else {
        db.user.save(user, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});


module.exports = router;
