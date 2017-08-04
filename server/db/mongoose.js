var mongoose = require('mongoose');

// Set up mongoose, and connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
