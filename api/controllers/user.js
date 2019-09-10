const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwt_key = process.env.JWT_KEY;
const environment = process.env.ENVIRONMENT;
let url;
if (environment === "local") {
  url = "http://localhost:3000";
} else if (environment === "production") {
  url = "https://population-control-33.herokuapp.com";
}

// import the user schema
const User = require("../models/user");

/**
 * @method users_get_all
 * @summary - return all users
 * @param request body, response body
 * @returns json message
 */
exports.users_get_all = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json({
        message: "Found all users",
        users
      });
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * @method user_sign_up
 * @summary - sign up a user
 * @param request body, response body
 * @returns json message
 */
exports.user_sign_up = (req, res, next) => {
  bycrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
};

/**
 * @method user_login
 * @summary - sign up a user
 * @param request body, response body
 * @returns json message
 */
exports.user_login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // exec() turns it into a promise
  User.find({ email: email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const userPassword = user[0].password;
      bycrypt.compare(password, userPassword, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        // returns true if the comparison is fine
        if (result) {
          // generate token that expires after 1h
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            jwt_key,
            {
              expiresIn: "1h"
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch();
};
