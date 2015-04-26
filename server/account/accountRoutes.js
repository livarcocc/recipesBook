'use strict';

var passport = require('passport');

var accountController = require('./accountController.js')(passport);

module.exports = function(app, controller) {

  if(controller === undefined)
  {
    controller = accountController;
  }

  app.route('/auth/signin').post(controller.signin);

  app.route('/auth/signout').post(controller.signout);
};

