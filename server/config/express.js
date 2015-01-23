var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    less = require('less-middleware'),
    path = require('path');

module.exports = function(app, config) {
  app.set('port', config.port);
  app.set('views', path.join(config.rootPath, 'server/views'));
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(less(path.join(config.rootPath, 'public')));
  app.use(express.static(path.join(config.rootPath, 'public')));
};