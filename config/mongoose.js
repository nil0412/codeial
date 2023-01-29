const mongoose = require('mongoose');
const env = require('./enviroment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('erroe', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('Successfully connected to db :: Mongodb');
});

module.exports = db;