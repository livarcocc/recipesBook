var setupMongo = function () {
  var mongoose = require('mongoose')

  var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  var config = require('./config')[env];

  mongoose.connect(config.db);
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'mongo connection error.'));

  db.once('open', function callback() {
    console.log('mongo db connection open');
  });
};

module.exports = setupMongo;