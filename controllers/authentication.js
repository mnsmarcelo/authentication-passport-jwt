const jsw = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getDate();
    return jsw.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, function(err, existingUser){
       if(err) { return next(err); } 

       if(existingUser){
        return res.status(422).send({ error: 'Email in use'});
       }

       const user = new User({
           email: email,
           password: password
       });

       user.save(function(err){
        if(err){ return next(err); } 

        res.json({ token: tokenForUser(user) });
       });

    });
}