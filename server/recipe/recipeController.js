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
    }
  }
};