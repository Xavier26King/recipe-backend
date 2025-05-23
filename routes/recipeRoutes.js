const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.post("/", recipeController.createRecipe);
router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipe);
router.post('/bulk-upload', recipeController.bulkUploadRecipes);

module.exports = router;