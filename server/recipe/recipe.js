var mongoose = require('mongoose');

module.exports = function () {
  var ingredientSchema = mongoose.Schema({
    quantity: Number,
    name: {
      type: String,
      required: true
    },
    preparation: String,
    measurement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Measurement',
      required: true
    }
  });

  var recipeSchema = mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ingredients: {
      type: [ingredientSchema],
      required: true
    },
    directions: {
      type: String,
      required: true
    },
    preparationTime: String,
    cookingTime: String,
    numberOfServings: Number,
    recipesBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RecipesBook',
      required: true
    }
  });

  mongoose.model('Recipe', recipeSchema);
};