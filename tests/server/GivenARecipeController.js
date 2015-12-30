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

  describe('Create recipe', function () {
    var actualNewRecipe,
      createRecipeCallback;

    beforeEach(function (done) {
      createRecipeCallback = function () {};

      request.body = {
        name: 'recipes book'
      };

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

    it('sends the recipe back in the response when the creation succeeds', function (done) {
      var newRecipe = {};

      createRecipeCallback(undefined, newRecipe);

      response.send.should.have.been.calledWith(newRecipe);

      done();
    });
  });

  describe('the pre-load recipe function', function () {
    var next,
      findByIdId,
      findByIdCallback,
      recipeId = 'some recipe id',
      recipesBookId = 'some recipes book id',
      recipe = {
        recipesBook: recipesBookId
      };

    beforeEach(function (done) {
      next = sinon.spy();

      recipeSpy.findById = function (id, callback) {
        findByIdId = id;

        findByIdCallback = callback;
      };

      request.recipesBook = {
        _id: recipesBookId
      };

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
      findByIdCallback(undefined, {recipesBook: 'a different recipes book id'});

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