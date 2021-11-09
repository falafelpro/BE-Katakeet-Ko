const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");

// DB
const connectDB = require("./db/database");

// Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Routes
const userRoutes = require("./apis/users/user.routes");
const categoriesRoutes = require("./apis/categories/category.routes");

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use(cors());

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/media", express.static(path.join(__dirname, "media")));
// REVIEW: It's `/api` not `/apis`
// REVIEW: Why the kk? Remove it please
app.use("/apis/kk", userRoutes);
app.use("/apis/categories", categoriesRoutes);

// REVIEW: Remove the {} since it's a one-line arrow function
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
