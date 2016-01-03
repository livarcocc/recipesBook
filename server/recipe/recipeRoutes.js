'use strict';

var Recipe = require('mongoose').model('Recipe');
var recipeController = require('./recipeController.js')(Recipe);
var authModule = require('../config/auth.js');

module.exports = function(app, auth, controller) {
  var recipeRoute = '/api/users/:user/recipesBooks/:recipesBook/recipes';
  var specificRecipeRoute = recipeRoute + '/:recipe';

  if(controller === undefined) {
    controller = recipeController;
  }

  if(auth === undefined) {
    auth = authModule;
  }

  app.param('recipe', controller.preLoadRecipe);

  var recipeRouter = app.route(recipeRoute);
  recipeRouter.post(auth.requiresApiLogin, controller.createRecipe);

  var specificRecipeRouter = app.route(specificRecipeRoute);
  specificRecipeRouter.get(auth.requiresApiLogin, controller.recipeForUser);
};