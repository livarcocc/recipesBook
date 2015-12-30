'use strict';

module.exports = function (Recipe) {
  return {
    createRecipe: function(req, res) {
      var newRecipe = req.body;

      Recipe.create(newRecipe, function (err, recipe) {
        if(err) {
          res.status(400);
          return res.send({reason: err.toString()});
        }

        res.send(recipe);
      });
    },
    preLoadRecipe: function (req, res, next, id) {
      Recipe.findById(id, function (err, recipe) {
        if(err) {
          res.status(500);
          return res.send({reason: err.toString()});
        }

        if(!recipe || recipe.recipesBook !== req.recipesBook._id) {
          res.status(404);
          return res.send({reason: 'Can\'t find recipe.'})
        }

        req.recipe = recipe;

        return next();
      });
    }
  }
};