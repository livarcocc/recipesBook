var express = require('express'),
  http = require('http'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  less = require('less-middleware'),
  setupMongo = require('./server/mongo.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(process.env.PWD, 'server/views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(less(path.join(process.env.PWD, 'public')));
app.use(express.static(path.join(process.env.PWD, 'public')));

setupMongo();

app.get('/partials/:partialPath', function (req, res) {
  res.render(path.join('partials', req.params.partialPath));
});

app.get('*', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = {
  app: app
};