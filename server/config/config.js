var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');
var port = process.env.PORT || 3000;

module.exports = {
  development: {
    db: 'mongodb://localhost/recipesBook-dev',
    rootPath: rootPath,
    port: port
  },
  test: {
    db: 'mongodb://localhost/recipesBook-test',
    rootPath: rootPath,
    port: port
  },
  production: {
    db: 'mongodb://licavalc:<dbpassword>@ds027751.mongolab.com:27751/recipesbook',
    rootPath: rootPath,
    port: port
  }
};
