const Category = require("../../db/models/Category");
const Recipe = require("../../db/models/Recipe");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//dont forget to add  fetchCat by ID for param middleware
exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }

  try {
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };
    const newRecipe = await Recipe.create(req.body);
    await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { $push: { recipe: newRecipe._id } }
    );
    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
