
const mongoose = require('mongoose');

// Schema for Recipe Categories
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    unique: true,
    trim: true,
    enum: ['Chicken', 'Dessert', 'Seafood', 'Vegetarian', 'General'] // Example categories
  }
});

// Schema for Recipes
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required.'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image URL is required.']
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required.'],
    validate: [v => Array.isArray(v) && v.length > 0, 'Ingredients list cannot be empty.']
  },
  steps: {
    type: [String],
    required: [true, 'Steps are required.'],
    validate: [v => Array.isArray(v) && v.length > 0, 'Steps list cannot be empty.']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Recipe category is required.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model('Category', categorySchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = { Category, Recipe };
