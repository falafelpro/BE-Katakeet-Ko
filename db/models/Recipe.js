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

RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Recipe", RecipeSchema);