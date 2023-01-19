const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie and authentication passport 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware')
// importing flash --> used for flash messages
const flash = require('connect-flash');
// using middleware for flash messages
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('assets'));

app.use(expressLayouts);

//extract styles and scripts from sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
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
    },
    //setting mongo store
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/cosial_db',
        autoRemove: 'disabled'
      },
        function(err){
            console.log(err || 'connect mongoDB setup ok');
        }  
    )  
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// using flash --> used for flash messages
app.use(flash());
// using middleware for flash messages
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes/index'));

//make the uploads path available to the browser 
app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(port, function(err){
    if(err){    
        console.log(`Error ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});