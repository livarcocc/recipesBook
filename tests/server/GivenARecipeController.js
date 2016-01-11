'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai"),
  should = require('chai').should();

chai.should();
chai.use(sinonChai);

describe('The Recipe controller', function () {
  var recipeSpy = {},
    request,
    response,
    recipeController;

  var prepareRequestResponse = function () {
    request = {
    };

    response = {
      status: sinon.spy(),
      send: sinon.stub(),
      end: sinon.spy()
    };
  };

  before(function (done) {
    recipeController = require('../../server/recipe/recipeController.js')(recipeSpy);

    done();
  });

  beforeEach(function (done) {
    prepareRequestResponse();

    done();
  });

  describe('GET Recipe', function () {
    var populateProperty,
      populateRecipeCallback;

    beforeEach(function (done) {
      request.recipe = {
        populate: function (property, callback) {
          populateProperty = property;
          populateRecipeCallback = callback;
        }
      };

      populateProperty = undefined;
      populateRecipeCallback = undefined;

      recipeController.recipeForUser(request, response);

      done();
    });

    it('calls populate ingredients.measurement on the Recipe', function (done) {
      populateProperty.should.equal('ingredients.measurement');

      done();
    });

    it('sends a 500 when populate fails', function (done) {
      var error = new Error('Injected error');
      populateRecipeCallback(error);

      response.status.should.have.been.calledWith(500);
      response.send.should.have.been.calledWith({reason: error.toString()});

      done();
    });

    it('sends the new populated recipe back', function (done) {
      var recipeToReturn = {};
      populateRecipeCallback(undefined, recipeToReturn);

      response.send.should.have.been.calledWith(recipeToReturn);

      done();
    });
  });

  describe('Create recipe', function () {
    var actualNewRecipe,
      createRecipeCallback,
      recipesBook;

    beforeEach(function (done) {
      createRecipeCallback = function () {};

      request.body = {
        name: 'recipes book'
      };

      recipesBook = {
        save: sinon.spy(),
        recipes: []
      };

      request.recipesBook = recipesBook;

      recipeSpy.create = function (newRecipe, callback) {
        actualNewRecipe = newRecipe;
        createRecipeCallback = callback;
      };

      recipeController.createRecipe(request, response);

      done();
    });

    it('sends a 400 with a reason when recipe.create fails', function (done) {
      createRecipeCallback('error');

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith({reason: 'error'});

      done();
    });

    describe('Adding the recipe to the recipes book', function () {
      var newRecipe;

      beforeEach(function () {
        newRecipe = {};
        createRecipeCallback(undefined, newRecipe);
      });

      it('adds the recipe to the recipes book', function (done) {
        recipesBook.recipes.length.should.equal(1);
        recipesBook.recipes[0].should.equal(newRecipe);

        done();
      });

      it('saves the recipes book', function (done) {
        recipesBook.save.should.have.been.called;

        done();
      });

      describe('the save recipes book callback', function () {
        var saveRecipesBookCallback;

        beforeEach(function (done) {
          recipesBook.save = function (callback) {
            saveRecipesBookCallback = callback;
          };

          createRecipeCallback(undefined, newRecipe);

          done();
        });

        it('sends a 500 when it fails to save the recipes book', function (done) {
          var error = new Error('Injected error.');
          saveRecipesBookCallback(error);

          response.status.should.have.been.calledWith(500);
          response.send.should.have.been.calledWith({reason: error.toString()});

          done();
        });

        it('sends the recipe back after saving the recipes book', function (done) {
          saveRecipesBookCallback();

          response.send.should.have.been.calledWith(newRecipe);

          done();
        });
      });
    });
  });

  describe('the pre-load recipe function', function () {
    var next,
      findByIdId,
      findByIdCallback,
      recipeId = 'some recipe id',
      recipesBookId = 'some recipes book id',
      RecipesBook = function (id) {
        return {
          _id: id,
          equals: function (otherRecipeBook) {
            return this._id === otherRecipeBook;
          }
        };
      },
      recipe = {
        recipesBook: new RecipesBook(recipesBookId)
      };

    beforeEach(function (done) {
      next = sinon.spy();

      recipeSpy.findById = function (id, callback) {
        findByIdId = id;

        findByIdCallback = callback;
      };

      request.recipesBook = new RecipesBook(recipesBookId);

      recipeController.preLoadRecipe(request, response, next, recipeId);

      done();
    });

    it('tries to find a recipe with the passed id', function (done) {
      findByIdId.should.equal(recipeId);

      done();
    });

    it('sets req.recipe to the recipe with the passed id', function (done) {
      findByIdCallback(undefined, recipe);

      request.recipe.should.equal(recipe);

      done();
    });

    it('returns 404 when no recipe is found for the passed id', function (done) {
      findByIdCallback(undefined, undefined);

      response.status.should.have.been.calledWith(404);
      response.send.should.have.been.calledWith({reason: 'Can\'t find recipe.'});

      done();
    });

    it('returns 404 if the recipe does not belong to the recipe book in the uri', function (done) {
      findByIdCallback(undefined, {recipesBook: new RecipesBook('a different recipes book id')});

      response.status.should.have.been.calledWith(404);
      response.send.should.have.been.calledWith({reason: 'Can\'t find recipe.'});

      done();
    });

    it('returns 500 when a error occurs when trying to find the recipe', function (done) {
      var error = new Error('Injected error');
      findByIdCallback(error, undefined);

      response.status.should.have.been.calledWith(500);
      response.send.should.have.been.calledWith({reason: error.toString()});

      done();
    });

    it('invokes the next function in the chain when everything succeeds', function (done) {
      findByIdCallback(undefined, recipe);

      next.should.have.been.called;

      done();
    });
  });
});