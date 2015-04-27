var path = require('path'),
    accountRoutes = require('../account/accountRoutes.js');

module.exports = function(app) {
  accountRoutes(app);

  app.get('/partials/*', function (req, res) {
    res.render(path.join('../../public/app/', req.params[0]));
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};