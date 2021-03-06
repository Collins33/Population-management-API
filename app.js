const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Make database connection
 * uses the environment
 */
const environment = process.env.ENVIRONMENT;
if (environment === "local" || environment === "production") {
  mongoose.connect(process.env.MONGO_DATABASE_URL, { useNewUrlParser: true });
} else if (environment === "testing") {
  mongoose.connect(process.env.MONGO_DATABASE_TEST_URL, {
    useNewUrlParser: true
  });
}

/**
 * Use the default node js promise
 */
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require("./api/routes/user");
const locationRoutes = require("./api/routes/location");
/**
 * Give access control
 * to any client
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/**
 * Welcome route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the population manager"
  });
});

/**
 * setup middleware
 * incoming request will
 * go through this
 */

app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
