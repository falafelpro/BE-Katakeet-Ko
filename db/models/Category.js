const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  image: { type: String },
  //description: String,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
});

CategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Category", CategorySchema);
