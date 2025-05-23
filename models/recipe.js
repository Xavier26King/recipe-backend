const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        cuisineType: {
            type: String,
            required: true,
            enum: ['Indian', 'Mexican', 'Chinese', 'Italian', 'American', 'Japanese', 'Mediterranean', 'Thai'],
        },
        ingredients: [
            {
                type: String
            }
        ],
        steps: [
            {
                type: String
            }
        ],
        imageUrl: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('recipes', RecipeSchema, 'recipes');

module.exports = Recipe;