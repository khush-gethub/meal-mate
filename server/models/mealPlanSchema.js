const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
        unique: true
    },
    weekDays: {
        type: Object,
        default: {
            Monday: {},
            Tuesday: {},
            Wednesday: {},
            Thursday: {},
            Friday: {},
            Saturday: {},
            Sunday: {}
        }
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
