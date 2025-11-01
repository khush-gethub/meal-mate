require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userModule = require('./models/userSchema');
const { generateToken } = require('./auth/token');
const { verifyToken, isAdmin } = require('./auth/middleware');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27018/recipe-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
})

const { VegetarianRecipe, SeafoodRecipe, DessertRecipe, ChickenRecipe, General } = require('./models/schema');

// Helper function to get the correct recipe model based on type
const getRecipeModel = (type) => {
    switch (type) {
        case 'vegetarian': return VegetarianRecipe;
        case 'seafood': return SeafoodRecipe;
        case 'dessert': return DessertRecipe;
        case 'chicken': return ChickenRecipe;
        case 'general': return General;
        default: return null;
    }
};

app.get('/vegetarian', async (req, res) => {
    try {
        const recipes = await VegetarianRecipe.find();
        const recipesWithId = recipes.map(recipe => ({ ...recipe.toObject(), id: recipe._id.toString() }));
        res.json(recipesWithId);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/seafood', async (req, res) => {
    try {
        const recipes = await SeafoodRecipe.find();
        const recipesWithId = recipes.map(recipe => ({ ...recipe.toObject(), id: recipe._id.toString() }));
        res.json(recipesWithId);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/dessert', async (req, res) => {
    try {
        const recipes = await DessertRecipe.find();
        const recipesWithId = recipes.map(recipe => ({ ...recipe.toObject(), id: recipe._id.toString() }));
        res.json(recipesWithId);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/chicken', async (req, res) => {
    try {
        const recipes = await ChickenRecipe.find();
        const recipesWithId = recipes.map(recipe => ({ ...recipe.toObject(), id: recipe._id.toString() }));
        res.json(recipesWithId);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/general', async (req, res) => {
    try {
        const recipes = await General.find();
        const recipesWithId = recipes.map(recipe => ({ ...recipe.toObject(), id: recipe._id.toString() }));
        res.json(recipesWithId);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/register', async (req, res) => {
    const { rname, email, password, conformPassword, role } = req.body;
    const newUser = await userModule.create({ rname, email, password, conformPassword, role });
    res.status(201).json(newUser);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModule.findOne({ email, password });
        if (user) {
            const token = generateToken(user.toObject());
            res.cookie('token', token, { httpOnly: true });
            res.json({ success: true, message: 'Login successful', role: user.role });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/verify-token', verifyToken, (req, res) => {
    console.log('Server /verify-token - req.user:', req.user);
    res.json({ success: true, user: req.user });
});

// Admin Routes
app.get('/admin/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await userModule.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/admin/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await userModule.findByIdAndDelete(id);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/admin/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { rname, email, role, password } = req.body;
        const updateFields = { rname, email, role };

        if (password) {
            // IMPORTANT: In a real application, you should hash the password here before saving.
            // For example: updateFields.password = await bcrypt.hash(password, 10);
            updateFields.password = password; // Storing plain password for now as per existing schema
        }

        const updatedUser = await userModule.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Recipe Management Endpoints
app.get('/admin/recipes', verifyToken, isAdmin, async (req, res) => {
    try {
        const vegetarianRecipes = (await VegetarianRecipe.find()).map(recipe => ({ ...recipe.toObject(), type: 'vegetarian', id: recipe._id.toString() }));
        const seafoodRecipes = (await SeafoodRecipe.find()).map(recipe => ({ ...recipe.toObject(), type: 'seafood', id: recipe._id.toString() }));
        const dessertRecipes = (await DessertRecipe.find()).map(recipe => ({ ...recipe.toObject(), type: 'dessert', id: recipe._id.toString() }));
        const chickenRecipes = (await ChickenRecipe.find()).map(recipe => ({ ...recipe.toObject(), type: 'chicken', id: recipe._id.toString() }));
        const generalRecipes = (await General.find()).map(recipe => ({ ...recipe.toObject(), type: 'general', id: recipe._id.toString() }));

        const allRecipes = [
            ...vegetarianRecipes,
            ...seafoodRecipes,
            ...dessertRecipes,
            ...chickenRecipes,
            ...generalRecipes,
        ];
        res.json(allRecipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/admin/recipes', verifyToken, isAdmin, async (req, res) => {
    const { type, title, image, description, ingredients, steps } = req.body;
    const RecipeModel = getRecipeModel(type);

    if (!RecipeModel) {
        return res.status(400).json({ message: 'Invalid recipe type' });
    }

    try {
        const newRecipe = await RecipeModel.create({ title, image, description, ingredients, steps });
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/admin/recipes/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { type, title, image, description, ingredients, steps } = req.body;
    const RecipeModel = getRecipeModel(type);

    if (!RecipeModel) {
        return res.status(400).json({ message: 'Invalid recipe type' });
    }

    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, { title, image, description, ingredients, steps }, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(updatedRecipe);
    } catch (err) {
        console.error('Error updating recipe:', err);
        res.status(500).json({ message: 'Failed to update recipe.', error: err.message });
    }
});

app.delete('/admin/recipes/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { type } = req.body; // Need type to know which collection to delete from
    const RecipeModel = getRecipeModel(type);

    if (!RecipeModel) {
        return res.status(400).json({ message: 'Invalid recipe type' });
    }

    try {
        const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json({ success: true, message: 'Recipe deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected route for admin dashboard
app.get('/admin/dashboard', verifyToken, isAdmin, (req, res) => {
    res.json({ success: true, message: 'Welcome to the admin dashboard' });
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});