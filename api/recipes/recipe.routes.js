const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();
const { fetchRecipes, recipeCreate } = require("./recipe.controllers");

// Param Middleware
router.param("recipeId", async (req, res, next, recipeId) => {
  // REIVEW: Why capital R? It should be `recipe`
  const Recipe = await fetchRecipes(recipeId, next);
  if (Recipe) {
    req.Recipe = Recipe;
    next();
  } else {
    next({ status: 404, message: "Recipe Not Found!" });
  }
});

router.get("/", fetchRecipes);
router.post(
  "/",
  passport.authenticate("jwt", upload.single("image"), { session: false }),
  recipeCreate
);

module.exports = router;
