'use strict';

var Account = require('mongoose').model('Account');
var userController = require('./userController.js')(Account),
  auth = require('../config/auth');

module.exports = function(app, controller) {

  if(controller === undefined)
  {
    controller = userController;
  }

  app.route('/api/users').get(auth.requiresRole('admin'), controller.users);
};

