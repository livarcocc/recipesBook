var path = require('path');

module.exports = function(app) {
  app.get('/partials/*', function (req, res) {
    res.render(path.join('../../public/app/', req.params[0]));
  });

  app.get('*', function(req, res) {
    res.render('index');
  });
};