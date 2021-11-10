const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");

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
  upload.single("image"),
  categoryCreate
);
router.post("/:categoryId/recipes", recipeCreate);

module.exports = router;
