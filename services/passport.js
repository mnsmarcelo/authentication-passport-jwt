const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Local
const localOption = {usernameField: 'email' };
const localLogin = new LocalStrategy(localOption, function(emal, password, done){
    User.findOne({ email: emal }, function(err, user){
        if(err) { return done(err); }
        if(!user) { return done(null, false); }

        user.comparePassword(password, function(err, isMatch){
            if(err){ return done(null, false); }
            if(!isFinite) { return done(null, false); } 

            return done(null, user);
        });
    });
});


//JWT
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

    User.findById(payload.sub, function(err, user){
        if(err){ return done(err, false); }

        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });

});

passport.use(jwtLogin);
passport.use(localLogin);
