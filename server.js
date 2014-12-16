var express = require('express'),
  http = require('http'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  less = require('less-middleware'),
  mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config')[env];

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(less(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/partials/:partialPath', function (req, res) {
  res.render(path.join('partials', req.params.partialPath));
});

mongoose.connect(config.db);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo connection error.'));

db.once('open', function callback() {
  console.log('mongo db connection open');
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