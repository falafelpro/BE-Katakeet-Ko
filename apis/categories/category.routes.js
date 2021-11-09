const express = require("express");
const { session } = require("passport");
const passport = require("passport");
const router = express.Router();
const {
  fetchCategories,
  categoryCreate,
  recipeCreate,
} = require("./category.controllers");

// Param Middleware
router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategories(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    next({ status: 404, message: "Category Not Found!" });
  }
});

router.get("/", fetchCategories);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  categoryCreate
);
router.post("/:categoryId/recipes", recipeCreate);

module.exports = router;
