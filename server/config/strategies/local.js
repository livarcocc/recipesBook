'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Account = require('mongoose').model('Account');

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function (userName, password, done) {
    Account.findOne({
      userName: userName
    }, function (err, account) {
      if(err) {
        return done(err);
      }

      if(!account) {
        return done(null, false, {
          message: 'Invalid username and password'
        });
      }

      if(!account.authenticate(password))
      {
        return done(null, false, {
          message: 'Invalid username and password'
        });
      }

      return done(null, account);
    });
  }));
};