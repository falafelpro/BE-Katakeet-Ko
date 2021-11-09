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
  // REVIEW: So the recipe has one ingredient only?
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
  },
});

// REVIEW: You're using this plugin, but where is your slug field?
RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Recipe", RecipeSchema);
