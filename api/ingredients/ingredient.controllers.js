const Ingredient = require("../../db/models/Ingredient");

exports.fetchIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    return res.json(ingredients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.ingredientCreate = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    return res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};
