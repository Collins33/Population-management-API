const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

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
