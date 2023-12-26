// // We reuse this import in order to have access to the `body` property in requests
// const express = require("express");

// // ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// // https://www.npmjs.com/package/morgan
// const logger = require("morgan");

// // ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// // https://www.npmjs.com/package/cookie-parser
// const cookieParser = require("cookie-parser");

// // ℹ️ Needed to accept requests from 'the outside'. CORS stands for cross origin resource sharing
// // unless the request is made from the same domain, by default express wont accept POST requests
// const cors = require("cors");

// // Middleware configuration
// module.exports = (app) => {
//   // Because this will be hosted on a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
//   // Services like Fly use something called a proxy and you need to add this to your server
//   app.set("trust proxy", 1);

//   // controls a very specific header to pass headers from the frontend
//   app.use(
//     cors(/*{
//       origin: [process.env.CLIENT_URL],
//     }*/)
//   );

//   // In development environment the app logs
//   app.use(logger("dev"));

//   // To have access to `body` property in the request
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));
//   app.use(cookieParser());
// };

// // ℹ️ package responsible to make the connection with mongodb
// // https://www.npmjs.com/package/mongoose
// const mongoose = require("mongoose");

// // ℹ️ Sets the MongoDB URI for our app to have access to it.
// // If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

// mongoose
//   .connect(process.env.ATLAS_URL)
//   .then((x) => {
//     const dbName = x.connections[0].name;
//     console.log(`Connected to Mongo! Database name: "${dbName}"`);
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo: ", err);
//   });

const mongoose = require("mongoose");

// This function will be exported and can be called from app.js
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

  // Here, you can include additional setup using 'app' if necessary
  // For example, setting up middleware, routes, etc. that depend on the database connection
};
