const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/location");

router.get("/", LocationController.location_get_all);
router.post("/", LocationController.location_create);
router.get("/:locationId", LocationController.location_get_one);

router.put("/:locationId", LocationController.location_update_one);

router.delete("/:locationId", LocationController.location_delete_one);

module.exports = router;
