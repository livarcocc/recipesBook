module.exports = {
  development: {
    db: 'mongodb://localhost/recipesBook-dev'
  },
  test: {
    db: 'mongodb://localhost/recipesBook-test'
  },
  production: {
    db: 'mongodb://licavalc:<dbpassword>@ds027751.mongolab.com:27751/recipesbook'
  }
};
