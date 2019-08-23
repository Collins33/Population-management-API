const express = require("express");
const Location = require("../models/location");

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
