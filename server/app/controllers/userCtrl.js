let User = require('./../models/user.js');
const db = require('./../config/db').db;
const config = require('./../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class IndexCtrl {

    constructor() {}



    registerUser(req, res) {

        const saltRounds = 10;
        const myPlaintextPassword = 's0///P4$$w0rD';
        const someOtherPlaintextPassword = 'not_bacon';

        User.findOne({
            login: req.body._login
        }, (err, foundUser) => {
            if (foundUser) {
                res.json({success: false, message: 'A user with the same login already exists'});
            } else {
                //let hash = bcrypt.hashSync(req.body._password, 10);
                bcrypt.hash(req.body._password, saltRounds, function(err, hash) {
                    let user = new User({
                        login: req.body._login,
                        password: hash,
                        admin: false
                    });

                    user.save((err) => {
                        if (err)
                            throw err;
                        res.json({success: true, message: 'You are now able to login with your credentials'});
                    })
                });

            }
        });
    }

    checkIfUserExists(req, res) {

        const saltRounds = 10;
        const myPlaintextPassword = 's0///P4$$w0rD';
        const someOtherPlaintextPassword = 'not_bacon';

        User.findOne({
            login: req.body._login
        }, function(err, user) {

            if (err)
                throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {
                /*bcrypt.compare(someOtherPlaintextPassword, req.body._password, function(err, rps) {
                    // rps == false
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                });*/

                bcrypt.compare(user.password, req.body._password, function(err, rps){
                    // rps == true
                    // if user is found and password is right
                    // create a token
                    if (err) {
                        res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    }

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: jwt.sign(user.toJSON(), config.secret)
                    });


                });

                // check if password matches
                /*old version -> if (user.password != req.body._password)
                if (!bcrypt.compareSync(user.password, hash)) {

                } else {

                    // if user is found and password is right
                    // create a token

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: jwt.sign(user, config.secret)
                    });
                }*/
            }
        });
    }
}

module.exports = IndexCtrl;
