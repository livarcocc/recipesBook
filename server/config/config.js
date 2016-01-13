var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');
var port = process.env.PORT || 3000;

var productionDB = process.env.DB;

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
    db: productionDB,
    rootPath: rootPath,
    port: port
  }
};
