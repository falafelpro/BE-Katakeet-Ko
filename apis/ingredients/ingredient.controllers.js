const Ingredient = require("../../db/models/Ingredient");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Ingredient.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.categoryCreate = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    return res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};
