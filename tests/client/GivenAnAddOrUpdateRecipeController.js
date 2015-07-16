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

  describe('Deleting an ingredient', function () {
    var idOutOfOrder = 44,
      nonExistingItemId = 991,
      nonExistingIndex = -1,
      numberOfIngredients;

    beforeEach(function () {
      scope.addIngredient();
      scope.addIngredient();
      scope.ingredients[1].id = idOutOfOrder;

      numberOfIngredients = scope.ingredients.length;
    });

    it('does not do anything, if it does not find the item', function () {
      scope.removeIngredient(nonExistingItemId);

      scope.ingredients.length.should.equal(numberOfIngredients);
    });

    it('only removes the item with the specified id', function () {
      scope.removeIngredient(idOutOfOrder);

      scope.ingredients.length.should.equal(numberOfIngredients - 1);
    });

    it('removes the ingredient based on the id', function () {
      scope.removeIngredient(idOutOfOrder);

      var index = _.findIndex(scope.ingredients, function (item) {
        return item.id == idOutOfOrder;
      });

      index.should.equal(nonExistingIndex);
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
