const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
// Q: Why are you not using the slug plugin?
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  image: { type: String },
  description: String,
  // REVIEW: Since it's an array, it should be `recipes` not `recipe`.
  recipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

//CategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Category", CategorySchema);
