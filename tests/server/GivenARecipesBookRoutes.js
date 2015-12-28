'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('The RecipesBook routes', function () {
  var recipesBooksRoutes,
    recipesBooksRouteSpy,
    specificRecipesBooksRouteSpy,
    auth,
    router,
    app,
    controller = {
      recipesBooksForUser: function () {},
      createRecipesBook: function () {},
      updateRecipesBook: function () {},
      deleteRecipesBook: function () {}
    };

  before(function (done) {
    recipesBooksRoutes = require('../../server/recipesBook/recipesBookRoutes.js');

    done();
  });

  beforeEach(function (done) {
    recipesBooksRouteSpy = {
      get: sinon.spy(),
      post: sinon.spy()
    };

    specificRecipesBooksRouteSpy = {
      put: sinon.spy(),
      delete: sinon.spy()
    };

    auth = {
      requiresApiLogin: sinon.spy()
    };

    router = {
      param: sinon.spy()
    };

    var route = sinon.stub();
    route.withArgs('/api/users/:user/recipesBooks/:recipesBook').returns(specificRecipesBooksRouteSpy);
    route.withArgs('/api/users/:user/recipesBooks').returns(recipesBooksRouteSpy);

    app = {
      route: route
    };

    recipesBooksRoutes(app, router, controller, auth);

    done();
  });

  describe('"/api/recipesBooks" routes', function () {
    it('creates a router to "/api/recipesBooks"', function (done) {
      app.route.should.have.been.calledWith('/api/users/:user/recipesBooks');

      done();
    });

    it('maps GET to recipesBookController.recipesBooksForUser', function (done) {
      recipesBooksRouteSpy.get.should.have.been.calledWith(auth.requiresApiLogin, controller.recipesBooksForUser);

      done();
    });

    it('maps POST to recipesBookController.createRecipesBook', function (done) {
      recipesBooksRouteSpy.post.should.have.been.calledWith(auth.requiresApiLogin, controller.createRecipesBook);

      done();
    });
  });

  describe('"/api/recipesBooks/:recipesBook"', function () {
    it('creates a router to "/api/recipesBooks/:recipesBook"', function (done) {
      app.route.should.have.been.calledWith('/api/users/:user/recipesBooks/:recipesBook');

      done();
    });

    it('maps PUT to recipesBookController.updateRecipesBook', function (done) {
      specificRecipesBooksRouteSpy.put.should.have.been.calledWith(auth.requiresApiLogin, controller.updateRecipesBook);

      done();
    });

    it('maps DELETE to recipesBookController.deleteRecipesBook', function (done) {
      specificRecipesBooksRouteSpy.delete.should.have.been.calledWith(auth.requiresApiLogin, controller.deleteRecipesBook);

      done();
    });

    it('adds a param to :recipesBook which calls to recipesBookController.preLoadRecipesBook', function (done) {
      router.param.should.have.been.calledWith('recipesBook', controller.preLoadRecipesBook);

      done();
    })
  });
});