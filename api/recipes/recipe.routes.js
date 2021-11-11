const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();
const { fetchRecipes, recipeCreate } = require("./recipe.controllers");

// Param Middleware
router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipes(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    next({ status: 404, message: "Recipe Not Found!" });
  }
});

router.get("/", fetchRecipes);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  recipeCreate
);

module.exports = router;
