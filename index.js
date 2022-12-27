const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(express.urlencoded());

app.use(cookieParser());

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');    

app.use(express.static('assets'));

//extract styles and scripts from sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes/index'));


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){    
        console.log(`Error ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});