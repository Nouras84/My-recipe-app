// Gets access to environment variables/settings
require("dotenv").config();

// Handles http requests (express is a Node.js framework)
const express = require("express");
const app = express();

// This function is getting exported from the config folder. It runs database connection and middleware setup
require("./config")(app);

// Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const recipeRoutes = require("./routes/recipe.routes");
app.use("/recipe", recipeRoutes);

const categoryRoutes = require("./routes/category.routes");
app.use("/category", categoryRoutes);

// Handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
