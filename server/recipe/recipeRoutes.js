'use strict';

var Recipe = require('mongoose').model('Recipe');
var recipeController = require('./recipeController.js')(Recipe);
var authModule = require('../config/auth.js');

module.exports = function(app, router, auth, controller) {
  var recipeRoute = '/api/users/:user/recipesBooks/:recipesBook/recipes';
  var specificRecipeRoute = recipeRoute + '/:recipe';

  if(controller === undefined) {
    controller = recipeController;
  }

  if(auth === undefined) {
    auth = authModule;
  }

  var recipeRouter = app.route(recipeRoute);
  recipeRouter.post(auth.requiresApiLogin, controller.createRecipe);

  var specificRecipeRouter = app.route(specificRecipeRoute);
  specificRecipeRouter.get(auth.requiresApiLogin, controller.recipeForUser);

  router.param('recipe', controller.preLoadRecipe);
};