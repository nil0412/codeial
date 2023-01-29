const express = require('express');
const env = require('./config/enviroment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie and authentication passport 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware')
// importing flash --> used for flash messages
const flash = require('connect-flash');
// using middleware for flash messages
const customMware = require('./config/middleware');

//setting chat server --> setting socket.io

const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port 5000");

const path = require('path');

//saas middleware should run in development enviroment only, not in production enviroment

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),  
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());

// app.use(express.static('assets'));
app.use(express.static(env.asset_path));

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
    secret: env.session_cookie_key,
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

app.use(logger(env.morgan.mode, env.morgan.options));
app.listen(port, function(err){
    if(err){    
        console.log(`Error ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});


console.log("*********In the ", env.name ," Enviroment****************");