var User   = require('./../models/user.js'); // get our mongoose model
const db = require('./../config/db').db;

class IndexCtrl {

    registerUser(req, res) {

    }

    checkIfUserExists(req, res) {

        var nick = new User({
            login: 'adminAAB',
            password: 'adminAAAB',
            admin: true
        });

        // save the sample user
        nick.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });

        User.findOne(null,function (err,res) {
            console.log(err);
                console.log(res);
        });
     }
}

module.exports = IndexCtrl;
