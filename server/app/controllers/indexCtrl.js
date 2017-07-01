var User   = require('./../models/user.js'); // get our mongoose model
const db = require('./../config/db').db;
const config = require('./../config/config');
const jwt = require('jsonwebtoken');

class IndexCtrl {

    constructor(app){
        this.app = app;
    }

    registerUser(req, res) {

        let user = new User({
             login: req.body._login,
             password: req.body._password,
             admin: false
         });

        user.save( (err) => {
            if(err) throw err;
            res.json({ success: true , message: 'You are now able to login with your credentials'});
        })
    }

    checkIfUserExists(req, res) {

        User.findOne({
            login: req.body._login
        }, function (err, user) {
            console.log(user);
            console.log(err);

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.password != req.body._password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: jwt.sign(user,config.secret)
                    });
                }
            }
        });
    }
}

module.exports = IndexCtrl;
