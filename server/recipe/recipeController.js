'use strict';

module.exports = function (Recipe) {
  return {
    recipeForUser: function (req, res) {
      req.recipe.populate('ingredients.measurement', function (err, recipe) {
        if(err) {
          res.status(500);
          return res.send({reason: err.toString()});
        }

        res.send(recipe);
      });
    },
    createRecipe: function(req, res) {
      var newRecipe = req.body;

      Recipe.create(newRecipe, function (err, recipe) {
        if(err) {
          res.status(400);
          return res.send({reason: err.toString()});
        }

        req.recipesBook.recipes.push(recipe);
        req.recipesBook.save(function (err) {
          if(err) {
            res.status(500);
            return res.send({reason: err.toString()});
          }

          res.send(recipe);
        });
      });
    },
    preLoadRecipe: function (req, res, next, id) {
      Recipe.findById(id, function (err, recipe) {
        if(err) {
          res.status(500);
          return res.send({reason: err.toString()});
        }

        if(!recipe || !recipe.recipesBook.equals(req.recipesBook._id)) {
          res.status(404);
          return res.send({reason: 'Can\'t find recipe.'})
        }

        req.recipe = recipe;

        return next();
      });
    }
  }
};