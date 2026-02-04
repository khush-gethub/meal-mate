const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  steps: {
    type: [String],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel'
  },
  authorName: {
    type: String
  }
});

const VegetarianRecipe = mongoose.model('VegetarianRecipe', recipeSchema, 'veg-data');
const SeafoodRecipe = mongoose.model('SeafoodRecipe', recipeSchema, 'seafood-data');
const DessertRecipe = mongoose.model('DessertRecipe', recipeSchema, 'dessert-data');
const ChickenRecipe = mongoose.model('ChickenRecipe', recipeSchema, 'chicken-data');
const General = mongoose.model('General', recipeSchema, 'general');

module.exports = {
  VegetarianRecipe,
  SeafoodRecipe,
  DessertRecipe,
  ChickenRecipe,
  General
};