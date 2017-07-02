// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var corser      = require('corser');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config.js'); // get our config file
var IndexCtrl = require('./controllers/indexCtrl'); // get the controller
var EmailCtrl = require('./controllers/emailCtrl'); // get the controller

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// middlewares ===========
// =======================
app.use(corser.create());


// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api/v1/login');
});
// app.post('/api/v1/login', function(req,res){console.log("ok");});
// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

//Initialize controllers
const indexCtrl = new IndexCtrl(app);
const emailCtrl = new EmailCtrl(app);
// PUT METHODS
app.post('/api/v1/register', indexCtrl.registerUser.bind(indexCtrl));

// POST METHODS

//route to get emails informations (GET http://localhost:8080/api/v1/display)
app.get('/api/v1/display', emailCtrl.getEmailList.bind(indexCtrl));

//route to post email informations (POST http://localhost:8080/api/v1/display)
app.post('/api/v1/display', emailCtrl.checkIfEmailExists.bind(indexCtrl));

// route to authenticate a user (POST http://localhost:8080/api/v1/login)
app.post('/api/v1/login', indexCtrl.checkIfUserExists.bind(indexCtrl));

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    console.log(req.query.url);

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
  
});


// apply the routes to our application with the prefix /api
app.use('/api/v1', apiRoutes);




// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
