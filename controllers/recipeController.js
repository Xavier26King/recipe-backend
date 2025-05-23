const Recipe = require('../models/recipe');

// Api to create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { name, ingredients, steps, cuisineType, imageUrl } = req.body;

        const recipe = new Recipe({
            name,
            cuisineType,
            ingredients,
            steps,
            imageUrl
        });

        await recipe.save();
        res.status(200).json({ message: 'Recipe created successfully', recipe });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Api to get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json({ message: "Successfully retrieved all recipes", recipes });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Api to get recipe by id
const getRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Successfully retrieved recipe", recipe });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// API to add recipes in bulk
const bulkUploadRecipes = async (req, res) => {
    try {
        const recipes = req.body;

        if (!Array.isArray(recipes) || recipes.length === 0) {
            return res.status(400).json({ message: "Request body should be a non-empty array of recipes" });
        }
        // await Recipe.deleteMany({});
        const createdRecipes = await Recipe.insertMany(recipes);

        res.status(201).json({ message: "Recipes uploaded successfully", recipes: createdRecipes });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    bulkUploadRecipes
};