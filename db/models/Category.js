const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const RecipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: { type: String },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
  },
});

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  image: { type: String },
  description: String,
  recipe: [RecipeSchema],
});

CategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Category", CategorySchema);
