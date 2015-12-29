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

  before(function (done) {
    request = {
    };

    response = {
      status: sinon.spy(),
      send: sinon.stub(),
      end: sinon.spy()
    };

    recipeController = require('../../server/recipe/recipeController.js')(recipeSpy);

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
});