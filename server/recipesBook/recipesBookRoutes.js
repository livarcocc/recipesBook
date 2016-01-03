'use strict';

var RecipesBooks = require('mongoose').model('RecipesBook');
var recipesBooksController = require('./recipesBookController.js')(RecipesBooks);
var authModule = require('../config/auth.js');

module.exports = function(app, controller, auth) {
  var recipesBooksRoute = '/api/users/:user/recipesBooks';
  var specificRecipesBookRoute = recipesBooksRoute + '/:recipesBook';

  if(controller === undefined) {
    controller = recipesBooksController;
  }

  if(auth === undefined) {
    auth = authModule;
  }

  app.param('recipesBook', controller.preLoadRecipesBook);

  var recipesBooksRouter = app.route(recipesBooksRoute);

  recipesBooksRouter.get(auth.requiresApiLogin, controller.recipesBooksForUser);
  recipesBooksRouter.post(auth.requiresApiLogin, controller.createRecipesBook);

  var specificRecipesBookRouter = app.route(specificRecipesBookRoute);

  specificRecipesBookRouter.put(auth.requiresApiLogin, controller.updateRecipesBook);
  specificRecipesBookRouter.delete(auth.requiresApiLogin, controller.deleteRecipesBook);
};

