'use strict';

describe('The AddOrUpdateRecipe controller', function () {
  var controller,
    scope;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      controller = $controller('rbAddOrUpdateRecipeController', {
        $scope: scope
      });
    }));

  describe('Adding an ingredient', function () {
    beforeEach(function () {
      scope.addIngredient();
    });

    it('adds a new item to the list of ingredients', function () {
      scope.ingredients.length.should.equal(2);
    });

    it('increases the id of the ingredient by one', function () {
      scope.ingredients[1].id.should.equal(1);
    });
  });

  describe('The AddRecipe controller', function () {
    it('sets the scope.createOrEditRecipeLegend to the add recipe value', function () {
      scope.createOrEditRecipeLegend.should.equal('Create a new Recipe');
    });

    it('defines an array ingredients with one item', function () {
      scope.ingredients.length.should.equal(1);
    });

    it('sets the id of the first ingredient to 0', function () {
      scope.ingredients[0].id.should.equal(0);
    });
  });
});
