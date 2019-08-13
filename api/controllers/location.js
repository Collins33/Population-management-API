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

exports.location_create = (req, res, next) => {
  const location = new Location({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    femalePopulation: req.body.femalePopulation,
    malePopulation: req.body.malePopulation,
    totalPopulation:
      parseInt(req.body.femalePopulation) + parseInt(req.body.malePopulation)
  });
  location
    .save()
    .then(response => {
      const locationCreated = {
        name: response.name,
        femalePopulation: response.femalePopulation,
        malePopulation: response.malePopulation,
        totalPopulation: response.totalPopulation,
        _id: response._id,
        request: {
          type: "GET",
          description: "Get the created location",
          url: "http://localhost:3000/" + response._id
        }
      };
      res.status(200).json({
        message: "Location was created",
        createdLocation: locationCreated
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};
