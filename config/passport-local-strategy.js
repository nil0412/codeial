const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },  
    function(email, password, done){
        //find the user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding error --> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username / password --> Passport');
                return done(null, false);  //done takes 2 args : err and (if authentication is succcess or not: "false" if not found and "user" if found)
            }

            return done(null, user);
        });
    }
));


//serializing the user decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//deserializing the cuser from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding error --> Passport');
            return done(err);
        }

        return done(null, user);
    })
});


//check if user if authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next;
    }

    //if  user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user; 
    }
    next();
}


module.exports = passport;