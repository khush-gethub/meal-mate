const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27018/recipe-database');

const { VegetarianRecipe,SeafoodRecipe,DessertRecipe,ChickenRecipe } = require('./model/recipeSchema');

app.get('/chicken', async (req,res) => {
    const recipe = await ChickenRecipe.find();
    res.json(recipe);
})

app.get('/veg', async (req,res) => {
    const recipe = await VegetarianRecipe.find();
    res.json(recipe);
})

app.get('/dessert', async (req,res) => {
    const recipe = await DessertRecipe.find();
    res.json(recipe);
})

app.get('/seafood', async (req,res) => {
    const recipe = await SeafoodRecipe.find();
    res.json(recipe);
})

app.listen(8000 , ()=>{
    'the server is running'
})