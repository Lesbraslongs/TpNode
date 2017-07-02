var User     = require('./../models/user.js'); // get our user mongoose model
var Email    = require('./../models/email.js'); // get our email mongoose model
const db     = require('./../config/db').db;
const config = require('./../config/config');
const jwt    = require('jsonwebtoken');

class IndexCtrl {

    constructor(app){
        this.app = app;
    }

    registerUser(req, res) {

        User.findOne({
            login: req.body._login
        }, (err,foundUser) => {
            if(foundUser){
                res.json({success: false, message: 'A user with the same login already exists'});
            }else{

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
        });
    }

    checkIfUserExists(req, res) {

        User.findOne({
            login: req.body._login
        }, function (err, user) {

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
    
    checkIfEmailExists(req, res) {
        Email.find({
            firstname: req.body._firstname,
            name: req.body._name,
            domain: req.body._domain,
        }, function (err, emails) {
        	console.log(emails);
            if (err) {
        	  return console.log("error: " + err);
        	}

            if (emails.length === 0) {
                res.json({success: true, message: 'Ce mail n\'éxiste pas.'});
                var newEmail = new Email({
                    firstname: req.body._firstname,
                    name: req.body._name,
                    domain: req.body._domain
                });
                newEmail.save(function(err) {
                  if (err) throw err;
                	
    	            console.log('Email saved successfully');
    	        });
            } else if (emails.length > 0) {

            	res.json({success: false, message: 'Ce mail éxiste déjà !'});
            }
        });
    }
    
    getEmailList(req, res) {
//        var emailTest = new Email({
//            firstname: 'arnaud',
//            name: 'lavallee',
//            domain: 'gmail.com'
//        });
//        
//        // save the sample email
//        emailTest.save(function(err) {
//            if (err) throw err;
//
//            console.log('Email saved successfully');
//            res.json({ success: true });
//        });

	    Email.find(null, function (err, emails) {
	        if (err) throw err;
	
	        if (!emails) {
	            res.json({success: false, message: 'Emails not found.'});
	        } else if (emails) {
	
	            // return the information as JSON
	            res.json({
	                success: true,
	                message: 'Emails found !',
	                emails: emails
	            });
	        }
	    });
    }
}

module.exports = IndexCtrl;
