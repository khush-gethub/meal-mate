require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userModule = require('./models/userSchema');
const MealPlan = require('./models/mealPlanSchema');
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

app.post('/recipes', verifyToken, async (req, res) => {
    const { type, title, image, description, ingredients, steps } = req.body;
    const RecipeModel = getRecipeModel(type);

    if (!RecipeModel) {
        return res.status(400).json({ message: 'Invalid recipe type' });
    }

    try {
        const user = await userModule.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newRecipe = await RecipeModel.create({
            title,
            image,
            description,
            ingredients,
            steps,
            createdBy: user._id,
            authorName: user.rname
        });
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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

// Meal Planner Routes
app.get('/meal-planner', verifyToken, async (req, res) => {
    try {
        let plan = await MealPlan.findOne({ userId: req.user.id });
        if (!plan) {
            return res.json({
                weekDays: {
                    Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {}, Sunday: {}
                }
            });
        }
        res.json(plan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/meal-planner', verifyToken, async (req, res) => {
    try {
        const { weekDays } = req.body;
        // Upsert the meal plan
        const plan = await MealPlan.findOneAndUpdate(
            { userId: req.user.id },
            { weekDays },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(plan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search Endpoint
app.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);

        const regex = new RegExp(q, 'i'); // Case-insensitive search

        // Search in all collections
        const [veg, seafood, dessert, chicken, general] = await Promise.all([
            VegetarianRecipe.find({ title: regex }),
            SeafoodRecipe.find({ title: regex }),
            DessertRecipe.find({ title: regex }),
            ChickenRecipe.find({ title: regex }),
            General.find({ title: regex })
        ]);

        // Tag them with type
        const results = [
            ...veg.map(r => ({ ...r.toObject(), type: 'vegetarian', id: r._id })),
            ...seafood.map(r => ({ ...r.toObject(), type: 'seafood', id: r._id })),
            ...dessert.map(r => ({ ...r.toObject(), type: 'dessert', id: r._id })),
            ...chicken.map(r => ({ ...r.toObject(), type: 'chicken', id: r._id })),
            ...general.map(r => ({ ...r.toObject(), type: 'general', id: r._id }))
        ];

        res.json(results);
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

app.get('/verify-token', verifyToken, async (req, res) => {
    try {
        const user = await userModule.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
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

// User Profile Routes
app.put('/profile', verifyToken, async (req, res) => {
    try {
        const { rname, password } = req.body;
        const updateFields = { rname };

        if (password) {
            updateFields.password = password;
        }

        const updatedUser = await userModule.findByIdAndUpdate(req.user.id, updateFields, { new: true });
        res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/user/recipes', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const vegetarianRecipes = (await VegetarianRecipe.find({ createdBy: userId })).map(recipe => ({ ...recipe.toObject(), type: 'vegetarian', id: recipe._id.toString() }));
        const seafoodRecipes = (await SeafoodRecipe.find({ createdBy: userId })).map(recipe => ({ ...recipe.toObject(), type: 'seafood', id: recipe._id.toString() }));
        const dessertRecipes = (await DessertRecipe.find({ createdBy: userId })).map(recipe => ({ ...recipe.toObject(), type: 'dessert', id: recipe._id.toString() }));
        const chickenRecipes = (await ChickenRecipe.find({ createdBy: userId })).map(recipe => ({ ...recipe.toObject(), type: 'chicken', id: recipe._id.toString() }));
        const generalRecipes = (await General.find({ createdBy: userId })).map(recipe => ({ ...recipe.toObject(), type: 'general', id: recipe._id.toString() }));

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

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});