const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/location");

router.get("/", LocationController.location_get_all);
router.post("/", LocationController.location_create);

module.exports = router;
