const Recipe = require("../../db/models/Recipe");

exports.fetchRecipes = async (req, res) => {
  try {
    const recipe = await Recipe.find();
    return res.json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
