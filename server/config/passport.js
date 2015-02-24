'use strict';

var passport = require('passport'),
    Account = require('mongoose').model('Account'),
    localStrategySetup = require('./strategies/local.js');

module.exports = function () {
  passport.serializeUser(function (account, done) {
    done(null, account._id);
  });

  passport.deserializeUser(function (id, done) {
    Account.findOne({
      _id: id
    }, '-salt, -password', function(err, user) {
      done(err, user);
    });
  });

  localStrategySetup();
};