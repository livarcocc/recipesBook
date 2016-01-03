var express = require('express'),
  http = require('http');

var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config.js')[env];

require('./server/config/express.js')(app, config);

require('./server/config/mongo.js')(config);

require('./server/config/passport.js')();

require('./server/config/routes.js')(app);

http.createServer(app).listen(config.port, function(){
  console.log('Express server listening on port ' + config.port);
});

module.exports = {
  app: app
};