var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    less = require('less-middleware'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
  app.set('port', config.port);
  app.set('views', path.join(config.rootPath, 'server/views'));
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  //TODO-licavalc: put an actual secret in place
  //TODO-licavalc: replace this session with Mongo-Store
  app.use(session({secret:'Something secrect'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(less(path.join(config.rootPath, 'public')));
  app.use(express.static(path.join(config.rootPath, 'public')));
};