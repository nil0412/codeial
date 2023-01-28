const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: "846020711379-ud1gq7l2aeuqpe8u0sjr3pglksk5cnbo.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        //find the user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in google-strategy-passport: ", err);
                return;
            }

            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user){
                //if found, set this as req.user
                return done(null, user);
            }else{
                //if user not found, creat the user and set is as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0],
                    password: crypto.randomBytes(20).toJSON('hex')
                }, function(err, user){
                    if(err){
                        console.log("Error in creating user google-strategy-passport: ", err);
                        return;
                    }

                    return done(null, user);
                })
            }
        })
    }
));

module.exports = passport;