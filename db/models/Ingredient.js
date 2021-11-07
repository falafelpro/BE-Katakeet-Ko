const mongoose = require("mongoose");
const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  portion: {
    type: String,
    unit: {
      enum: ["gr", "lb", "l", "tsp", "tbsp", "cup", "oz", null],
    },
  },
});
module.exports = mongoose.model("Ingredient", IngredientSchema);
