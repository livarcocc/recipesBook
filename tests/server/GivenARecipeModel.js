'use strict';

var should = require('chai').should(),
  sinon = require('sinon'),
  mongoose = require('mongoose');

describe('The Recipe model', function () {
  var Recipe,
    Account,
    Measurement,
    RecipesBook,
    recipe,
    existingAccount,
    existingMeasurement,
    existingRecipesBook,
    accountParams = {
      firstName: 'FirstName',
      lastName: 'LastName',
      userName: 'some other username',
      email: 'test@test.com',
      password: 'password',
      provider: 'local'
    },
    recipesBookParams = {
      name: 'any recipes book name'
    },
    recipeParams;

  var findAccount = function (done) {
    Account.findOne({userName: accountParams.userName}, function (err, account) {
      if(err || !account)
      {
        existingAccount = new Account(accountParams);

        existingAccount.save(done);
      }
      else {
        existingAccount = account;

        done();
      }
    });
  };

  var findMeasurement = function (done) {
    Measurement.findOne(function (err, measurement) {
      if(err || !measurement) {
        existingMeasurement = new Measurement({
          name: 'inch (in)',
          type: 'Imperial',
          category: 'Length'
        });

        existingMeasurement.save(done);
      }
      else {
        existingMeasurement = measurement;

        done();
      }
    });
  };

  var findRecipesBook = function (done) {
    recipesBookParams.owner = existingAccount;

    RecipesBook.findOne({owner: existingAccount}, function (err, recipesBook) {
      if(err || !recipesBook)
      {
        existingRecipesBook = new RecipesBook(recipesBookParams);

        existingRecipesBook.save(done);
      }
      else {
        existingRecipesBook = recipesBook;

        done();
      }
    });
  };

  before(function (done) {
    Recipe = mongoose.model('Recipe');
    Account = mongoose.model('Account');
    RecipesBook = mongoose.model('RecipesBook');
    Measurement = mongoose.model('Measurement');

    findAccount(function () {
      findMeasurement(function () {
        findRecipesBook(done)
      })
    });
  });

  describe('Save', function () {
    beforeEach(function (done) {
      recipeParams = {
        name: 'Test Recipe',
        description: 'Not a real recipe',
        ingredients: [{
          name: 'Test Ingredient',
          quantity: 5,
          preparation: 'Chopped',
          measurement: existingMeasurement
        }],
        directions: 'Just test it out',
        preparationTime: '5 minutes',
        cookingTime: '15 minutes',
        numberOfServings: 5,
        recipesBook: existingRecipesBook
      };

      done();
    });

    it('should be able to save successfully', function (done) {
      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('fails to save if the name is not present', function (done) {
      recipeParams.name = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('fails to save if the description is not present', function (done) {
      recipeParams.description = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('fails to save if the directions is not present', function (done) {
      recipeParams.directions = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('fails to save if the recipes book is not present', function (done) {
      recipeParams.recipesBook = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('fails to save if the ingredients is not present', function (done) {
      recipeParams.ingredients = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('fails to save if the ingredient name is not set', function (done) {
      recipeParams.ingredients[0].name = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('fails to save if the ingredient measurement is not set', function (done) {
      recipeParams.ingredients[0].measurement = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('fails to save if the ingredients is empty', function (done) {
      recipeParams.ingredients = [];

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('succeeds to save if the preparation time is not present', function (done) {
      recipeParams.preparationTime = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('succeeds to save if the cooking time is not present', function (done) {
      recipeParams.cookingTime = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('succeeds to save if the number of servings is not present', function (done) {
      recipeParams.numberOfServings = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('succeeds to save if the ingredient quantity is not present', function (done) {
      recipeParams.ingredients[0].quantity = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('succeeds to save if the ingredient preparation is not present', function (done) {
      recipeParams.ingredients[0].preparation = undefined;

      recipe = new Recipe(recipeParams);

      recipe.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
  });
});