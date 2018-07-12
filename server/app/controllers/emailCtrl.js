var Email    = require('./../models/email.js'); // get our email mongoose model

class EmailCtrl {

    constructor(app){
        this.app = app;
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

module.exports = EmailCtrl;
