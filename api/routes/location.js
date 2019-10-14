const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/location");
const middleware = require("../middleware/middleware");
const authController = require("../middleware/auth");

router.get("/", authController.checkAuth, LocationController.location_get_all);
router.post(
  "/",
  middleware.checkEmtyInput,
  middleware.checkUniqueName,
  LocationController.location_create
);
router.get("/:locationId", LocationController.location_get_one);

router.put(
  "/:locationId",
  middleware.checkMissingLocation,
  middleware.checkUniqueName,
  LocationController.location_update_one
);

router.delete(
  "/:locationId",
  middleware.checkMissingLocation,
  LocationController.location_delete_one
);

module.exports = router;
