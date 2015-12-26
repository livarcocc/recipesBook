'use strict';

var RecipesBooks = require('mongoose').model('RecipesBook');
var recipesBooksController = require('./recipesBookController.js')(RecipesBooks);
var authModule = require('../config/auth.js');

module.exports = function(app, router, controller, auth) {

  if(controller === undefined) {
    controller = recipesBooksController;
  }

  if(auth === undefined) {
    auth = authModule;
  }

  var recipesBooksRouter = app.route('/api/recipesBooks');

  recipesBooksRouter.get(auth.requiresApiLogin, controller.recipesBooksForUser);
  recipesBooksRouter.post(auth.requiresApiLogin, controller.createRecipesBook);

  var specificRecipesBookRoute = '/api/recipesBooks/:recipesBook';
  var specificRecipesBookRouter = app.route(specificRecipesBookRoute);

  specificRecipesBookRouter.put(auth.requiresApiLogin, controller.updateRecipesBook);
  specificRecipesBookRouter.delete(auth.requiresApiLogin, controller.deleteRecipesBook);

  router.param('recipesBook', controller.preLoadRecipesBook);
};

