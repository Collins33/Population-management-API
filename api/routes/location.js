const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/location");

router.get("/", LocationController.location_get_all);

module.exports = router;
