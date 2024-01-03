// const mongoose = require("mongoose");

// // This function will be exported and can be called from app.js
// module.exports = function (app) {
//   // Connect to MongoDB
//   mongoose
//     .connect(process.env.ATLAS_URL)
//     .then((x) => {
//       const dbName = x.connections[0].name;
//       // console.log(x.connections[0]);
//       console.log(`Connected to Mongo! Database name: "${dbName}"`);
//     })
//     .catch((err) => {
//       console.error("Error connecting to mongo: ", err);
//     });

//   // Here, you can include additional setup using 'app' if necessary
//   // For example, setting up middleware, routes, etc. that depend on the database connection
// };

const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = function (app) {
  // Connect to MongoDB
  mongoose
    .connect(process.env.ATLAS_URL)
    .then((x) => {
      const dbName = x.connections[0].name;
      console.log(`Connected to Mongo! Database name: "${dbName}"`);
    })
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
    });

  // Middleware configuration
  app.set("trust proxy", 1);
  app.use(cors(/* { origin: [process.env.CLIENT_URL] } */));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
