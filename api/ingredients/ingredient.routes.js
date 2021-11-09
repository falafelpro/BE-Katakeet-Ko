const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  fetchIngredients,
  ingredientCreate,
} = require("./ingredient.controllers");

// Param Middleware
router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await fetchIngredients(ingredientId, next);
  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    next({ status: 404, message: "Ingredient Not Found!" });
  }
});

router.get("/", fetchIngredients);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ingredientCreate
);

module.exports = router;
