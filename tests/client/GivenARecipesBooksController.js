'use strict';

describe('The Recipes Books controller to show the list of recipes books', function () {
  var scope,
    controller,
    rbRecipesBook,
    recipesBooks = [{}, {}, {}];

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      var recipesBookQueryStub = sinon.stub();
      recipesBookQueryStub.callsArgWith(0, recipesBooks);

      rbRecipesBook = {
        query: recipesBookQueryStub
      };

//      rbRecipesBook.query = recipesBookQueryStub;


//      rbNotifier = {
//        success: sinon.spy(),
//        error: sinon.spy()
//      };
//      location = {
//        path: sinon.spy()
//      };

      controller = $controller('rbRecipesBooksController', {
        $scope: scope,
        rbRecipesBook: rbRecipesBook
      });
    }));

  describe('The list of Recipes Books', function () {
    it('queries the rbRecipesBook service for the list', function () {
      rbRecipesBook.query.should.have.been.called;
    });

    it('adds the returned recipes books to $scope.recipesBooks', function () {
      scope.recipesBooks.length.should.equal(3);
    });
  });
});