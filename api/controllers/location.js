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

exports.location_get_one = (req, res, next) => {
  const { locationId } = req.params;
  Location.findById(locationId)
    .then(location => {
      if (location) {
        const response = {
          name: location.name,
          femalePopulation: location.femalePopulation,
          malePopulation: location.malePopulation,
          totalPopulation: location.totalPopulation,
          _id: location._id
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "Location does not exist"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

exports.location_patch_one = (req, res, next) => {
  const { locationId } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propsName] = ops.value;
  }
  Location.update({ _id: locationId }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.location_delete_one = (req, res, next) => {
  const { locationId } = req.params;
  Location.remove({ _id: locationId })
    .then(() => {
      res.status(200).json({
        message: "Successfully deleted the location"
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
