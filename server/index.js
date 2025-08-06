const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userModule = require('./Model/userSchema')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27018/recipe-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
})

const { VegetarianRecipe, SeafoodRecipe, DessertRecipe, ChickenRecipe, General } = require('./Model/schema');

app.get('/vegetarian', async (req, res) => {
    try {
        const recipes = await VegetarianRecipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/seafood', async (req, res) => {
    try {
        const recipes = await SeafoodRecipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/dessert', async (req, res) => {
    try {
        const recipes = await DessertRecipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/chicken', async (req, res) => {
    try {
        const recipes = await ChickenRecipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/general', async (req, res) => {
    try {
        const recipes = await General.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/Signup', async (req, res) => {
    const { rname, email, password, conformPassword } = req.body;
    const newUser = await userModule.create({ rname, email, password, conformPassword });
    res.status(201).json(newUser);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModule.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});