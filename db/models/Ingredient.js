const mongoose = require("mongoose");
const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  // YA Salam! LOVE IT! Bas i think they should be split into 2 schemas? Ingredient and Portion
  portion: {
    type: String,
    unit: {
      enum: ["gr", "lb", "l", "tsp", "tbsp", "cup", "oz", null],
    },
  },
});
module.exports = mongoose.model("Ingredient", IngredientSchema);
