// Mongoose schema and model definitions
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/taskmgmt', function (err) {
 
    if (err) throw err;
  
    console.log('Successfully connected to mongo db');
  
 });

 module.exports = mongoose;

