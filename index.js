const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(express.urlencoded());

app.use(cookieParser());

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');    

//used for session cookie and authentication passport 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { Cookie } = require('express-session');

app.use(express.static('assets'));

//extract styles and scripts from sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//takes the cookie and encrypts it
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    //secret is the key which encrypts
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){    
        console.log(`Error ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});