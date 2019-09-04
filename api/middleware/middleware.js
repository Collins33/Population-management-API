const express = require("express");
const Location = require("../models/location");
const User = require("../models/user");

/**
 * @method checkUniqueName
 * @summary - checks the name passed to ensure it is unique
 * @param request body, response body
 * @returns json message
 */

exports.checkUniqueName = (req, res, next) => {
  Location.findOne({ name: req.body.name }).then(location => {
    if (location) {
      res.status(500).json({
        message: "The location name already exists"
      });
    } else {
      next();
    }
  });
};

/**
 * @method checkEmtyInput
 * @summary - checks data passed to ensure it is not empty
 * @param request body, response body
 * @returns json message
 */

exports.checkEmtyInput = (req, res, next) => {
  const name = req.body.name.trim();
  const femalePopulation = req.body.femalePopulation.trim();
  const malePopulation = req.body.malePopulation.trim();

  if (name.length <= 0) {
    res.status(400).json({
      message: "You cannot input an empty name"
    });
  } else if (femalePopulation.length <= 0) {
    res.status(400).json({
      message: "You cannot input an empty female population data"
    });
  } else if (malePopulation.length <= 0) {
    res.status(400).json({
      message: "You cannot input an empty male population data"
    });
  } else {
    next();
  }
};

/**
 * @method checkMissingLocation
 * @summary - ensures the location exists
 * @param request body, response body
 * @returns json message
 */

exports.checkMissingLocation = (req, res, next) => {
  const { locationId } = req.params;
  Location.findById(locationId).then(location => {
    if (!location) {
      res.status(404).json({
        message: "The location does not exist"
      });
    } else {
      next();
    }
  });
};

/**
 * @method checkExistingEmail
 * @summary - ensures the email is unique
 * @param request body, response body
 * @returns json message
 */

exports.checkExistingEmail = (req, res, next) => {
  const RequestEmail = req.body.email;
  User.findOne({ email: RequestEmail }).then(user => {
    if (user) {
      res.status(422).json({
        message: "The email already exists"
      });
    } else {
      next();
    }
  });
};
