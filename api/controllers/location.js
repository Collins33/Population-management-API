const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const environment = process.env.ENVIRONMENT;
let url;
if (environment === "local") {
  url = "http://localhost:3000";
} else if (environment === "production") {
  url = "https://population-control-33.herokuapp.com";
}

// import the population schema
const Location = require("../models/location");

/**
 * @method location_get_all
 * @summary - return all created locations
 * @param request body, response body
 * @returns json message
 */
exports.location_get_all = (req, res, next) => {
  Location.find()
    .select("name femalePopulation malePopulation totalPopulation _id")
    .then(locations => {
      const response = {
        count: locations.length,
        locations: locations.map(location => {
          return {
            name: location.name,
            femalePopulation: location.femalePopulation,
            malePopulation: location.malePopulation,
            totalPopulation: location.totalPopulation,
            _id: location._id,
            request: {
              type: "GET",
              description: "Get single location",
              url: url + "/api/v1/locations/" + location._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

/**
 * @method location_create
 * @summary - creates a new location
 * @param request body, response body
 * @returns json message
 */
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
          url: url + "/api/v1/locations/" + response._id
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

/**
 * @method location_get_one
 * @summary - returns a single location
 * @param request body, response body
 * @returns json message
 */
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
      res.status(500).json({ error: error });
    });
};

/**
 * @method location_update_one
 * @summary - edits a single location
 * @param request body, response body
 * @returns json message
 */
exports.location_update_one = (req, res, next) => {
  const { locationId } = req.params;
  Location.findById(locationId).then(location => {
    (location.name = req.body.name || location.name),
      (location.femalePopulation =
        req.body.femalePopulation || location.femalePopulation);
    (location.malePopulation =
      req.body.malePopulation || location.malePopulation),
      (location.totalPopulation =
        parseInt(location.femalePopulation) +
        parseInt(location.malePopulation));
    location.save(function(err) {
      if (err) throw err;
      res.status(200).json({
        message: "Location was updated successfully",
        updatedLocation: location
      });
    });
  });
};

/**
 * @method location_delete_one
 * @summary - deletes a single location
 * @param request body, response body
 * @returns json message
 */
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
