const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_db');

const db = mongoose.connection;

db.on('erroe', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('Successfully connected to db :: Mongodb');
});

module.exports = db;