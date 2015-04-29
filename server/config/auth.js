'use strict';

exports.requiresApiLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  }
  else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    }
    else {
      next();
    }
  };
};