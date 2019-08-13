const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// import the population schema
const Location = require("../models/location");

exports.location_get_all = (req, res, next) => {
  Location.find()
    .then(locations => {
      res.status(200).json(locations);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
