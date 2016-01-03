var path = require('path'),
    accountRoutes = require('../account/accountRoutes.js'),
    userRoutes = require('../account/userRoutes.js'),
    measurementRoutes = require('../measurement/measurementRoutes.js'),
    recipesBookRoutes = require('../recipesBook/recipesBookRoutes.js'),
    recipeRoutes = require('../recipe/recipeRoutes.js');

module.exports = function(app) {
  accountRoutes(app);
  userRoutes(app);
  measurementRoutes(app);
  recipesBookRoutes(app);
  recipeRoutes(app);

  app.use(router);

  app.get('/partials/*', function (req, res) {
    res.render(path.join('../../public/app/', req.params[0]));
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};