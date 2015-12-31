'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('The recipe routes', function () {
  var app,
    recipeRoutes,
    recipeRouteSpy,
    specificRecipeRouteSpy,
    auth,
    router,
    controller = {
      createRecipe: function () {},
      recipeForUser: function () {}
    };

  before(function (done) {
    recipeRoutes = require('../../server/recipe/recipeRoutes.js');

    done();
  });

  beforeEach(function (done) {
    auth = {
      requiresApiLogin: sinon.spy()
    };

    recipeRouteSpy = {
      post: sinon.spy()
    };

    specificRecipeRouteSpy = {
      get: sinon.spy()
    };

    router = {
      param: sinon.spy()
    };

    var route = sinon.stub();
    route.withArgs('/api/users/:user/recipesBooks/:recipesBook/recipes').returns(recipeRouteSpy);
    route.withArgs('/api/users/:user/recipesBooks/:recipesBook/recipes/:recipe').returns(specificRecipeRouteSpy);

    app = {
      route: route
    };

    recipeRoutes(app, router, auth, controller);

    done();
  });

  describe('"/api/users/:user/recipesBooks/:recipesBook/recipes" routes', function () {
    it('creates a router to "/api/users/:user/recipesBooks/:recipesBook/recipes"', function (done) {
      app.route.should.have.been.calledWith('/api/users/:user/recipesBooks/:recipesBook/recipes');

      done();
    });

    it('maps POST to recipeController.createRecipe', function (done) {
      recipeRouteSpy.post.should.have.been.calledWith(auth.requiresApiLogin, controller.createRecipe);

      done();
    });
  });

  describe('"/api/users/:user/recipesBooks/:recipesBook/recipes/:recipe" routes', function () {
    it('creates a router to "/api/users/:user/recipesBooks/:recipesBook/recipes/:recipe"', function (done) {
      app.route.should.have.been.calledWith('/api/users/:user/recipesBooks/:recipesBook/recipes/:recipe');

      done();
    });

    it('maps GET to recipeController.recipeForUser', function (done) {
      specificRecipeRouteSpy.get.should.have.been.calledWith(auth.requiresApiLogin, controller.recipeForUser);

      done();
    });

    it('adds a param to :recipe which calls to recipeController.preLoadRecipe', function (done) {
      router.param.should.have.been.calledWith('recipe', controller.preLoadRecipe);

      done();
    })
  });
});